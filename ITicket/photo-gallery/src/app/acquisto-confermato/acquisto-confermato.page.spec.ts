import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcquistoConfermatoPage } from './acquisto-confermato.page';

describe('AcquistoConfermatoPage', () => {
  let component: AcquistoConfermatoPage;
  let fixture: ComponentFixture<AcquistoConfermatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquistoConfermatoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcquistoConfermatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
