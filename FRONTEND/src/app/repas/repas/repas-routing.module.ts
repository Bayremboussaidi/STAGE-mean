import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepasComponent } from './repas.component';

const routes: Routes = [
  {
    path: 'repas',
    component: RepasComponent,
    data: {
      title: 'Les repas',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepasRoutingModule {}
