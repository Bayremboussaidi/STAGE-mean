import { Component, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UsersService } from 'src/app/shared/services/users.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Person {
  id_User: number;

  nomPrenom: string;
  dateDeNaissance: Date;
  numDeTelephone: string;
  email: string;
  motDePasse: string;
  status: string;

  role: string;
}

@Component({
  selector: 'dynamic',
  providers: [UsersService, NzModalService],
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
                <nz-option nzValue="active" nzLabel="activé"></nz-option>
                <nz-option
                  nzValue="deactivated"
                  nzLabel="désactivé"
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
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Nom et Prénom
                </th>

                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Date de naissance
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Email
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Mot De Passe
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Numéro
                </th>

                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  Role
                </th>
                <th
                  class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
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
                  {{ person.nomPrenom }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.dateDeNaissance }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.email }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ maskPassword(person.motDePasse) }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.numDeTelephone }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  {{ person.role }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                >
                  <span
                    [ngClass]="{
                      'bg-green-200 text-green-700': person.status === 'active',
                      'bg-red-200 text-red-700': person.status === 'deactivated',
                    }"
                    class="inline-flex items-center justify-center min-h-[24px] px-3 text-xs font-medium rounded-[15px] capitalize"
                  >
                    {{ person.status === 'active' ? 'activé' : 'désactivé' }}
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
                            editTplModal(person.id_User, Title, Content, Footer)
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
                          (click)="delete(person.id_User)"
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
      <span>Ajouter Utilisateur</span>
    </ng-template>
    <ng-template #tplContent let-params>
      <form
        nz-form
        nzLayout="vertical"
        [formGroup]="userForm"
        (ngSubmit)="handleSubmit()"
      >
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
              placeholder="Veuillez saisir votre nom et prénom"
              formControlName="nomPrenom"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Date de naissance</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="date"
              nz-input
              placeholder="Date de naissance"
              formControlName="dateDeNaissance"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Email</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="email"
              nz-input
              placeholder="Veuillez saisir votre Email"
              formControlName="email"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Mot De Passe</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="password"
              nz-input
              placeholder="Veuillez saisir votre mot De Passe"
              formControlName="motDePasse"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Numéro</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              nz-input
              type="tel"
              placeholder="Veuillez saisir votre Numéro"
              formControlName="numDeTelephone"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Role</nz-form-label
            >
            <nz-select
              nzPlaceHolder=" Veuillez saisir votre Role"
              formControlName="role"
              class="border-none"
            >
              <nz-option nzValue="ingenieur" nzLabel="Ingenieur"></nz-option>
              <nz-option nzValue="Manager" nzLabel="Manager"></nz-option>
              <nz-option nzValue="Admin" nzLabel="Admin"></nz-option>
            </nz-select>
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
              nzPlaceHolder=" Veuillez Select votre Status"
              formControlName="status"
              class="border-none"
            >
              <nz-option nzValue="active" nzLabel="Activé"></nz-option>
              <nz-option nzValue="deactivated" nzLabel="désactivé"></nz-option>
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
        Ajouter
      </button>
    </ng-template>

    <ng-template #Title>
      <span>Modifier Utilisateur</span>
    </ng-template>
    <ng-template #Content let-params>
      <form nz-form nzLayout="vertical" [formGroup]="editForm">
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
              placeholder="Nom et prénom"
              formControlName="nomPrenom"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Date de naissance</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="date"
              nz-input
              placeholder="Date de naissance"
              formControlName="dateDeNaissance"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Email</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="email"
              nz-input
              placeholder="Email"
              formControlName="email"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Mot De Passe</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              type="password"
              nz-input
              placeholder="mot De Passe"
              formControlName="motDePasse"
            />
          </nz-form-control>
        </nz-form-item>

        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Numéro</nz-form-label
            >
            <input
              class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10 dark:text-white/[.87]"
              nz-input
              type="tel"
              placeholder="Numéro"
              formControlName="numDeTelephone"
            />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >Role</nz-form-label
            >
            <nz-select
              nzPlaceHolder="Role"
              formControlName="role"
              class="border-none"
            >
              <nz-option nzValue="ingenieur" nzLabel="Ingenieur"></nz-option>
              <nz-option nzValue="Manager" nzLabel="Manager"></nz-option>
              <nz-option nzValue="Admin" nzLabel="Admin"></nz-option>
            </nz-select>
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
              <nz-option nzValue="active" nzLabel="activé"></nz-option>
              <nz-option nzValue="deactivated" nzLabel="désactivé"></nz-option>
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
  id_User: number;
  editForm: FormGroup;

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      nomPrenom: new FormControl('', Validators.required),
      dateDeNaissance: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      numDeTelephone: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      motDePasse: new FormControl('', Validators.required),
    });

    this.userService.getAllUser().subscribe(
      (response) => {
        this.people = response;
        this.filteredPeople = response;
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
    this.editForm = this.fb.group({
      nomPrenom: [''],
      dateDeNaissance: [''],
      email: [''],
      motDePasse: [''],
      numDeTelephone: [''],
      status: [''],

      role: [''],
    });
  }

  searchById(): void {
    if (this.value) {
      const alphabet = this.value.charAt(0).toUpperCase();
      this.filteredPeople = this.people.filter((person) =>
        person.nomPrenom.toUpperCase().startsWith(alphabet)
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
        person.role
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
      nomPrenom: formData.nomPrenom,
      dateDeNaissance: formData.dateDeNaissance,
      email: formData.email,
      numDeTelephone: formData.numDeTelephone,
      role: formData.role,
      motDePasse: this.maskPassword(formData.motDePasse),
      status: formData.status,
    };

    this.userService.AddUser(data).subscribe((response: any) => {
      this.notification.success(
        'Ajout réussi',
        "L'utilisateur a été ajouté avec succès",
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
  delete(id_User: number) {
    console.log(id_User);
    this.userService.deleteUser(id_User).subscribe((response: any) => {
      this.notification.success(
        'Suppression réussie',
        "l'utilisateur a été supprimé avec succès",
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
    id_User: number,
    Title: TemplateRef<{}>,
    Content: TemplateRef<{}>,
    Footer: TemplateRef<{}>
  ): void {
    this.id_User = id_User;
    this.modalRef = this.modal.create({
      nzTitle: Title,
      nzContent: Content,
      nzFooter: Footer,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => console.log('Click ok'),
    });
    this.userService.getUserById(id_User).subscribe((response: any) => {
      console.log(id_User);

      console.log(response);

      this.editForm.patchValue(response);
    });
  }
  onSubmit() {
    const formData = this.editForm.value;
    const data = {
      nomPrenom: formData.nomPrenom,
      dateDeNaissance: formData.dateDeNaissance,
      email: formData.email,
      numDeTelephone: formData.numDeTelephone,
      motDePasse: this.maskPassword(formData.motDePasse),

      role: formData.role,
      status: formData.status,
    };

    this.userService
      .updateUser(this.id_User, data)
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
  maskPassword(motDePasse: string): string {
    return '....';
  }
}
