import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarrelloPage } from './carrello.page';

describe('CarrelloPage', () => {
  let component: CarrelloPage;
  let fixture: ComponentFixture<CarrelloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrelloPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrelloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
