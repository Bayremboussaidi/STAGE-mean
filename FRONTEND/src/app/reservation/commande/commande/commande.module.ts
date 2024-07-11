import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommandeComponent } from './commande.component';
import { commandeRoutingModule } from './commande.routing.module';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,

  NzCheckboxModule,
  AngularSvgIconModule.forRoot(),
];

@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    commandeRoutingModule,
    ...antdModule,
  ],
  declarations: [CommandeComponent],
})
export class commandeModule {}
