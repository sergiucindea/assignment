import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { BeneficiaryFormComponent } from '../beneficiary-form/beneficiary-form.component';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../../models/beneficiary.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { BeneficiaryService } from '../../services/beneficiary.service';
import { StatusModalService } from 'src/app/core/components/modal/status-modal/status-modal.service';
import { ModalConfig, ModalStatusType } from 'src/app/core/components/modal/modal.config';
import { ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-beneficiary-modal',
  templateUrl: './edit-beneficiary-modal.component.html',
  styleUrl: './edit-beneficiary-modal.component.scss'
})
export class EditBeneficiaryModalComponent implements OnInit {
  @Input() modalComp!: ModalComponent;
  @ViewChild(BeneficiaryFormComponent, {static: false}) formCompRef!: BeneficiaryFormComponent;
  @Output() refreshTable: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('closeModal') closeModalComponent!: ModalComponent;

  constructor(private beneficiaryService: BeneficiaryService, private statusModalService: StatusModalService) {}

  ngOnInit(): void {
    this.setButtons();
  }

  init(rowData: BeneficiaryDisplayModel) {
    this.formCompRef.form.reset();
    this.formCompRef.setBeneficiaryType(rowData.type!);
    this.patchFormValues(rowData);
  }
 
  private setButtons() {
    this.modalComp.modalConfig.onSubmit = this.submitClicked.bind(this);
    this.modalComp.modalConfig.onClose = this.closeClicked.bind(this);
  }
  
  private submitClicked() {
    this.formCompRef.form.markAllAsTouched();
    
    if (this.formCompRef.form.valid) {
      try {
        let response: ResponseModel = this.beneficiaryService.updateBeneficiary(this.setBeneficiaryDisplayModel(this.formCompRef.form.value));
        if (response.type === ModalStatusType.Success) {
          this.refreshTable.emit(true);
          this.statusModalService.openStatusModal(response.message, response.type);
          this.modalComp.close();
        } else {
          this.statusModalService.openStatusModal(response.message, response.type);
        }
      } catch (error) {
        this.statusModalService.openStatusModal('An error occurred while editing the beneficiary.', ModalStatusType.Error);
      }
    }
  }

  private closeClicked() {
    if (this.formCompRef.form.dirty) {
      this.closeModalComponent.open();
    } else {
      this.modalComp.close();
    }
  }

  private confirmCloseModal() {
    this.closeModalComponent.close();
    this.modalComp.close();
  }

  private setBeneficiaryDisplayModel(value: any): BeneficiaryDisplayModel {
    return {
      id: value.Id,
      type: value.Type === 'LegalEntity' ? BeneficiaryTypeEnum.LegalEntity : BeneficiaryTypeEnum.NormalPerson,
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
    this.formCompRef.patchFormValues(rowData);
  }

  closeModalConfig: ModalConfig = {
    title: '<i class="pi pi-exclamation-triangle me-2"></i> Warning',
    headerClass: 'bg-warning text-light',
    bodyClass: 'p-5 text-center',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-warn',
    closeButtonLabel: 'No',
    submitButtonLabel: 'Yes',
    submitButtonClass: 'bg-warn',
    onSubmit: this.confirmCloseModal.bind(this)
  }
}
