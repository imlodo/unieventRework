import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEmoticonPanelComponent } from './message-emoticon-panel.component';

describe('MessageEmoticonPanelComponent', () => {
  let component: MessageEmoticonPanelComponent;
  let fixture: ComponentFixture<MessageEmoticonPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageEmoticonPanelComponent]
    });
    fixture = TestBed.createComponent(MessageEmoticonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
