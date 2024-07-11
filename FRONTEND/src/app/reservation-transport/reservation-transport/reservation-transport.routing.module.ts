import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationTransportComponent } from './reservation-transport.component';

const routes: Routes = [
  {
    path: 'reservationTransport',
    component: ReservationTransportComponent,
    data: {
      title: 'Les reservations de transport',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationTransportRoutingModule {}
