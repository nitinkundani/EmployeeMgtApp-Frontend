import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  // data: string;

  data  = 1; 

  constructor() { 
    setInterval(() => {
      if(this.data < 1000){
      this.data++;
      } 
      else{
        this.data=1;
      }
    }, 1000);
  }
}
