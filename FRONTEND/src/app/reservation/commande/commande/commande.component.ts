import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import socialIcons from './../../../../assets/data/pages/social-items.json';
import { ReservationTransportService } from 'src/app/shared/services/reservation-transport.service';
import { RepasService } from 'src/app/shared/services/repas.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandeComponent {
  socialMediaButtons = socialIcons.socialMediaButtons;
  signUpForm: FormGroup;
  isLoading = false;
  error = false;
  listePlats: any[];
  modalRef: any;

  submitForm(): void {
    for (const i in this.signUpForm.controls) {
      this.signUpForm.controls[i].markAsDirty();
      this.signUpForm.controls[i].updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.signUpForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private fb: FormBuilder,
    private ReservationTransportService: ReservationTransportService,
    private repasService: RepasService,
    private notification: NzNotificationService
  ) {}

  passwordVisible = false;
  password?: string;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      nomPlat: [null, [Validators.required]],
      date: [null, [Validators.required]],
      nomPrenom: [this.getToken() || '', [Validators.required]],
    });
    this.repasService.getnomPlat().subscribe((response: any) => {
      console.log(response);
      this.listePlats = response;
    });
  }
  reserver() {
    const formData = this.signUpForm.value;
    console.log('h', formData);
    if (this.signUpForm.valid) {
      const data = {
        nomPrenom: formData.nomPrenom,
        nomPlat: formData.nomPlat,
        date: formData.date,
      };

      this.repasService.AddCommanderPlat(data).subscribe((response: any) => {
        this.notification.success(
          'Ajout réussi',
          'Commande a été ajouté avec succès',
          {
            nzDuration: 3000,
            nzStyle: { background: '#f6ffed', color: '#52c41a' },
          }
        );

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    } else
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
  getToken(): string | null {
    const user = JSON.parse(localStorage.getItem('USER'));
    if (user.infoUser.nomPrenom) {
      return user.infoUser.nomPrenom;
    } else {
      return null;
    }
  }
}
