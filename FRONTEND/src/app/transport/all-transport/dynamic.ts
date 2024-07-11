import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TransportService } from 'src/app/shared/services/transport.service';
import { Time } from '@angular/common';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Person {
  id_tranport: Number;
  adresseDestination: string;
  dateDeDepart: Date;
  heureDeDepart: Time;
  nomPrenom: string;
  prenomTransporteur: string;
  status: string;
}
@Component({
  selector: 'dynamic',
  providers: [AuthenticationService, NzModalService],
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative mb-[25px]"
    >
      <div
        class="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b"
      >
        <h4
          class="mb-0 text-lg font-medium text-dark dark:text-white/[.87]"
        ></h4>
        <button
          class="capitalize bg-primary/10 hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
          nz-button
          (click)="createTplModal(tplTitle, tplContent, tplFooter)"
        >
          <i class="text-[12px]" nz-icon nzType="plus"></i>
          <span class="m-0">Ajouter</span>
        </button>
      </div>

      <div class="p-[25px]">
        <div
          class="flex items-center justify-center w-full mt-5 mb-[25px] max-md:flex-col max-md:justify-center gap-[15px]"
        >
          <div
            class="inline-flex items-center flex-wrap w-full gap-[20px] max-md:justify-center"
          >
            <div class="inline-flex items-center">
              <span class="ltr:mr-2 rtl:ml-2 dark:text-white/60"
                >Chercher:</span
              >
              <input
                class="h-10 px-[20px] text-body dark:text-white/60 bg-white dark:bg-white/10 border-normal border-1 dark:border-white/10 rounded-[6px]"
                nz-input
                placeholder="Adresse "
                [(ngModel)]="value"
                (ngModelChange)="searchById()"
              />
            </div>
            <div class="inline-flex items-center">
              <span class="ltr:mr-2 rtl:ml-2 dark:text-white/60">Status:</span>
              <nz-select
                class="min-w-[180px] capitalize [&>nz-select-top-control]:border-normal dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[40px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[6px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-light dark:[&>.ant-select-arrow]:text-white/60"
                [(ngModel)]="statusFilter"
                (ngModelChange)="filterByStatus()"
              >
                <nz-option nzValue="all" nzLabel="All"></nz-option>
                <nz-option nzValue="active" nzLabel="Disponible"></nz-option>
                <nz-option
                  nzValue="deactivated"
                  nzLabel="Non disponible"
                ></nz-option>
              </nz-select>
            </div>
          </div>
        </div>
        <div class="w-full overflow-x-auto">
          <nz-table
            #basicTable
            [nzData]="filteredPeople"
            [nzFrontPagination]="true"
            [nzShowPagination]="true"
            class="max-h-[650px]"
          >
            <thead>
              <tr>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-s-[10px] capitalize"
                >
                  Adresse de destination
                </th>

                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Date de départ
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Heure de départ
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Prénom
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[10px] capitalize "
                >
                  Status
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[10px] capitalize "
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="group" *ngFor="let person of filteredPeople">
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.adresseDestination }}
                </td>

                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.dateDeDepart }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.heureDeDepart }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.prenomTransporteur }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  <span
                    [ngClass]="{
                      'bg-green-200 text-green-700': person.status === 'active',
                      'bg-red-200 text-red-700': person.status === 'deactivated'
                    }"
                    class="inline-flex items-center justify-center min-h-[24px] px-3 text-xs font-medium rounded-[15px] capitalize"
                  >
                    {{
                      person.status === 'active'
                        ? 'Disponible'
                        : 'Non disponible'
                    }}
                  </span>
                </td>

                <td>
                  <ul
                    class="flex items-start justify-start gap-[15px]"
                    style="  list-style-type: none;"
                  >
                    <li>
                      <div
                        class="flex items-center leading-none text-light dark:text-white/60 hover:text-primary"
                      >
                        <span
                          class="[&>svg]:w-[14px] [&>svg]:h-[14px] cursor-pointer "
                          nz-icon
                          nzType="eye"
                          nzTheme="outline"
                        ></span>
                      </div>
                    </li>
                    <li>
                      <div class="flex items-center">
                        <span
                          class=" cursor-pointer text-light dark:text-white/60 [&>svg]:w-[14px] [&>svg]:h-[14px] hover:text-info "
                          nz-icon
                          nzType="edit"
                          nzTheme="outline"
                          (click)="
                            editTplModal(
                              person.id_transport,
                              Title,
                              Content,
                              Footer
                            )
                          "
                        >
                        </span>
                      </div>
                    </li>
                    <li>
                      <div class="flex items-center">
                        <span
                          class="cursor-pointer text-light dark:text-white/60 [&>svg]:w-[14px] [&>svg]:h-[14px] hover:text-danger"
                          nz-icon
                          nzType="delete"
                          nzTheme="outline"
                          (click)="delete(person.id_transport)"
                        ></span>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </nz-table>
        </div>
      </div>
    </div>

    <ng-template #tplTitle>
      <span>Ajouter Transport</span>
    </ng-template>
    <ng-template #tplContent let-params>
      <form nz-form nzLayout="vertical" [formGroup]="reservationForm">
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Adresse Destination</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Adresse Destination"
              formControlName="adresseDestination"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Date de départ</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="date"
              nz-input
              placeholder="Date de départ"
              formControlName="dateDeDepart"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
            >
              Heure de départ</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="time"
              nz-input
              placeholder="  Heure de départ"
              formControlName="heureDeDepart"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Prénom</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Prénom"
              formControlName="prenomTransporteur"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Status</nz-form-label
            >
            <nz-select
              nzPlaceHolder="Select Status"
              formControlName="status"
              class="border-none"
            >
              <nz-option nzValue="active" nzLabel="Disponible"></nz-option>
              <nz-option
                nzValue="deactivated"
                nzLabel="Non disponible"
              ></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </form>
    </ng-template>
    <ng-template #tplFooter let-ref="modalRef">
      <button
        class="capitalize bg-primary/10 hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
        nz-button
        (click)="Submit()"
      >
        Submit
      </button>
    </ng-template>

    <ng-template #Title>
      <span>Modification</span>
    </ng-template>
    <ng-template #Content let-params>
      <form nz-form nzLayout="vertical" [formGroup]="editForm">
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Adresse Destination</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Adresse Destination"
              formControlName="adresseDestination"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Date de départ</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="date"
              nz-input
              placeholder="Date de départ"
              formControlName="dateDeDepart"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
            >
              Heure de départ</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="time"
              nz-input
              placeholder="  Heure de départ"
              formControlName="heureDeDepart"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Prénom</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Prénom"
              formControlName="prenomTransporteur"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Status</nz-form-label
            >
            <nz-select
              nzPlaceHolder="Select Status"
              formControlName="status"
              class="border-none"
            >
              <nz-option nzValue="active" nzLabel="Disponible"></nz-option>
              <nz-option
                nzValue="deactivated"
                nzLabel="Non disponible"
              ></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
      </form>
    </ng-template>
    <ng-template #Footer let-ref="modalRef">
      <button
        class="capitalize bg-primary/10 hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
        nz-button
        (click)="onSubmit()"
      >
        Modifier
      </button>
    </ng-template>
  `,
})
export class DynamicComponent {
  @ViewChild('tplTitle') tplTitle!: TemplateRef<{}>;
  @ViewChild('tplContent') tplContent!: TemplateRef<{}>;
  @ViewChild('tplFooter') tplFooter!: TemplateRef<{}>;
  @ViewChild('Title') Title!: TemplateRef<{}>;
  @ViewChild('Content') Content!: TemplateRef<{}>;
  @ViewChild('Footer') Footer!: TemplateRef<{}>;

  value = '';
  statusFilter = '';
  contactSearchValue = '';
  people: any = [];
  filteredPeople: any = [];
  modalRef: NzModalRef;
  reservationForm: FormGroup;
  table: any = [];
  editForm: FormGroup;
  id_transport: number;

  constructor(
    private http: HttpClient,
    private transportService: TransportService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      adresseDestination: new FormControl('', Validators.required),

      dateDeDepart: new FormControl('', Validators.required),
      heureDeDepart: new FormControl('', Validators.required),
      prenomTransporteur: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.transportService.getTransport().subscribe(
      (response) => {
        console.log(response);
        this.people = response;
        this.filteredPeople = response;
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
    this.editForm = this.fb.group({
      adresseDestination: [''],

      dateDeDepart: [''],
      heureDeDepart: [''],
      prenomTransporteur: [''],
      status: [''],
    });
  }

  searchById(): void {
    if (this.value) {
      const alphabet = this.value.charAt(0).toUpperCase();
      this.filteredPeople = this.people.filter((person) =>
        person.adresseDestination.toUpperCase().startsWith(alphabet)
      );
    } else {
      this.filteredPeople = this.people;
    }
  }

  filterByContact(): void {
    this.filteredPeople = this.applyFilters();
  }

  filterByStatus(): void {
    this.filteredPeople = this.applyFilters();
  }

  private applyFilters(): Person[] {
    return this.people.filter(
      (person) =>
        person.status
          .toLowerCase()
          .includes(this.contactSearchValue.toLowerCase()) &&
        (this.statusFilter === 'all' ||
          person.status.toLowerCase() === this.statusFilter.toLowerCase())
    );
  }
  createTplModal(
    tplTitle: TemplateRef<{}>,
    tplContent: TemplateRef<{}>,
    tplFooter: TemplateRef<{}>
  ): void {
    this.modalRef = this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => {},
    });
  }
  Submit() {
    if (this.reservationForm.invalid) {
      this.notification.error(
        "Erreur d'ajout",
        'Veuillez remplir tous les champs du formulaire',
        {
          nzDuration: 3000,
          nzStyle: { background: '#fff1f0', color: '#f5222d' },
        }
      );
      return;
    }
    const formData = this.reservationForm.value;
    console.log(formData);
    const data = {
      adresseDestination: formData.adresseDestination,

      dateDeDepart: formData.dateDeDepart,
      heureDeDepart: formData.heureDeDepart,
      prenomTransporteur: formData.prenomTransporteur,
      status: formData.status,
    };

    this.transportService.AddTransport(data).subscribe((response: any) => {
      this.notification.success(
        'Ajout réussi',
        'Le transport a été ajouté avec succès',
        {
          nzDuration: 3000,
          nzStyle: { background: '#f6ffed', color: '#52c41a' },
        }
      );

      this.modalRef.destroy();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
  delete(id_transport: number) {
    console.log(id_transport);
    this.transportService
      .deleteTransport(id_transport)
      .subscribe((response: any) => {
        this.notification.success(
          'Suppression réussie',
          'Le transport a été supprimé avec succès',
          {
            nzDuration: 3000,
            nzStyle: { background: '#f6ffed', color: '#52c41a' },
          }
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }
  // TypeScript
  editTplModal(
    id_transport: number,
    Title: TemplateRef<{}>,
    Content: TemplateRef<{}>,
    Footer: TemplateRef<{}>
  ): void {
    this.id_transport = id_transport;
    this.modalRef = this.modal.create({
      nzTitle: Title,
      nzContent: Content,
      nzFooter: Footer,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => console.log('Click ok'),
    });
    this.transportService
      .getTransportById(id_transport)
      .subscribe((response: any) => {
        console.log(id_transport);

        console.log(response);

        this.editForm.patchValue(response);
      });
    console.log(this.editForm);
  }

  onSubmit() {
    const formData = this.editForm.value;
    const data = {
      adresseDestination: formData.adresseDestination,

      dateDeDepart: formData.dateDeDepart,
      heureDeDepart: formData.heureDeDepart,
      prenomTransporteur: formData.prenomTransporteur,
      status: formData.status,
    };

    this.transportService
      .updateTransport(this.id_transport, data)
      .subscribe((response: any) => {
        this.notification.success(
          'Mise à jour réussie',

          " L'utilisateur a été mis à jour avec succès",
          {
            nzDuration: 3000,
            nzStyle: { background: '#f6ffed', color: '#52c41a' },
          }
        );

        this.modalRef.destroy();

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }
}
