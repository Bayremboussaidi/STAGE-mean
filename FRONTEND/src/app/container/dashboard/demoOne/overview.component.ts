import { Component } from '@angular/core';
import overviewData from '../../../../assets/data/pages/demo-one/overviewData.json';
import { ReservationTransportService } from 'src/app/shared/services/reservation-transport.service';
import { CommandeRepasService } from 'src/app/shared/services/commande-repas.service';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'nz-overview',
  template: `
    <div nz-row [nzGutter]="25">
      <div
        nz-col
        *ngFor="let overviewData of filteredOverviewData"
        class="mb-[25px]"
        nzXs="24"
        nzMd="12"
        nzXXl="12"
      >
        <div
          bordered="false"
          class="p-[25px] bg-white dark:bg-white/10 rounded-10 relative text-[15px] text-theme-gray dark:text-white/60 leading-6"
        >
          <div class="flex justify-between">
            <div
              class="flex items-center justify-center order-2 bg-{{
                overviewData.type
              }}/10 text-{{ overviewData.type }} w-[58px] h-[58px] rounded-2xl"
            >
              <div class="fill-{{ overviewData.type }}  flex items-center">
                <svg-icon
                  class="w-[30px] h-[30px] [&>svg]:w-full [&>svg]:h-full"
                  src="assets/images/svg/unicons-line/{{
                    overviewData.icon
                  }}.svg"
                ></svg-icon>
              </div>
            </div>
            <div>
              <h4
                class="mb-0 text-3xl max-lg:text-[26px] max-sm:text-2xl font-semibold leading-normal text-dark dark:text-white/[.87]"
              >
                <span>
                  <span *ngIf="overviewData.totalSales === 'true'">$</span>
                  {{ totalSales[overviewData.total] }}
                  <span *ngIf="overviewData.suffix">{{
                    overviewData.suffix
                  }}</span>
                </span>
              </h4>
              <span class="font-normal text-body dark:text-white/60 text-15">{{
                overviewData.label
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OverviewComponent {
  Data = [
    {
      id: 1,
      type: 'primary',
      icon: 'car',
      label: 'Toutes les réservations de transport',
      total: 'TransportCount',
      suffix: '',
    },
    {
      id: 2,
      type: 'info',
      icon: 'crockery',
      label: 'Toutes les réservations de repas',
      total: 'RepasCount',
      suffix: '',
    },
    {
      id: 3,
      type: 'secondary',
      icon: 'users-alt',
      label: 'Toutes les utlisateurs',
      total: 'UsersCount',
      suffix: '',
    },
    {
      id: 4,
      type: 'primary',
      icon: 'edit',
      label: 'Toutes les réclamation',
      total: 'reclamationCount',
      suffix: '',
    },
  ];

  totalSales: any = {};
  totalRepas: number | undefined;
  totalUsers: number | undefined;

  filteredOverviewData = this.Data.filter(
    (item) => item.id >= 1 && item.id <= 4
  );

  constructor(
    private Service: ReservationTransportService,
    private ServiceRepas: CommandeRepasService,
    private ServiceUsers: UsersService
  ) {}

  ngOnInit(): void {
    this.Service.getTransportCount().subscribe(
      (response: any) => {
        console.log(response);
        this.totalSales.TransportCount = response?.TransportCount;
      },
      (error) => {
        console.log('Error reading TransportCount:', error);
      }
    );

    this.ServiceRepas.getRepasCount().subscribe(
      (response: any) => {
        console.log(response);
        this.totalSales.RepasCount = response?.repasCount;
      },
      (error) => {
        console.log('Error reading RepasCount:', error);
      }
    );

    this.ServiceUsers.getUsersCount().subscribe(
      (response: any) => {
        console.log(response);
        this.totalSales.UsersCount = response?.UsersCount;
      },
      (error) => {
        console.log('Error reading UsersCount:', error);
      }
    );
    this.ServiceUsers.countReclamation().subscribe((response: any) => {
      console.log(response);
      this.totalSales.reclamationCount = response?.reclamationCount;
    });
  }
}
