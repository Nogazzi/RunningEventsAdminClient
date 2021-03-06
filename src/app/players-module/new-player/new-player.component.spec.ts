import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerComponent } from './new-player.component';

describe('NewPlayerComponent', () => {
  let component: NewPlayerComponent;
  let fixture: ComponentFixture<NewPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
