import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      typeProbleme: [''],
      noTypeProbleme: ['', Validators.required],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
    });

    this.typesProbleme.obtenirCategories()
    .subscribe(cat => this.typesDeProblemes = cat,
               error => this.errorMessage = <any>error);  
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


    if(typeNotification === 'Telephone') {
      telephoneControl.enable();
    }
    else if(typeNotification === 'Courriel'){
      courrielControl.enable();
      courrielConfirmationControl.enable();
    }

    
    telephoneControl.updateValueAndValidity();
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();

  }

  save(): void{}
}
