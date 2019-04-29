import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Car {
  id: number;
  year: number;
  make: string;
  model: string;
  hasDetails: 0;
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})

export class ModelsComponent implements OnInit {
  builtYear: number = 0;
  builtYears: number[];
  make: string = "";
  makes: string [];
  models: Car[];
  host: string = "https://vehicle-data.azurewebsites.net";
  offset: number = 0;
  fetch: number = 10;
  request: string = `/api/models?offset=${this.offset}&fetch=${this.fetch}`;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(){
    this.loadCars(0);
    this.loadYearsMakes();
  }

  async loadCars(offset: number){
    if (this.make !== ""){
      this.request += `&make=${this.make}`
    }
    if (this.builtYear != 0){
      this.request += `&year=${this.builtYear}`
    }
    this.models = await this.httpClient
      .get<Car[]>(`${this.host}${this.request}`)
      .toPromise();
    console.log(this.host+this.request)
    this.request = `/api/models?offset=${offset}&fetch=${this.fetch}`;
  }

  async loadYearsMakes(){
    this.builtYears = await this.httpClient
      .get<number[]>(`${this.host}\\api\\years`)
      .toPromise();
    this.makes = await this.httpClient
      .get<string[]>(`${this.host}\\api\\makes`)
      .toPromise();
  }

  incOffset(){
    this.offset += 10;
    this.loadCars(this.offset);
  }

  decOffset(){
    if (this.offset != 0) {
      this.offset -= 10;
      this.loadCars(this.offset);
    }
  }
}
