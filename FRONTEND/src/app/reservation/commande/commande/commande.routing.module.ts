import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandeComponent } from './commande.component';

const routes: Routes = [
  // { path: '', component:  },
  {
    path: 'commande',
    component: CommandeComponent,
    data: {
      title: 'Commande ',
    },
  },
  // { path: 'commande-repas', component: CommandeRepasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class commandeRoutingModule {}
