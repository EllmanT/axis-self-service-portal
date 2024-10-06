import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [

    NgFor,
    // BrowserModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './location-selector.component.html',
  styleUrl: './location-selector.component.scss'
})
export class LocationSelectorComponent {
  provinces = [
    { name: 'Harare', cities: ['Harare', 'Chitungwiza', 'Epworth'] },
    { name: 'Bulawayo', cities: ['Bulawayo', 'Nkulumane', 'Pumula'] },
    { name: 'Manicaland', cities: ['Mutare', 'Chipinge', 'Rusape'] },
    { name: 'Mashonaland East', cities: ['Marondera', 'Murehwa', 'Mutoko'] },
    { name: 'Mashonaland West', cities: ['Chinhoyi', 'Karoi', 'Norton'] },
    { name: 'Masvingo', cities: ['Masvingo', 'Zvishavane', 'Mwenezi'] },
    { name: 'Matabeleland North', cities: ['Victoria Falls', 'Hwange', 'Binga'] },
    { name: 'Matabeleland South', cities: ['Gwanda', 'Beitbridge', 'Filabusi'] },
    { name: 'Midlands', cities: ['Gweru', 'Kwekwe', 'Shurugwi'] }
  ];

  filteredCities: string[] = [];
  selectedCity: string = '';
  selectedProvince: string = '';

  @Output() provinceSelected = new EventEmitter<string>();
  @Output() citySelected = new EventEmitter<string>();

  onProvinceChange(province: string) {
    this.selectedProvince = province;
    const selected = this.provinces.find(p => p.name === province);
    this.filteredCities = selected ? selected.cities : [];
    this.selectedCity = ''; // Reset selected city when province changes

    // Emit the selected province
    this.provinceSelected.emit(this.selectedProvince);
    this.citySelected.emit(this.selectedCity); // Emit empty city since it resets
  }

  onCityChange(city: string) {
    this.selectedCity = city;
    this.citySelected.emit(this.selectedCity); // Emit the selected city
  }

  getSelectValue(event: Event): string {
    const target = event.target as HTMLSelectElement;
    return target ? target.value : '';
  }
}
