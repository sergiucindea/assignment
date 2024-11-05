import { Injectable } from '@angular/core';
import { BeneficiaryDisplayModel } from '../models/beneficiary.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { MockApiService } from 'src/app/core/services/mock-api.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for managing beneficiaries.
 * This service would call the apis in a real world scenario,
 * here it calls the mock api.
 */

export class BeneficiaryService {
  constructor(private mockApiService: MockApiService) { }

  public getBeneficiaryList() {
    return this.mockApiService.getBeneficiaryList();
  }

  public updateBeneficiary(model: BeneficiaryDisplayModel) {
    return this.mockApiService.updateBeneficiary(model);
  }

  public getBeneficiaryById(id: number): BeneficiaryDisplayModel | undefined {
    return this.mockApiService.getBeneficiaryById(id);
  }

  public deleteBeneficiary(id: number): ResponseModel {
    return this.mockApiService.deleteBeneficiary(id);
  }

  public createBeneficiary(model: BeneficiaryDisplayModel): ResponseModel {
    return this.mockApiService.createBeneficiary(model);
  }
}
