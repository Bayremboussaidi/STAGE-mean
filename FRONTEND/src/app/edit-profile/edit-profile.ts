import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Router } from '@angular/router';
interface Person {
  id_User: number;
  nomPrenom: string;
  dateDeNaissance: string;
  numDeTelephone: string;
  email: string;
  motDePasse: string;
  status: string;

  role: string;
}

@Component({
  selector: 'edit-profiles',
  template: `
    <form
      class="max-w-full"
      nz-form
      [formGroup]="validateForm"
      (ngSubmit)="submitForm()"
    >
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="nom"
          >Nom et Prénom</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="nomPrenom"
          id="nom"
        />
      </nz-form-control>
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="date"
          >Date de naissance</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="dateDeNaissance"
          id="date"
          placeholder="Date de naissance"
          type="date"
        />
      </nz-form-control>
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="number"
          >Numéro de téléphone</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="numDeTelephone"
          id="number"
          placeholder="+216"
        />
      </nz-form-control>

      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="city"
          >email</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60 mb-[15px]"
          nz-input
          formControlName="email"
          id="email"
          placeholder="email"
        />
      </nz-form-control>
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="cmName"
          >Mot de passe</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="motDePasse"
          id="motDePasse"
          placeholder="Mot de passe"
          readOnly
        />
      </nz-form-control>
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="website"
          >Role</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="role"
          id="role"
          placeholder="Role"
          readOnly
        />
      </nz-form-control>

      <nz-form-control class="mt-[25px]">
        <div class="inline-flex items-center gap-[13px]">
          <button
            class="bg-primary hover:bg-primary-hbr inline-flex items-center outline-none shadow-none w-fit duration-300 text-white capitalize px-[20px] text-[15px] border-primary font-semibold hover:border-primary-hbr rounded-[5px] gap-[8px] h-[46px]"
            nz-button
            nzType="primary"
          >
            <span>Modifier Profile</span>
          </button>
          <button
            class="bg-danger hover:bg-primary-hbr inline-flex items-center outline-none shadow-none w-fit duration-300 text-white capitalize px-[20px] text-[15px] border-danger font-semibold hover:border-primary-hbr rounded-[5px] gap-[8px] h-[46px]"
            nz-button
            nzType="primary"
          >
            <span (click)="cancel()">Cancel</span>
          </button>
        </div>
      </nz-form-control>
    </form>
  `,
})
export class EditProfileComponent {
  isFormSubmitted = false;
  validateForm!: FormGroup;
  filteredPeople: Object;
  people: any = {};
  id_User: number;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  // submitForm(): void {
  //   this.isFormSubmitted = true;
  //   if (this.validateForm.valid) {
  //     console.log('submit', this.validateForm.value);
  //   } else {
  //     this.validateForm.markAllAsTouched();
  //   }
  // }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: FormControl
  ): {
    [s: string]: boolean;
  } => {
    if (!control.value) {
      return {
        required: true,
      };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {
        confirm: true,
        error: true,
      };
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      nomPrenom: [null, [Validators.required]],
      dateDeNaissance: [null, [Validators.required]],
      phoneNumberPrefix: ['+216'],
      numDeTelephone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      motDePasse: [null, [Validators.required]],
      role: [null, [Validators.required]],
      status: [null, [Validators.required]],
    });
    const user = JSON.parse(localStorage.getItem('USER'));
    this.id_User = user.infoUser.id_User;

    this.userService.getUserById(this.id_User).subscribe(
      (response) => {
        this.people = response;

        this.validateForm.patchValue({
          nomPrenom: this.people.nomPrenom,
          dateDeNaissance: this.people.dateDeNaissance,
          numDeTelephone: this.people.numDeTelephone,
          email: this.people.email,
          motDePasse: this.maskPassword(this.people.motDePasse),
          status: this.people.status,

          role: this.people.role,
        });
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
  }
  submitForm() {
    const formData = this.validateForm.value;
    this.id_User = this.id_User;
    console.log(this.id_User);
    // Créer un objet avec les données du formulaire
    const data = {
      nomPrenom: formData.nomPrenom,
      dateDeNaissance: formData.dateDeNaissance,
      email: formData.email,
      motDePasse: formData.motDePasse,
      numDeTelephone: formData.numDeTelephone,
      role: formData.role,
      status: formData.status,
    };

    this.userService
      .updateUser(this.id_User, data)
      .subscribe((response: any) => {
        console.log(response);
        // Afficher une notification de succès
        this.notification.success(
          'Mise à jour réussie',
          " L'utilisateur a été mis à jour avec succès",
          {
            nzDuration: 3000,
            nzStyle: { background: '#f6ffed', color: '#52c41a' },
          }
        );
      });
  }
  // maskPassword(password: string): string {
  //   return '..........';
  // }

  listOfOption = [
    { label: 'United Stata', value: '1' },
    { label: 'United Kingdom', value: '2' },
    { label: 'France', value: '3' },
    { label: 'German', value: '4' },
  ];

  maskPassword(motDePasse: string): string {
    return '..........';
  }
  cancel() {
    this.router.navigate(['/dashboard/demo-one']);
  }
}
