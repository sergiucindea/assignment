import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  parseDate(date: Date): string {
    
    if (!date) {
      return '';
    }

    const dateObject = new Date(date);

    const day: string = String(dateObject.getUTCDate()).padStart(2, '0'); 
    const month: string = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year: string = String(dateObject.getUTCFullYear());

    return `${day}-${month}-${year}`;
  }
}
