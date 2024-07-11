import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../shared/services/users.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'password-settings',
  template: `
    <form
      class="max-w-full"
      nz-form
      [formGroup]="myGroup"
      (ngSubmit)="submitForm()"
    >
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="name"
          >mot De Passe</nz-form-label
        >
        <input
          class="w-full rounded-6 border-normal border-1 text-[15px] dark:bg-white/10 dark:border-white/10 px-[20px] py-[12px] min-h-[50px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-white/60"
          nz-input
          formControlName="motDePasse"
          id="motDePasse"
          readOnly
        />
      </nz-form-control>
      <nz-form-control class="mb-[20px]">
        <nz-form-label
          class="flex items-center [&>label]:text-dark [&>label]:dark:text-white/60 p-0 [&>label]:text-[15px] mb-[5px] capitalize"
          nzFor="newPassword"
          >Nouveau mot de passe</nz-form-label
        >
        <nz-input-group
          class="flex items-center shadow-none py-[10px] px-[20px] h-[50px] border-1 border-normal dark:border-white/10 w-full text-[14px] font-normal leading-[1.5] dark:bg-white/10 rounded-4"
          [nzSuffix]="suffixTemplate"
        >
          <input
            id="newPassword"
            class="w-full text-[15px] placeholder:text-[#A0A0A0] dark:bg-transparent bg-transparent dark:text-white/60 outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,0,0)]  text-theme-gray"
            [type]="passwordVisible ? 'text' : 'password'"
            nz-input
            placeholder="entrer Nouveau mot de passe "
            formControlName="newmotDePasse"
          />
          <ng-template #suffixTemplate>
            <span
              class="cursor-pointer text-light-extra dark:text-white/60 w-[15px] h-[15px]"
              nz-icon
              [nzType]="passwordVisible ? 'eye' : 'eye-invisible'"
              (click)="passwordVisible = !passwordVisible"
            ></span>
          </ng-template>
        </nz-input-group>
        <p class="mt-[14px] text-light dark:text-white/60 text-[13px]">
          Minimum 6 caractères
        </p>
      </nz-form-control>

      <nz-form-control class="mt-[25px]">
        <div class="inline-flex items-center gap-[13px]">
          <button
            class="bg-primary hover:bg-primary-hbr inline-flex items-center outline-none shadow-none w-fit duration-300 text-white capitalize px-[20px] text-[15px] border-primary font-semibold hover:border-primary-hbr rounded-[5px] gap-[8px] h-[46px]"
            nz-button
            nzType="primary"
          >
            <span>Changer mot de passe</span>
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
export class PasswordSettingComponent {
  myGroup: FormGroup;
  passwordVisible = false;
  password?: string;
  people: any = {};
  id_User: number;
  constructor(
    private userService: UsersService,
    private notification: NzNotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    // Initialize the form group
    this.myGroup = new FormGroup({
      motDePasse: new FormControl(),
      newmotDePasse: new FormControl(),
    });
    const user = JSON.parse(localStorage.getItem('USER'));
    this.id_User = user.infoUser.id_User;
    console.log(this.id_User);
    this.userService.getUserById(this.id_User).subscribe((response) => {
      this.people = response;
      this.myGroup.patchValue({
        motDePasse: this.maskPassword(this.people.motDePasse),
      });
    });
  }
  submitForm() {
    const formData = this.myGroup.value;
    this.id_User = this.id_User;
    console.log(this.id_User);
    // Créer un objet avec les données du formulaire
    const data = {
      motDePasse: formData.newmotDePasse,
    };

    this.userService
      .updateMotDePasse(this.id_User, data)
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
  maskPassword(motDePasse: string): string {
    return '..........';
  }
  cancel() {
    this.router.navigate(['/dashboard/demo-one']);
  }
}
