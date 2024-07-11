import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDistance } from 'date-fns';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'nz-demo-comment-editor',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="handleSubmit()">
      <nz-form-item style="margin-left: 40px !important;">
        <nz-form-label nzRequired nzFor="nomPrenom" class="form-label"
          >Nom et prénom</nz-form-label
        >
        <input
          readonly
          type="text"
          nz-input
          formControlName="nomPrenom"
          [value]="getToken()"
          class="form-input"
        />
      </nz-form-item>

      <nz-comment>
        <nz-avatar
          nz-comment-avatar
          nzIcon="user"
          [nzSrc]="user.avatar"
        ></nz-avatar>
        <nz-comment-content>
          <nz-form-item>
            <textarea
              class="form-textarea"
              formControlName="description"
              nz-input
              rows="4"
            ></textarea>
          </nz-form-item>
          <nz-form-item>
            <button
              class="capitalize bg-primary/10 hover:bg-primary-hbr border-none text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
              nz-button
            >
              Envoyer
            </button>
          </nz-form-item>
        </nz-comment-content>
      </nz-comment>
    </form>
  `,
  styles: [
    `
      :host ::ng-deep .ant-comment-content-author-name {
        @apply text-theme-gray dark:text-white/[.87] text-[12px];
      }
      :host ::ng-deep .ant-comment-content-author-time {
        @apply text-light dark:text-white/60 text-[12px];
      }
      :host ::ng-deep .ant-comment-actions > li > span {
        @apply text-light-extra dark:text-white/60 text-[12px] flex items-center gap-[8px];
      }
      :host ::ng-deep .ant-comment-actions li {
        @apply relative me-[8px];
      }
      :host ::ng-deep .ant-comment-actions li:not(:last-child)::after {
        @apply absolute top-[50%] ltr:end-0 rtl:left-[-9px] h-[12px] w-[1px] bg-dark dark:bg-white/10 -translate-y-1/2 content-[''];
      }
    `,
  ],
})
export class NzDemoCommentEditorComponent {
  modalRef: NzModalRef;
  userForm: FormGroup;
  reclamation: any;
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };

  // Déclaration de la propriété data
  data: any[] = [];

  constructor(
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      nomPrenom: [this.getToken(), Validators.required],
      description: ['', Validators.required],
    });
  }

  getToken(): string | null {
    const user = JSON.parse(localStorage.getItem('USER'));
    return user?.infoUser?.nomPrenom || null;
  }

  public handleSubmit(): void {
    if (this.userForm.invalid) {
      this.showFormErrorNotification();
      return;
    }

    const formData = this.userForm.value;
    this.userService.AddReclamation(formData).subscribe(
      (response: any) => {
        this.reclamation = response;
        console.log(this.reclamation);
        this.showSuccessNotification();
      },
      (error) => {
        this.showErrorNotification();
        this.submitting = false;
      }
    );
  }

  private showFormErrorNotification(): void {
    this.notification.error(
      "Erreur d'ajout",
      'Veuillez remplir tous les champs du formulaire',
      { nzDuration: 3000 }
    );
  }

  private showSuccessNotification(): void {
    this.notification.success(
      'Ajout réussi',
      'La réclamation a été ajoutée avec succès',
      { nzDuration: 3000 }
    );
  }

  private showErrorNotification(): void {
    this.notification.error(
      "Erreur lors de l'ajout",
      "Une erreur s'est produite lors de l'ajout de la réclamation",
      { nzDuration: 3000 }
    );
  }
}
