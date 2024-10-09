import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-device-model-selector',
  standalone: true,
  imports: [

    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './device-model-selector.component.html',
  styleUrl: './device-model-selector.component.scss'
})
export class DeviceModelSelectorComponent {
  deviceModels: [
    {name:'Revmax'},
    {name:'Server'},
    {name:'Tracksol 001'},
    {name:'Tracksol 003'},
    {name:'Eltrade A3'},
    {name:'Eltrade B1'},
    {name:'Eltrade CC300'},
    {name:'Eltrade PRP 250'},
    {name:'Eltrade TM-T810F'},
    {name:'Incotex 118'},
    {name:'Xero'},


  ]
   


  selectedDeviceModel: string = '';

  @Output() deviceModelSelected = new EventEmitter<string>();
  @Output() citySelected = new EventEmitter<string>();

  onDeviceModelChange(deviceModel: string) {
    this.selectedDeviceModel = deviceModel;

    // Emit the selected deviceModel
    this.deviceModelSelected.emit(this.selectedDeviceModel);
  }




}
