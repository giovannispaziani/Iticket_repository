import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VenditaConfermataPage } from './vendita-confermata.page';

describe('VenditaConfermataPage', () => {
  let component: VenditaConfermataPage;
  let fixture: ComponentFixture<VenditaConfermataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenditaConfermataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VenditaConfermataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
