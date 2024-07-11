import { Component } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartData,
} from 'chart.js';
import items from '../../../../assets/data/global/dropdown.json';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { TransportService } from 'src/app/shared/services/transport.service';

@Component({
  selector: 'doughnut-chart',
  template: `
    <div
      class="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] rounded-10 relative h-full"
    >
      <div
        class="px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
      >
        <h1
          class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-white/[.87] capitalize"
        >
          Les réservations de transport
        </h1>
      </div>
      <div class="p-[25px] pt-0">
        <div class="hexadash-chart-container">
          <canvas
            baseChart
            class="chart"
            [data]="doughnutChartData"
            [type]="doughnutChartType"
            height="150"
          >
          </canvas>
        </div>
      </div>
    </div>
  `,
})
export class DoughnutChartComponent {
  dashboard: any;
  reservationCounts: any = {};
  appItems = items.appItems;
  doughnutChartLabels: string[] = [
    'Demande en attente',
    'Demande annuler',
    'Demande confirmer',
  ];
  doughnutChartData: ChartData<'doughnut'>;
  constructor(private ReservationTransport: TransportService) {
    Chart.register(Annotation);
  }
  // Doughnut

  updateDoughnutChartData() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.reservationCounts.attente || 0, 0, 0] },
        { data: [0, this.reservationCounts.confirmer || 0, 0] },
        { data: [0, 0, this.reservationCounts.annuler || 0] },
      ],
    };
  }
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        mode: 'index',
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
    layout: {
      padding: {
        left: -13,
        right: -10,
        top: 0,
        bottom: 0,
      },
    },
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  ngOnInit() {
    this.ReservationTransport.countReservation().subscribe(
      (response: any) => {
        console.log(response);
        this.reservationCounts.attente = response.countReservation;

        this.updateDoughnutChartData();
      },
      (error) => {
        console.log('Error fetching reservation count:', error);
      }
    );
    this.ReservationTransport.countReservationConfirmer().subscribe(
      (response: any) => {
        console.log(response);
        this.reservationCounts.confirmer = response.reservationConfirmer;

        this.updateDoughnutChartData();
      },
      (error) => {
        console.log('Error fetching reservation count:', error);
      }
    );
    this.ReservationTransport.countReservationAnnuler().subscribe(
      (response: any) => {
        console.log(response);
        // this.reservationCount = response.countReservation;
        this.reservationCounts.annuler = response.reservationAnnuler;

        this.updateDoughnutChartData();
      },
      (error) => {
        console.log('Error fetching reservation count:', error);
      }
    );
  }
}
