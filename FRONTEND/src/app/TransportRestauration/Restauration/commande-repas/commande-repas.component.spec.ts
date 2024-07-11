import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeRepasComponent } from './commande-repas.component';

describe('CommandeRepasComponent', () => {
  let component: CommandeRepasComponent;
  let fixture: ComponentFixture<CommandeRepasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeRepasComponent]
    });
    fixture = TestBed.createComponent(CommandeRepasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
