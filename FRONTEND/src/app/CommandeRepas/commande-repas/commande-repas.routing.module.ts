import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandeRepasComponent } from './commande-repas.component';

const routes: Routes = [
  {
    path: 'commandeRepas',
    component: CommandeRepasComponent,
    data: {
      title: 'Commande Repas',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class commandeRepasRoutingModule {}
