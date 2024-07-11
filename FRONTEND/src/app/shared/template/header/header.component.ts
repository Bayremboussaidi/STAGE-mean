import { Component } from '@angular/core';
import { ThemeConstantService } from '../../services/theme-constant.service';
import messages from '../../../../assets/data/global/header/messages.json';
import notification from '../../../../assets/data/global/header/notification.json';
import authorMenu from '../../../../assets/data/global/header/author-menu.json';
import settings from '../../../../assets/data/global/header/settings.json';

import { Router } from '@angular/router';
import { TransportService } from '../../services/transport.service';
import { ReservationTransportService } from '../../services/reservation-transport.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchVisible: boolean = false;
  quickViewVisible: boolean = false;
  isFolded: boolean;
  isExpand: boolean;
  appMessagesData: any = [];
  appNotification = notification.appNotification;
  appAuthorMenu = authorMenu.appAuthorMenu;
  appSettings = settings.appSettings;
  reservationCount: any;
  notificationCount: number = 0;

  constructor(
    private UsersService: UsersService,
    private themeService: ThemeConstantService,
    private router: Router,
    private ReservationTransport: TransportService,
    private reservationTransport: ReservationTransportService
  ) {}
  userName: string | null;
  role: string | null;
  ngOnInit(): void {
    this.appMessagesData = [];
    this.themeService.isMenuFoldedChanges.subscribe(
      (isFolded) => (this.isFolded = isFolded)
    );
    this.themeService.isExpandChanges.subscribe(
      (isExpand) => (this.isExpand = isExpand)
    );
    this.userName = this.getToken();
    this.role = this.getRole();
    this.ReservationTransport.countReservation().subscribe(
      (response: any) => {
        console.log(response);
        this.reservationCount = response.countReservation;
      },
      (error) => {
        console.log('Error fetching reservation count:', error);
      }
    );
    this.reservationTransport.getReservationTransportByStatus().subscribe(
      (response: any) => {
        console.log(response);
        this.appNotification = response;
      },
      (error) => {
        console.log('Error fetching reservation count:', error);
      }
    );
    this.UsersService.getReclamation().subscribe(
      (response: any[]) => {
        console.log(response);

        // Parcourir chaque réponse de l'API
        response.forEach((message) => {
          // Ajouter un nouvel objet de message à appMessagesData pour chaque réponse
          this.appMessagesData.push({
            link: 'javascript:void(0);',
            source: 'assets/images/messages/app-developer.png',
            title: message.nomPrenom,

            description: message.description,
            status: 'light', // Vous devrez peut-être mettre à jour cette valeur en fonction de la logique de votre application
            isRead: true, // Vous devrez peut-être mettre à jour cette valeur en fonction de la logique de votre application
          });
        });

        // Mettre à jour le nombre de messages existants
        this.notificationCount = this.appMessagesData.length;
      },
      (error) => {
        console.log('Error fetching reclamation data:', error);
      }
    );
  }
  toggleFold() {
    this.isFolded = !this.isFolded;
    this.themeService.toggleFold(this.isFolded);
  }

  toggleExpand() {
    this.isFolded = false;
    this.isExpand = !this.isExpand;
    this.themeService.toggleExpand(this.isExpand);
    this.themeService.toggleFold(this.isFolded);
  }

  searchToggle(): void {
    this.searchVisible = !this.searchVisible;
  }

  quickViewToggle(): void {
    this.quickViewVisible = !this.quickViewVisible;
  }
  signOut() {
    localStorage.removeItem('USER');
  }
  getToken(): string | null {
    const user = JSON.parse(localStorage.getItem('USER'));
    return user?.infoUser.nomPrenom || null;
  }
  getRole(): string | null {
    const user = JSON.parse(localStorage.getItem('USER'));
    return user?.infoUser.role || null;
  }
}
