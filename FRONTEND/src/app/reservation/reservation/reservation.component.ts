import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import socialIcons from './../../../assets/data/pages/social-items.json';
import { ReservationTransportService } from 'src/app/shared/services/reservation-transport.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransportService } from 'src/app/shared/services/transport.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationTransportService],
})
export class ReservationComponent {
  socialMediaButtons = socialIcons.socialMediaButtons;
  signUpForm: FormGroup;
  isLoading = false;
  error = false;
  listAdresse: [];

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
    private notification: NzNotificationService,
    private ReservationTransportService: ReservationTransportService,
    private transportService: TransportService
  ) {}

  passwordVisible = false;
  password?: string;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      adresseDestination: [null, [Validators.required]],
      dateSortie: [null, [Validators.required]],
      heureSortie: [null, [Validators.required]],
      nomPrenom: [this.getToken() || '', [Validators.required]],
    });
    this.transportService.getAdresse().subscribe((data) => {
      this.listAdresse = data;
    });

    this.ReservationTransportService;
  }

  reserver() {
    const formData = this.signUpForm.value;
    console.log('h', formData);
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      console.log('h', formData);
      const data = {
        nomPrenom: formData.nomPrenom,
        adresseDestination: formData.adresseDestination.adresseDestination,
        prenomTransporteur: formData.adresseDestination.prenomTransporteur,
        dateSortie: formData.dateSortie,
        heureSortie: formData.heureSortie,
      };

      this.ReservationTransportService.AddReservationTransport(data).subscribe(
        (response: any) => {
          this.notification.success(
            'Ajout réussi',
            'Réservation a été ajouté avec succès',
            {
              nzDuration: 3000,
              nzStyle: { background: '#f6ffed', color: '#52c41a' },
            }
          );

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      );
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
