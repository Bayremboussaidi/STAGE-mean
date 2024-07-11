import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as XLSX from 'xlsx';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReservationTransportService } from 'src/app/shared/services/reservation-transport.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransportService } from 'src/app/shared/services/transport.service';

interface Employee {
  id: number;
  adresseDestination: string;
  dateSortie: string;
  heureSortie: string;
  prenomTransporteur: string;
}

@Component({
  selector: 'app-table',
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative "
    >
      <div
        class="px-[25px] py-[30px] gap-[15px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
      >
        <button
          class="flex items-center px-[14px] text-sm text-white rounded-md font-semibold bg-primary border-primary h-10 gap-[6px]"
          nz-button
          (click)="showNewContact(newContactContent)"
        >
          <span class="m-0">Export</span>
        </button>
        <ng-template #newContactContent>
          <form nz-form nzLayout="vertical">
            <nz-form-item>
              <nz-form-control>
                <input
                  class="h-[50px] border-normal dark:border-white/10 px-[20px] placeholder-shown:text-light-extra dark:placeholder-shown:text-white/60 rounded-[5px] dark:bg-white/10"
                  type="text"
                  [ngModel]="fileName"
                  (input)="fileName = $event.target.value"
                  nz-input
                  placeholder="File Name"
                  name="fileName"
                />
              </nz-form-control>
            </nz-form-item>
            <nz-form-item class="mb-0">
              <nz-form-control>
                <nz-select
                  class="min-w-[260px] capitalize [&>nz-select-top-control]:border-normal dark:[&>nz-select-top-control]:border-white/10 [&>nz-select-top-control]:bg-white [&>nz-select-top-control]:dark:bg-white/10 [&>nz-select-top-control]:shadow-none [&>nz-select-top-control]:text-dark [&>nz-select-top-control]:dark:text-white/60 [&>nz-select-top-control]:h-[50px] [&>nz-select-top-control]:flex [&>nz-select-top-control]:items-center [&>nz-select-top-control]:rounded-[5px] [&>nz-select-top-control]:px-[20px] [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white/60"
                  [(ngModel)]="exportFormat"
                  nzPlaceHolder="Select a format"
                  nzAllowClear
                  name="exportFormat"
                >
                  <nz-option nzValue="CSV" nzLabel="CSV"></nz-option>
                  <nz-option nzValue="XLXS" nzLabel="XLXS"></nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </form>
        </ng-template>
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
                placeholder="Adresse "
                [(ngModel)]="value"
                (ngModelChange)="onSearch()"
              />
            </div>

            <div class="inline-flex items-center">
              <span class="ltr:mr-2 rtl:ml-2 dark:text-white/60"
                >Chercher:</span
              >
              <input
                class="h-10 px-[20px] text-body dark:text-white/60 bg-white dark:bg-white/10 border-normal border-1 dark:border-white/10 rounded-[6px]"
                nz-input
                placeholder="Date (YYYY-MM-DD)"
                [(ngModel)]="searchDate"
                (ngModelChange)="onSearchDate()"
                type="date"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="px-[25px] pt-0 pb-[25px]">
        <div class="overflow-x-auto">
          <nz-table
            #rowSelectionTable
            nzShowSizeChanger
            [nzData]="listOfCurrentPageData"
            (nzCurrentPageDataChange)="onCurrentPageDataChange($event)"
            [nzFrontPagination]="false"
            class="text-sm rounded-[5px] max-xl:whitespace-nowrap"
          >
            <thead>
              <tr>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-[25px] py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-s-[6px] capitalize"
                  [(nzChecked)]="checked"
                  [nzIndeterminate]="indeterminate"
                  (nzCheckedChange)="onAllChecked($event)"
                ></th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  adresse
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  date de sortie
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  heure de sortie
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  transporteur
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  utilisateur
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  status
                </th>
                <th
                  class="bg-[#f8f9fb] dark:bg-[#323440] px-4 py-3.5 text-start text-theme-gray dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize"
                >
                  action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-[#1b1d2a]">
              <tr class="group" *ngFor="let data of filteredPeople">
                <td
                  class=" px-[25px] py-2.5 pt-[15px] text-start last:text-end text-dark dark:text-white/[.87] group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[6px]"
                  [nzChecked]="setOfCheckedId.has(data.id)"
                  (nzCheckedChange)="onItemChecked(data.id, $event)"
                ></td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.adresseDestination }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end lowercase text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.dateSortie }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.heureSortie }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.prenomTransporteur }}
                </td>
                <td
                  class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-white/[.87] border-none group-hover:bg-transparent"
                >
                  {{ data.nomPrenom }}
                </td>
                <td
                  class="ltr:pr-[20px] rtl:pl-[20px] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent"
                  style="{
                    'bg-green-200 text-green-700':
                      data.statusReservation === 'active',
                    'bg-red-200 text-red-700':
                      data.statusReservation === 'deactivated',
                    'bg-blue-200 text-blue-700':
                      data.statusReservation === 'enpause'
                  }"
                >
                  {{ data.statusReservation }}
                </td>

                <li>
                  <div class="flex items-center justify-center">
                    <span
                      class=" cursor-pointer text-light dark:text-white/60 [&>svg]:w-[14px] [&>svg]:h-[14px] hover:text-info "
                      nz-icon
                      nzType="edit"
                      nzTheme="outline"
                      (click)="editTplModal(data.id, Title, Content, Footer)"
                    >
                    </span>
                  </div>
                </li>
              </tr>
            </tbody>
          </nz-table>
          <div class="flex items-center justify-end">
            <nz-pagination
              class="mt-3"
              [nzPageIndex]="pageIndex"
              [nzTotal]="listOfData.length"
              [nzPageSize]="pageSize"
              (nzPageIndexChange)="onPageIndexChanged($event)"
            ></nz-pagination>
          </div>
        </div>
      </div>
    </div>
    <ng-template #Title>
      <span>Modification</span>
    </ng-template>
    <ng-template #Content let-params>
      <form nz-form nzLayout="vertical" [formGroup]="editForm">
        <nz-form-item>
          <nz-form-control>
            <nz-form-label
              nzRequired
              class="text-[15px] font-semibold text-dark dark:text-white/[.87] capitalize mb-[10px]"
              >statusReservation</nz-form-label
            >
            <nz-select
              nzPlaceHolder="statusReservation"
              formControlName="statusReservation"
              class="border-none"
            >
              <nz-option nzValue="confirmer" nzLabel="confirmer"></nz-option>
              <nz-option nzValue="annuler" nzLabel="annuler"></nz-option>
              <nz-option nzValue="en attente" nzLabel="en attente"></nz-option>
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
export class TableComponent implements OnInit {
  checked = false;
  modalRef: NzModalRef;
  reservationForm: FormGroup;
  editForm: FormGroup;
  id_transport: number;
  id: number;
  indeterminate = false;
  pageIndex = 1; // Current page index
  pageSize = 10; // Number of items per page
  listOfCurrentPageData: Employee[] = []; // Remove 'readonly'
  listOfData: Employee[] = [];
  setOfCheckedId = new Set<number>();
  fileName: string = '';
  exportFormat: string | undefined;
  fullListOfData: Employee[] = [];
  searchQuery: string = '';
  value = '';
  people: any = [];
  filteredPeople: any = [];
  searchDate: any;

  constructor(
    private http: HttpClient,
    private modalService: NzModalService,
    private reservationTransport: ReservationTransportService,

    private ReservationTransport: TransportService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {}

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: Employee[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      statusReservation: new FormControl('', Validators.required),
    });

    this.reservationTransport.getReservationTransport().subscribe(
      (response) => {
        this.people = response;
        this.filteredPeople = response;
        const startIndex = (this.pageIndex - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        // Slice the full data to get the data for the current page
        this.listOfData = this.filteredPeople.slice(startIndex, endIndex);
      },
      (error) => {
        console.log('Error reading JSON file:', error);
      }
    );
    console.log(this.filteredPeople);
    this.editForm = this.fb.group({
      statusReservation: [''],
    });
  }

  //   loadEmployeeData(): void {
  //     this.http
  //       .get<Employee[]>('assets/data/pages/employees-data.json')
  //       .subscribe(
  //         (data) => {
  //           this.fullListOfData = data; // Store the full data separately

  //           // Calculate the start and end index for the current page
  //           const startIndex = (this.pageIndex - 1) * this.pageSize;
  //           const endIndex = startIndex + this.pageSize;

  //           // Slice the full data to get the data for the current page
  //           this.listOfData = this.fullListOfData.slice(startIndex, endIndex);

  //           this.onSearch(this.searchQuery); // Trigger initial filtering
  //         },
  //         (error) => {
  //           console.error('Error loading employee data:', error);
  //         }
  //       );
  //   }

  // Function to handle the search input change
  onSearch(): void {
    if (this.value) {
      const alphabet = this.value.charAt(0).toUpperCase();
      this.filteredPeople = this.people.filter((person) =>
        person.adresseDestination.toUpperCase().startsWith(alphabet)
      );
    } else {
      this.filteredPeople = this.people;
    }
  }
  onSearchDate(): void {
    console.log(this.filteredPeople);
    if (this.searchDate) {
      // Filtrer les données en fonction de la date de sortie
      this.filteredPeople = this.people.filter((person) =>
        person.dateSortie.toLowerCase().includes(this.searchDate.toLowerCase())
      );
    } else {
      this.filteredPeople = this.people;
    }
  }

  // Function to handle the page index change
  onPageIndexChanged(index: number): void {
    this.pageIndex = index;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    // Slice the full data to get the data for the new page
    this.listOfCurrentPageData = this.fullListOfData.slice(
      startIndex,
      endIndex
    );
  }

  // Show the modal to export the selected employees
  showNewContact(newContactContent: TemplateRef<{}>) {
    const selectedEmployees = this.filteredPeople.filter((employee) =>
      this.setOfCheckedId.has(employee.id)
    );

    if (selectedEmployees.length === 0) {
      this.notification.error(
        'Erreur',
        "Veuillez sélectionner au moins un employé pour l'exportation.",
        {
          nzDuration: 3000,
          nzStyle: { background: '#fff1f0', color: '#f5222d' },
        }
      );
      return;
    }

    // Open the modal
    const modal = this.modalService.create({
      nzTitle: 'Export File',
      nzContent: newContactContent,
      nzFooter: [
        {
          label: 'Export',
          type: 'primary',
          onClick: () => {
            this.exportData(selectedEmployees);
            this.modalService.closeAll();
          },
        },
      ],
      nzWidth: 520,
    });
  }
  // Function to export the selected employees
  exportData(selectedEmployees: Employee[]) {
    const fileName = this.fileName.trim() || 'exported_data';
    if (this.exportFormat === 'CSV') {
      const csvData = selectedEmployees.map(
        (employee) =>
          `${employee.adresseDestination},${employee.dateSortie},${employee.heureSortie},${employee.prenomTransporteur}`
      );
      const csvContent = 'data:text/csv;charset=utf-8,' + csvData.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${fileName}.csv`);

      // Attacher un gestionnaire d'événements pour vérifier après le téléchargement du fichier
      link.addEventListener('click', () => {
        this.checkAfterExport(); // Appeler la méthode pour vérifier après l'exportation
      });

      link.click(); // Immédiatement cliquer sur le lien pour déclencher le téléchargement
    } else if (this.exportFormat === 'XLXS') {
      const worksheet: XLSX.WorkSheet =
        XLSX.utils.json_to_sheet(selectedEmployees);
      const workbook: XLSX.WorkBook = {
        Sheets: { data: worksheet },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const data: Blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(data);
      link.download = `${fileName}.xlsx`;

      // Attacher un gestionnaire d'événements pour vérifier après le téléchargement du fichier
      link.addEventListener('click', () => {
        this.checkAfterExport(); // Appeler la méthode pour vérifier après l'exportation
      });

      link.click(); // Immédiatement cliquer sur le lien pour déclencher le téléchargement
    }
  }

  checkAfterExport() {
    // Ajouter votre logique de vérification ici
    console.log('Exportation terminée avec succès !');
    // Vous pouvez afficher un message ou exécuter toute autre action nécessaire après l'exportation
  }
  editTplModal(
    id: number,
    Title: TemplateRef<{}>,
    Content: TemplateRef<{}>,
    Footer: TemplateRef<{}>
  ): void {
    this.id = id;
    this.modalRef = this.modal.create({
      nzTitle: Title,
      nzContent: Content,
      nzFooter: Footer,
      nzMaskClosable: true,
      nzClosable: true,
      nzWidth: 620,
      nzOnOk: () => console.log('Click ok'),
    });
    this.ReservationTransport.getReservationById(id).subscribe(
      (response: any) => {
        console.log(id);

        console.log(response);

        this.editForm.patchValue(response);
      }
    );
    console.log(this.editForm);
  }
  onSubmit() {
    const formData = this.editForm.value;
    const data = {
      statusReservation: formData.statusReservation,
    };

    this.ReservationTransport.updateStatusResevation(this.id, data).subscribe(
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
