import { Routes, RouterModule } from '@angular/router';

export const FullLayout_ROUTES: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('../../authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  // {
  //   path: 'RepasCommande',
  //   loadChildren: () =>
  //     import(
  //       '../../TransportRestauration/TransportRestauration.routing.module'
  //     ).then((m) => m.TransportRestaurationRoutingModule),
  // },
];
