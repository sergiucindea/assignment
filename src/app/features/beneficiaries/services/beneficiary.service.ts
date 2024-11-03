import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Beneficiary, BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../models/beneficiary.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { ModalStatusType } from 'src/app/core/components/modal/modal.config';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private storageService: StorageService) { }

  public getBeneficiaryList() {
    return this.storageService.retrieveInfoFromStorage('beneficiaryList');
  }

  public updateBeneficiary(model: Beneficiary) {
    // retrieve list
    // find item by id
    // update
    // save
  }

  public getBeneficiaryById(id: number) {

  }

  public deleteBeneficiary(id: number) {

  }

  public createBeneficiary(model: BeneficiaryDisplayModel) {
    let response: ResponseModel;

    let list = this.storageService.retrieveInfoFromStorage('beneficiaryList');
    model.id = ++list[list.length - 1].id;

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
    this.storageService.saveToLocalStorage('beneficiaryList', list);
    
    response = {
      message: 'The Beneficiary was added successfully!',
      type: ModalStatusType.Success
    }
    return response;
  }
}
