import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DynamicComponent } from '../../all-transport/dynamic';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.css'],
})
export class AddTransportComponent implements AfterViewInit {
  @ViewChild(DynamicComponent) DynamicComponent!: DynamicComponent;

  constructor() {}

  ngAfterViewInit(): void {
    // Automatically show the modal when the view is initialized
    this.showModal();
  }

  showModal(): void {
    // Show the modal of the child component (TicketTableComponent)
    if (this.DynamicComponent) {
      this.DynamicComponent.createTplModal(
        this.DynamicComponent.tplTitle,

        this.DynamicComponent.tplContent,
        this.DynamicComponent.tplFooter
      );
    }
  }
}
