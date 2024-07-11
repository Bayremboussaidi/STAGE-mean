import { Component, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RepasService } from 'src/app/shared/services/repas.service';

interface Person {
  id_plat: number;
  nomPlat: string;
  status: string;
}

@Component({
  selector: 'dynamic',
  providers: [RepasService, NzModalService],
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
                placeholder="Prénom"
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
                <nz-option nzValue="all" nzLabel="Tout"></nz-option>
                <nz-option nzValue="active" nzLabel="Disponible"></nz-option>
                <nz-option
                  nzValue="deactivated"
                  nzLabel="Non Disponible"
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
                  Nom
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-s-[10px] capitalize"
                >
                  Status
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
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
                  {{ person.nomPlat }}
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
                            editTplModal(person.id_plat, Title, Content, Footer)
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
                          (click)="delete(person.id_plat)"
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
      <span>Ajouter Plat</span>
    </ng-template>
    <ng-template #tplContent let-params>
      <form
        nz-form
        nzLayout="vertical"
        [formGroup]="userForm"
        (ngSubmit)="Submit()"
      >
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Nom</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Nom Plat"
              formControlName="nomPlat"
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
      <span>Modifier Plat</span>
    </ng-template>
    <ng-template #Content let-params>
      <form nz-form nzLayout="vertical" [formGroup]="editForm">
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Nom</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="text"
              nz-input
              placeholder="Nom Plat"
              formControlName="nomPlat"
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
              [class.ant-select-lg]="true"
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
  value = '';
  statusFilter = '';
  contactSearchValue = '';
  people: any = [];
  filteredPeople: any = [];
  modalRef: NzModalRef;
  userForm: FormGroup;
  id_plat: number;
  editForm: FormGroup;

  constructor(
    private http: HttpClient,
    private RepasService: RepasService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      nomPlat: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.RepasService.getPlat().subscribe(
      (response) => {
        this.people = response;
        this.filteredPeople = response;
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
    this.editForm = this.fb.group({
      nomPlat: [''],
      status: [''],
    });
  }

  searchById(): void {
    if (this.value) {
      const alphabet = this.value.charAt(0).toUpperCase();
      this.filteredPeople = this.people.filter((person) =>
        person.nomPlat.toUpperCase().startsWith(alphabet)
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
    if (this.userForm.invalid) {
      // Afficher un message d'erreur si le formulaire est invalide
      this.notification.error(
        "Erreur d'ajout",
        'Veuillez remplir tous les champs du formulaire',
        {
          nzDuration: 3000,
          nzStyle: { background: '#fff1f0', color: '#f5222d' },
        }
      );
      return; // Arrêter l'exécution de la fonction si le formulaire est invalide
    }

    const formData = this.userForm.value;
    console.log(formData);
    const data = {
      nomPlat: formData.nomPlat,
      status: formData.status,
    };

    this.RepasService.AddPlat(data).subscribe((response: any) => {
      console.log(response);
      this.notification.success(
        'Ajout réussi',
        'Le plat a été ajouté avec succès',
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

  delete(id_plat: number) {
    console.log(id_plat);
    this.RepasService.deletePlat(id_plat).subscribe((response: any) => {
      this.notification.success(
        'Suppression réussie',
        'Le plat a été supprimé avec succès',
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
  editTplModal(
    id_plat: number,
    Title: TemplateRef<{}>,
    Content: TemplateRef<{}>,
    Footer: TemplateRef<{}>
  ): void {
    this.id_plat = id_plat;
    this.modalRef = this.modal.create({
      nzTitle: Title,
      nzContent: Content,
      nzFooter: Footer,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => console.log('Click ok'),
    });
    this.RepasService.getPlatById(id_plat).subscribe((response: any) => {
      console.log(id_plat);
      console.log(response);

      this.editForm.patchValue(response);
    });
    console.log(this.editForm);
  }
  onSubmit() {
    const formData = this.editForm.value;
    const data = {
      nomPlat: formData.nomPlat,
      status: formData.status,
    };

    this.RepasService.updatePlat(this.id_plat, data).subscribe(
      (response: any) => {
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
      }
    );
  }
}
