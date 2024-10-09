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
    { name: 'Region 1 Small Clients Office', stations: ['SCO Kurima', 'Marondera', 'Bindura','Chinhoyi', 'Kariba'] },
    { name: 'Region 1 Medium Clients Office', stations: ['MCO Kurima'] },
    { name: 'Region 1 Large Clients Office', stations: ['LCO Kurima'] },
    { name: 'Region 2 ', stations: ['Beitbridge','Bulawayo Mhlahlandlela', 'Gwanda', 'Hwange','Victoria Falls Town Office'] },
    { name: 'Region 3 ', stations: ['Chinhoyi', 'Chipinge', 'Chiredzi','Gweru','Kadoma', 'Kariba','Kwekwe','Masvingo','Mutare', 'Rusape', 'Zvishavane'] },
   
  ];

  filteredStations: string[] = [];
  selectedStation: string = '';
  selectedRegion: string = '';

  @Output() regionSelected = new EventEmitter<string>();
  @Output() stationSelected = new EventEmitter<string>();

  onRegionChange(region: string) {
    this.selectedRegion = region;
    const selected = this.regions.find(p => p.name === region);
    this.filteredStations = selected ? selected.stations : [];
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
