import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RivenditaBigliettoPage } from './rivendita-biglietto.page';

describe('RivenditaBigliettoPage', () => {
  let component: RivenditaBigliettoPage;
  let fixture: ComponentFixture<RivenditaBigliettoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RivenditaBigliettoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RivenditaBigliettoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
