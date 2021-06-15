import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotiziePage } from './notizie.page';

describe('NotiziePage', () => {
  let component: NotiziePage;
  let fixture: ComponentFixture<NotiziePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiziePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotiziePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
