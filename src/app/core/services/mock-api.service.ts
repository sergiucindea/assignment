import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from 'src/app/features/beneficiaries/models/beneficiary.model';
import { ResponseModel } from '../models/response.model';
import { ModalStatusType } from '../components/modal/modal.config';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Service that simulates the backend on the application.
 * Usually the controller calls for the services int the BL layer
 * which will call the methods from the repository (DAL)
 */

export class MockApiService {
  private localStorageKey = 'beneficiaryList';

  constructor(private storageService: StorageService, private utils: UtilsService) { }

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
    let id = list[list.length - 1].id!;
    model.id = ++id;

    let cuiOrCnp = this.utils.removeSpaces(model.type === BeneficiaryTypeEnum.LegalEntity ? model.CUI : model.CNP);
    let existingBeneficiary = list.find((beneficiary: BeneficiaryDisplayModel) => this.utils.removeSpaces(beneficiary.CNP) === cuiOrCnp || this.utils.removeSpaces(beneficiary.CUI) === cuiOrCnp);
    if (existingBeneficiary) {
      response = {
        message: 'The Beneficiary already exists!',
        type: ModalStatusType.Error
      }

      return response;
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
}
