import { Component } from '@angular/core';

@Component({
  selector: 'app-all-transport',
  templateUrl: './all-transport.component.html',
  styleUrls: ['./all-transport.component.css'],
})
export class AllTransportComponent {
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
