import { Component, Input, OnInit } from '@angular/core';
import items from '../../../../assets/data/global/dropdown.json';
import svgMap from 'svgmap';
import svgMapDataGPD from '../../../../assets/data/vectorMap';
import tableData from '../../../../assets/data/pages/table-data.json';
import { TransportService } from 'src/app/shared/services/transport.service';
import { ReservationTransportService } from 'src/app/shared/services/reservation-transport.service';

@Component({
  selector: 'nz-saleLocation',
  template: `
    <!-- skeleton -->
    <ng-template #loadingSkeleton>
      <nz-skeleton
        class="bg-white dark:bg-white/10 rounded-6 p-[30px] pt-[15px]"
        [nzShape]="circle"
        [nzActive]="true"
        [nzParagraph]="{ rows: 6 }"
      ></nz-skeleton>
    </ng-template>
    <!-- skeleton -->
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative"
    >
      <div
        class="px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px] border-b border-[#F1F2F6] dark:border-white/10"
      >
        <h1
          class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-white/[.87]"
        >
          Disponibilité des Places dans les Transports
        </h1>
        <div
          class="py-[16px] flex items-center gap-[15px] max-xs:flex-wrap max-xs:justify-center"
        >
          <div>
            <a nz-dropdown nzTrigger="click" [nzDropdownMenu]="menu">
              <svg-icon
                class="text-light dark:text-white/60 dark:group-hover:text-white/[.87] w-[24px] h-[24px] [&>svg]:w-[24px] [&>svg]:h-[24px]"
                src="assets/images/svg/feather/more-horizontal.svg"
              ></svg-icon>
            </a>
            <nz-dropdown-menu #menu="nzDropdownMenu">
              <ul
                class="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 capitalize"
                nz-menu
                nzSelectable
              >
                <li
                  *ngFor="let item of appItems"
                  class="flex items-center text-theme-gray dark:text-white/60 hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 px-3 py-1.5 text-sm dark:hover:text-white/[.87]"
                  nz-menu-item
                >
                  <svg-icon
                    class="text-current w-3.5 h-3.5 me-2 [&>svg]:w-full [&>svg]:h-full"
                    src="assets/images/svg/feather/{{ item.icon }}.svg"
                  ></svg-icon>
                  {{ item.name }}
                </li>
              </ul>
            </nz-dropdown-menu>
          </div>
        </div>
      </div>
      <div class="px-[25px] pt-[30px] pb-[50px]">
        <div nz-row nzGutter="25" nzJustify="center">
          <div nz-col nzXl="12" nzXs="24">
            <div
              *ngFor="let tab of tabData"
              [class.hidden]="sellingTab !== tab.key"
            >
              <perfect-scrollbar
                class="relative border-1 border-solid border-regular dark:border-white/10 rounded-[5px]"
              >
                <nz-table
                  [nzData]="locations[tab.key]"
                  [nzFrontPagination]="false"
                  [nzShowPagination]="false"
                  class="text-sm max-h-[280px] relative"
                >
                  <thead>
                    <tr>
                      <th
                        class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-start text-light dark:text-white/[.87] text-12 font-medium border-none before:hidden rounded-bl-[0] rounded-s-[4px]"
                      >
                        Les adresses
                      </th>
                      <th
                        class="bg-[#fafafa] dark:bg-[#323440] px-4 py-2.5 text-start text-light dark:text-white/[.87] text-12 font-medium border-none before:hidden"
                      >
                        Les personnes
                      </th>
                    </tr>
                  </thead>
                  <!-- Reste du code inchangé -->

                  <tbody
                    class="bg-white dark:bg-[#1b1d2a] [&>tr:first-child>td]:pt-5 [&>tr:last-child>td]:pb-5"
                  >
                    <tr *ngFor="let data of usersCountsByAddress" class="group">
                      <td
                        class="px-4 py-2.5 text-start text-dark dark:text-white/[.87] dark:group-hover:bg-white/10 text-15 font-medium border-none before:hidden"
                      >
                        {{ data.adresseDestination }}
                      </td>
                      <td
                        class="px-4 py-2.5 text-start text-body dark:text-white/[60] dark:group-hover:bg-white/10 border-none before:hidden"
                      >
                        {{ data.countOfNames }}
                      </td>
                    </tr>
                  </tbody>

                  <!-- Reste du code inchangé -->
                </nz-table>
              </perfect-scrollbar>
            </div>
          </div>
          <div nz-col nzXl="12" nzXs="24">
            <div
              class="d-flex align-items-center justify-content-center h-full"
            >
              <div id="region-map"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./salesLocation.component.scss'],
})
export class SaleLocationComponent implements OnInit {
  locations: any;
  tabData: { key: string; label: string }[];
  people: any = {};
  id_User: number;
  filteredPeople: any = [];

  usersCountsByAddress: any = [];

  ngAfterViewInit(): void {
    this.createMap();
  }

  createMap(): void {
    new svgMap({
      targetElementID: 'region-map',
      initialZoom: 1.06,
      initialPan: { x: 30, y: 60 },
      flagType: 'emoji',
      colorMax: '#DBE1E8',
      colorMin: '#DBE1E8',
      colorNoData: '#DBE1E8',
      data: {
        ...svgMapDataGPD,
      },
    });
  }

  constructor(
    private transportService: TransportService,
    private ReservationService: ReservationTransportService
  ) {
    this.locations = tableData.salesLocation;
    this.tabData = [
      { key: 'today', label: 'Today' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' },
      { key: 'year', label: 'year' },
    ];
  }

  //Dropdown Data
  appItems = items.appItems;

  //Tabs
  @Input() componentId: string;
  sellingTab: string = 'today';
  handleClick(tab: string): void {
    this.sellingTab = tab;
    const storageKey = `sellingTab_${this.componentId}`; // Use a unique key for each component
    localStorage.setItem(storageKey, tab);
  }
  totalSales: any = {};
  ngOnInit(): void {
    const storageKey = `sellingTab_${this.componentId}`; // Use the same unique key as in handleClick
    const storedTab = localStorage.getItem(storageKey);
    if (storedTab) {
      this.sellingTab = storedTab;
    }
    this.ReservationService.getReservationTransport().subscribe((response) => {
      this.people = response;
      this.filteredPeople = response;
      console.log(this.filteredPeople);
    });
    this.transportService
      .countOfNamesPerAddress()
      .subscribe((response: any) => {
        this.usersCountsByAddress = response;
        console.log(this.usersCountsByAddress);
      });
  }
}
