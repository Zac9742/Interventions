import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher.component';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesDeProblemes: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typesProbleme: TypeproblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['',[Validators.required, ZonesValidator.longueurMinimum(3)]],
      nom: ['', [Validators.required, ZonesValidator.longueurMaximum(50)]],
      typeProbleme: ['',  Validators.required],
      notification: [''],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      descriptionProbleme: ['',[Validators.required, Validators.minLength(5)]],
      noUnite: '',
      dateProbleme: {value: Date(), disabled: true}
    });

    this.typesProbleme.obtenirCategories()
    .subscribe(cat => this.typesDeProblemes = cat,
               error => this.errorMessage = <any>error);  

    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.appliquerNotifications(value));
  }

  appliquerNotifications(typeNotification: String): void {
    const telephoneControl = this.problemeForm.get('telephone');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    
    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();


    if(typeNotification === 'Texte') {
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)])
      telephoneControl.enable();
    }
    else if(typeNotification === 'Courriel'){
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
    }
    else{
      if(typeNotification === 'Aucun'){
        courrielControl.disable();
        courrielConfirmationControl.disable();
        telephoneControl.disable();
      }
    }

    
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
  }

  

  save(): void{}
}
