import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePersonneComponent } from './formulaire-personne.component';

describe('FormulairePersonneComponent', () => {
  let component: FormulairePersonneComponent;
  let fixture: ComponentFixture<FormulairePersonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulairePersonneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulairePersonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
