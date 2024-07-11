import { Routes } from '@angular/router';
import { ComponentsComponent } from '../../components/components.component';

export const CommonLayout_ROUTES: Routes = [
  //Dashboard
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  // Charts
  {
    path: 'changelog',
    children: [
      {
        path: '',
        redirectTo: '/changelog/changelog',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../changelog/changelog.module').then(
            (m) => m.ChangelogModule
          ),
      },
    ],
  },

  //Apps
  {
    path: 'apps',
    data: {
      title: 'Apps',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../apps/apps.module').then((m) => m.AppsModule),
      },
    ],
  },

  //Component
  {
    path: 'demo',
    component: ComponentsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
    ],
    data: {
      title: 'Réclamation ',
    },
  },

  // Charts
  {
    path: 'features',
    data: {
      title: 'features',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../features/features.module').then(
            (m) => m.FeaturesModule
          ),
      },
    ],
  },

  //Pages
  {
    path: 'pages',
    data: {
      title: 'Pages ',
    },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        redirectTo: '/users/AllUsers',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../users/all-users/users.module').then(
            (m) => m.AllUsersModule
          ),
      },
    ],
  },
  {
    path: 'transport',
    children: [
      {
        path: '',
        redirectTo: '/transport/AllTransport',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../transport/all-transport/transport.module').then(
            (m) => m.AllTransportModule
          ),
      },
    ],
  },
  {
    path: 'repas',
    children: [
      {
        path: '',
        redirectTo: '/repas/repas',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../repas/repas/repas.module').then((m) => m.repasModule),
      },
    ],
  },
  {
    path: 'reservationTransport',
    children: [
      {
        path: '',
        redirectTo: '/reservationTransport/reservationTransport',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../reservation-transport/reservation-transport/reservation-transport.module'
          ).then((m) => m.reservationTransportModule),
      },
    ],
  },
  {
    path: 'commandeRepas',
    children: [
      {
        path: '',
        redirectTo: '/commandeRepas/commandeRepas',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import(
            '../../CommandeRepas/commande-repas/commande-repas.module'
          ).then((m) => m.commandeRepasModule),
      },
    ],
  },

  {
    path: 'reservation',
    children: [
      {
        path: '',
        redirectTo: '/reservation/reservation',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../reservation/reservation/reservation.module').then(
            (m) => m.reservationModule
          ),
      },
    ],
  },
  {
    path: 'commande',
    children: [
      {
        path: '',
        redirectTo: '/commande/commande',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../reservation/commande/commande/commande.module').then(
            (m) => m.commandeModule
          ),
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        redirectTo: '/profile/profile',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('../../edit-profile/edit-profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
];
