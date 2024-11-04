import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../../models/beneficiary.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { StatusModalService } from 'src/app/core/components/modal/status-modal/status-modal.service';

@Component({
  selector: 'app-edit-beneficiary-modal',
  templateUrl: './edit-beneficiary-modal.component.html',
  styleUrl: './edit-beneficiary-modal.component.scss'
})
export class EditBeneficiaryModalComponent implements OnInit {
  @Input() modalComp!: ModalComponent;
  @ViewChild(BeneficiaryFormComponent, {static: false}) formCompRef!: BeneficiaryFormComponent;
  @Output() refreshTable: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private beneficiaryService: BeneficiaryService, private statusModalService: StatusModalService) {}

  ngOnInit(): void {
    this.formCompRef.form.reset();
    this.setButtons();
  }

  init(rowData: BeneficiaryDisplayModel) {
    this.patchFormValues(rowData);
  }

  private setButtons() {
    this.modalComp.modalConfig.onSubmit = this.submitClicked.bind(this);
  }
  
  private submitClicked() {
    this.formCompRef.form.markAllAsTouched();

    if (this.formCompRef.form.valid) {
      let response: ResponseModel = this.beneficiaryService.createBeneficiary(this.setBeneficiaryDisplayModel(this.formCompRef.form.value));
      this.refreshTable.emit(true);
      this.statusModalService.openStatusModal(response.message, response.type);
      this.modalComp.close();
    }
  }

  private setBeneficiaryDisplayModel(value: any): BeneficiaryDisplayModel {
    return {
      type: value.type === 'LegalEntity' ? BeneficiaryTypeEnum.LegalEntity : BeneficiaryTypeEnum.NormalPerson,
      name: value.Name,
      CNP: value.CNP,
      CUI: value.CUI,
      firstName: value.FirstName,
      lastName: value.LastName,
      address: value.Address,
      phone: value.Phone,
      IBANs: value.IBANs,
      dateOfIncorporation: value.IncorporationDate,
      birthDate: value.BirthDate
    }
  }

  private patchFormValues(rowData: BeneficiaryDisplayModel) {

  }
}
