import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarioEventiPage } from './calendarioEventi.page';

describe('CalendarioEventiPage', () => {
  let component: CalendarioEventiPage;
  let fixture: ComponentFixture<CalendarioEventiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioEventiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioEventiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
