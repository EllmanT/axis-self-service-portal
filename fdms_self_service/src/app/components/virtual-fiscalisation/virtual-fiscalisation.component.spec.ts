import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualFiscalisationComponent } from './virtual-fiscalisation.component';



describe('VirtualFiscalisationComponent', () => {
  let component: VirtualFiscalisationComponent;
  let fixture: ComponentFixture<VirtualFiscalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualFiscalisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualFiscalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
