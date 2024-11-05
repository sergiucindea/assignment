import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  parseDate(date: Date): string {
    
    if (!date) {
      return '';
    }

    let dateObject = new Date(date);

    let day: string = String(dateObject.getUTCDate()).padStart(2, '0'); 
    let month: string = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    let year: string = String(dateObject.getUTCFullYear());
    return `${day}-${month}-${year}`;
    
  }

  public formatToDate(date: any, format: string = "MM/DD/yyyy") {
    if(date === null || date === "" || date === undefined)
      return null;
    
    return (moment(date)).format(format);
  }

  public showFormControlError(form: FormGroup, controlName: string, errorName: string) {
    return form.get(controlName)?.hasError(errorName) && form.get(controlName)?.touched;
  }

  public removeSpaces(value?: string) {
    if (value)
      return value.replace(/\s+/g, '');

    return '';
  }

  //#region Custom Validators

  cuiValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let value = control.value;
  
      let isValid = this.validateCIF(value);
  
      if (!isValid) {
        return { invalidCUI: true };
      }
  
      return null;
    };
  }
  
  private validateCIF(value: string): boolean {
    if (typeof value !== 'string') {
      return false;
    }
  
    let cif = value.toUpperCase();
    cif = (cif.indexOf('RO') > -1) ? cif.substring(2) : cif;
    cif = cif.replace(/\s/g, '');
    if (cif.length < 2 || cif.length > 10) {
      return false;
    }

    if (Number.isNaN(parseInt(cif))) {
      return false;
    }

    let testKey = '753217532';
    let controlNumber = parseInt(cif.substring(cif.length - 1));
    cif = cif.substring(0, cif.length - 1);
    while (cif.length !== testKey.length) {
      cif = '0' + cif;
    }
    let sum = 0;
    let i = cif.length;
  
    while (i--) {
      sum += (parseInt(cif.charAt(i)) * parseInt(testKey.charAt(i)));
    }
  
    let calculatedControlNumber = sum * 10 % 11;
  
    if (calculatedControlNumber === 10) {
      calculatedControlNumber = 0;
    }
  
    return controlNumber === calculatedControlNumber;
  }

  cnpValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let cnp = control.value;
  
      if (!/^\d{13}$/.test(cnp)) {
        return { invalidCNP: true };
      }
  
      let year = parseInt(cnp.substring(1, 3), 10);
      let month = parseInt(cnp.substring(3, 5), 10);
      let day = parseInt(cnp.substring(5, 7), 10);
      
      let centuryPrefix = cnp.charAt(0) === '1' || cnp.charAt(0) === '2' ? '19' : '20';
      let fullYear = parseInt(centuryPrefix + year.toString(), 10);
  
      let dateOfBirth = new Date(fullYear, month - 1, day);
      if (
        dateOfBirth.getFullYear() !== fullYear ||
        dateOfBirth.getMonth() !== month - 1 ||
        dateOfBirth.getDate() !== day
      ) {
        return { invalidCNP: true };
      }
  
      let controlNr = this.calculateControlNr(cnp);
      if (controlNr !== parseInt(cnp.charAt(12), 10)) {
        return { invalidCNP: true };
      }
  
      return null;
    };
  }
  
  private calculateControlNr(cnp: string): number {
    let coefficients = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
    let sum = 0;
  
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnp.charAt(i), 10) * coefficients[i];
    }
  
    let remainder = sum % 11;
    return remainder === 10 ? 1 : remainder;
  }

  ibanValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let ibans = control.value;

      if (Array.isArray(ibans) && ibans.length > 0) {
        let invalidIbans: string[] = [];
        ibans.forEach((iban: string) => {
          let isValid: boolean = this.isIBANValid(iban);
          if (!isValid)
            invalidIbans.push(iban);
        });

        if (invalidIbans.length > 0)
          return { invalidIBAN: true }; 
      }

      return null;
    };
  }
  
  private isIBANValid(iban: string): boolean {
    let trimmedIban = iban.replace(/\s+/g, '').toUpperCase();
  
    if (!/^[A-Z0-9]+$/.test(trimmedIban)) {
      return false;
    }
  
    if (!this.isValidLength(trimmedIban)) {
      return false;
    }
  
    if (!this.isValidChecksum(trimmedIban)) {
      return false;
    }
  
    return true;
  }
  
  private isValidLength(iban: string): boolean {
    let countryIBANLengths: { [key: string]: number } = {
      'RO': 24,
      'DE': 22,
      'FR': 27,
      'GB': 22,
    };
  
    let countryCode = iban.substring(0, 2);
    let expectedLength = countryIBANLengths[countryCode];
  
    return expectedLength ? iban.length === expectedLength : false;
  }
  
  private isValidChecksum(iban: string): boolean {
    let rearrangedIban = iban.slice(4) + iban.slice(0, 4);
    let numericIban = rearrangedIban
      .split('')
      .map((char) => (isNaN(Number(char)) ? char.charCodeAt(0) - 55 : char))
      .join('');
  
    let checksum = BigInt(numericIban) % BigInt(97);
    return checksum === BigInt(1);
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let dateValue = control.value;

      if (dateValue) {
        let date = new Date(dateValue);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
    
        if (!dateValue || isNaN(date.getTime()) || date > today) {
          return { invalidDate: true };
        }
      }
      
      return null;
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
  
      let trimmedValue = control.value.replace(/-/g, '').trim();
      let isValid = /^\d{10}$/.test(trimmedValue);
  
      return isValid ? null : { invalidPhone: true };
    };
  }

  //#endregion
}
