import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySchemeComponent } from './my-scheme.component';

describe('MySchemeComponent', () => {
  let component: MySchemeComponent;
  let fixture: ComponentFixture<MySchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySchemeComponent]
    });
    fixture = TestBed.createComponent(MySchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
