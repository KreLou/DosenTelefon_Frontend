import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopicSettingsPage } from './topic-settings.page';

describe('TopicSettingsPage', () => {
  let component: TopicSettingsPage;
  let fixture: ComponentFixture<TopicSettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSettingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
