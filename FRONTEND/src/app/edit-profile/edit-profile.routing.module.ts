import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from '../edit-profile/edit-profile';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: 'profile',
    component: SettingComponent,
    data: {
      title: 'Modifier Profil',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
