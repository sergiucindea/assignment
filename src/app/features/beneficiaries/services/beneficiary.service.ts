import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Beneficiary, BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../models/beneficiary.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { ModalStatusType } from 'src/app/core/components/modal/modal.config';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private localStorageKey = 'beneficiaryList';
  constructor(private storageService: StorageService) { }

  public getBeneficiaryList() {
    return this.storageService.retrieveInfoFromStorage(this.localStorageKey);
  }

  public updateBeneficiary(model: BeneficiaryDisplayModel) {
    let response: ResponseModel;

    let list: BeneficiaryDisplayModel[] = this.storageService.retrieveInfoFromStorage(this.localStorageKey);
    let itemFound = list.find((item: BeneficiaryDisplayModel) => item.id === model.id);

    if (!itemFound) {
      response = {
        message: 'No Beneficiary found!',
        type: ModalStatusType.Error
      }

      return response;
    }

    this.mapBeneficiaryModel(itemFound, model);

    this.storageService.clearStorage();
    this.storageService.saveToLocalStorage(this.localStorageKey, list);

    response = {
      message: 'Beneficiary edited successfully!',
      type: ModalStatusType.Success
    };

    return response;
  }

  private mapBeneficiaryModel(target: BeneficiaryDisplayModel, source: BeneficiaryDisplayModel) {
    target.CNP = source.CNP;
    target.CUI = source.CUI;
    target.IBANs = source.IBANs;
    target.address = source.address;
    target.birthDate = source.birthDate;
    target.dateOfIncorporation = source.dateOfIncorporation;
    target.name = source.name;
    target.firstName = source.firstName;
    target.lastName = source.lastName;
    target.phone = source.phone;
  }

  public getBeneficiaryById(id: number): BeneficiaryDisplayModel | undefined {
    let list: BeneficiaryDisplayModel[] = this.storageService.retrieveInfoFromStorage(this.localStorageKey);
    let itemFound = list.find((item: BeneficiaryDisplayModel) => item.id === id);

    return itemFound;
  }

  public deleteBeneficiary(id: number): ResponseModel {
    let response: ResponseModel;

    let list: BeneficiaryDisplayModel[] = this.storageService.retrieveInfoFromStorage(this.localStorageKey);
    let itemFound = list.find((item: BeneficiaryDisplayModel) => item.id === id);

    if (!itemFound) {
      response = {
        message: 'No Beneficiary found!',
        type: ModalStatusType.Error
      }

      return response;
    }

    list = list.filter((item: BeneficiaryDisplayModel) => item.id !== id);

    this.storageService.clearStorage();
    this.storageService.saveToLocalStorage(this.localStorageKey, list);

    response = {
      message: 'Beneficiary deleted successfully!',
      type: ModalStatusType.Success
    };

    return response;
  }

  public createBeneficiary(model: BeneficiaryDisplayModel): ResponseModel {
    let response: ResponseModel;

    let list: BeneficiaryDisplayModel[] = this.storageService.retrieveInfoFromStorage(this.localStorageKey);
    model.id = list[list.length - 1].id!++;

    let cuiOrCnp = model.type === BeneficiaryTypeEnum.LegalEntity ? model.CUI : model.CNP;
    let existingBeneficiary = list.find((beneficiary: BeneficiaryDisplayModel) => beneficiary.CNP === cuiOrCnp || beneficiary.CUI === cuiOrCnp);
    if (existingBeneficiary) {
      response = {
        message: 'The Beneficiary already exists!',
        type: ModalStatusType.Error
      }
    }

    list.push(model);
    this.storageService.clearStorage();
    this.storageService.saveToLocalStorage(this.localStorageKey, list);
    
    response = {
      message: 'The Beneficiary was added successfully!',
      type: ModalStatusType.Success
    }
    return response;
  }
}
