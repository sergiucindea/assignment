import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterByField<T>(items: T[], field: keyof T, value: string | number): T[] {
    if (!items || items.length === 0 || !field || !value) {
      return items;
    }

    return items.filter(item => {
      let itemValue = item[field];

      return itemValue && itemValue.toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  }
}
