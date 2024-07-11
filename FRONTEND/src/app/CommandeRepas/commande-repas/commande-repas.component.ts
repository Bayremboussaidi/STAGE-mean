import { Component } from '@angular/core';

@Component({
  selector: 'app-commande-repas',
  templateUrl: './commande-repas.component.html',
  styleUrls: ['./commande-repas.component.css'],
})
export class CommandeRepasComponent {
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
