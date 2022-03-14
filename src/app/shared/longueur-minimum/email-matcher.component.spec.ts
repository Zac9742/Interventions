import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from 'src/app/probleme/probleme.component';
import { TypeproblemeService } from 'src/app/probleme/typeprobleme.service';


describe('email match Validator', () => {
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

      

});