import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambioNominativoBigliettoPage } from './cambio-nominativo-biglietto.page';

describe('CambioNominativoBigliettoPage', () => {
  let component: CambioNominativoBigliettoPage;
  let fixture: ComponentFixture<CambioNominativoBigliettoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioNominativoBigliettoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambioNominativoBigliettoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
