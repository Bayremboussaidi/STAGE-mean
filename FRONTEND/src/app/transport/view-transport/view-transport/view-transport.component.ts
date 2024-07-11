import { Component } from '@angular/core';

@Component({
  selector: 'app-view-transport',
  templateUrl: './view-transport.component.html',
  styleUrls: ['./view-transport.component.css'],
})
export class ViewTransportComponent {
  isLoading = true;
  showContent = false;
  ngOnInit() {
    // Simulate loading time
    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }
}
