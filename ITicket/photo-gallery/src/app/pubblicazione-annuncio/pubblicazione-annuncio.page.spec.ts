import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PubblicazioneAnnuncioPage } from './pubblicazione-annuncio.page';

describe('PubblicazioneAnnuncioPage', () => {
  let component: PubblicazioneAnnuncioPage;
  let fixture: ComponentFixture<PubblicazioneAnnuncioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubblicazioneAnnuncioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PubblicazioneAnnuncioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
