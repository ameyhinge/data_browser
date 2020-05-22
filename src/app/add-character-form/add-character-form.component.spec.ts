import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterFormComponent } from './add-character-form.component';

describe('AddCharacterFormComponent', () => {
  let component: AddCharacterFormComponent;
  let fixture: ComponentFixture<AddCharacterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCharacterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
