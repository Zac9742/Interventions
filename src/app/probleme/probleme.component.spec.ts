import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zone = component.problemeForm.get('prenom');
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    // Préparer une variable pour manipuler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    let control = { value: '          '};
    // Faire l'appel du validateur
    let result = validator(control as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat PRÉVU
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    // Préparer une variable pour manipuler le validateur
    let validator = ZonesValidator.longueurMinimum(3);
    let control = { value: '  x'};
    // Faire l'appel du validateur
    problemeForm.get('prenom')
    let result = validator(control as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat PRÉVU
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });
});
