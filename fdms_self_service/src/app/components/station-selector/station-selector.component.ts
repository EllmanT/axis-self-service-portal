import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-station-selector',
  standalone: true,
  imports: [

    NgFor,
    // BrowserModule,
    // BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './station-selector.component.html',
  styleUrl: './station-selector.component.scss'
})
export class StationSelectorComponent {
  regions = [
    { name: 'Region 1 ', cities: ['Harare', 'Chitungwiza', 'Epworth'] },
    { name: 'Bulawayo', cities: ['Bulawayo', 'Nkulumane', 'Pumula'] },
    { name: 'Manicaland', cities: ['Mutare', 'Chipinge', 'Rusape'] },
   
  ];

  filteredStations: string[] = [];
  selectedStation: string = '';
  selectedRegion: string = '';

  @Output() regionSelected = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<string>();

  onRegionChange(region: string) {
    this.selectedRegion = region;
    const selected = this.regions.find(p => p.name === region);
    this.filteredStations = selected ? selected.cities : [];
    this.selectedStation = ''; // Reset selected station when region changes

    // Emit the selected region
    this.regionSelected.emit(this.selectedRegion);
    this.stationSelected.emit(this.selectedStation); // Emit empty station since it resets
  }

  onStationChange(station: string) {
    this.selectedStation = station;
    this.stationSelected.emit(this.selectedStation); // Emit the selected station
  }

  getSelectValue(event: Event): string {
    const target = event.target as HTMLSelectElement;
    return target ? target.value : '';
  }
}
