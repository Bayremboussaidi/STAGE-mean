import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTransportComponent } from './all-transport.component';

const routes: Routes = [
  {
    path: 'AllTransport',
    component: AllTransportComponent,
    data: {
      title: 'Transports',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTransportRoutingModule {}
