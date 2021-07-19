import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfermaCambioNominativoPage } from './conferma-cambio-nominativo.page';

describe('ConfermaCambioNominativoPage', () => {
  let component: ConfermaCambioNominativoPage;
  let fixture: ComponentFixture<ConfermaCambioNominativoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfermaCambioNominativoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfermaCambioNominativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
