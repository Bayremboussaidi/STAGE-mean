import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-transport',
  templateUrl: './reservation-transport.component.html',
  styleUrls: ['./reservation-transport.component.css'],
})
export class ReservationTransportComponent {
  isLoading = true;
  showContent = false;
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
