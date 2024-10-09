import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelSelectorComponent } from './device-model-selector.component';

describe('DeviceModelSelectorComponent', () => {
  let component: DeviceModelSelectorComponent;
  let fixture: ComponentFixture<DeviceModelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceModelSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceModelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
