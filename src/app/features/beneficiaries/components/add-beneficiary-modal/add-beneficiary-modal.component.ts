import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../../models/beneficiary.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { StatusModalService } from 'src/app/core/components/modal/status-modal/status-modal.service';
import { ModalStatusType } from 'src/app/core/components/modal/modal.config';

@Component({
  selector: 'app-add-beneficiary-modal',
  templateUrl: './add-beneficiary-modal.component.html',
  styleUrl: './add-beneficiary-modal.component.scss'
})
export class AddBeneficiaryModalComponent implements OnInit {

  @Input() modalComp!: ModalComponent;
  @ViewChild(BeneficiaryFormComponent, {static: false}) formCompRef!: BeneficiaryFormComponent;
  @Output() refreshTable: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private beneficiaryService: BeneficiaryService, private statusModalService: StatusModalService) {}

  ngOnInit(): void {
    this.setButtons();
  }

  private setButtons() {
    this.modalComp.modalConfig.onSubmit = this.submitClicked.bind(this);
  }

  private submitClicked() {
    this.formCompRef.form.markAllAsTouched();
    console.log(this.formCompRef.form.value);
    if (this.formCompRef.form.valid) {
      this.beneficiaryService.createBeneficiary(this.setBeneficiaryDisplayModel(this.formCompRef.form.value));
      this.refreshTable.emit(true);
      this.statusModalService.openStatusModal('Beneficiary added successfully!', ModalStatusType.Success);
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

  private addLegalEntity() {

  }

  private addNormalPerson() {

  }
}
