import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssistenzaPage } from './assistenza.page';

describe('AssistenzaPage', () => {
  let component: AssistenzaPage;
  let fixture: ComponentFixture<AssistenzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistenzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssistenzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
