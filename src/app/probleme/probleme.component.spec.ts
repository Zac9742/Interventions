import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';

import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers:[TypeproblemeService]
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
    let result = validator(control as AbstractControl);
    //Comparer le résultat OBTENU avec le résultat PRÉVU
    expect(result['nbreCaracteresInsuffisants']).toBe(true);
  });

  it('#15 | Zone TELEPHONE est désactivé quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null);
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('NePasNotifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTruthy();
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTruthy();
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('')
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('Courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue('zac.com')
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('Courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('')
    zoneCourrielConfirmation.setValue('Zac.labelle@Hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('Courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('Zac.labelle@Hotmail.com')
    zoneCourrielConfirmation.setValue('');

    let groupe = component.problemeForm.get('courrielGroup');
    
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('Zac.labelle@Hotmail.com')
    zoneCourrielConfirmation.setValue('Test@hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    
    errors = groupe.errors || {};
    expect(errors['match']).toBeTruthy();
  });

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('Courriel');
    let errors = {};

    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('Zac.labelle@Hotmail.com')
    zoneCourrielConfirmation.setValue('Zac.labelle@Hotmail.com');

    let groupe = component.problemeForm.get('courrielGroup');
    
    errors = groupe.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    
    let zone = component.problemeForm.get('telephone');
    expect(zone.enabled).toBeTruthy();
  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTruthy();
  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.disabled).toBeTruthy();
  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    let errors = {};

    let zone = component.problemeForm.get('telephone');

    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('abc')

    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('123456789')

    errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('12345678912')

    errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('Texte');
    let errors = {};

    let zone = component.problemeForm.get('telephone');
    zone.setValue('1234567891')

    errors = zone.errors || {};
    expect(zone.valid).toBeTrue();
  });

  

});
