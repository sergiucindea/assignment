import { Component, OnInit, ViewChild } from '@angular/core';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../models/beneficiary.model';
import { BeneficiaryService } from '../services/beneficiary.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { StatusModalService } from 'src/app/core/components/modal/status-modal/status-modal.service';
import { ModalConfig, ModalStatusType } from 'src/app/core/components/modal/modal.config';
import { BeneficiaryViewEnum, beneficiaryViews, legalEntityCols, normalPersonCols } from './constants';
import { FilterService } from 'src/app/core/services/filter.service';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { CtxBarBtnConfig } from '../../context-bar/models/ctx-bar-btn.config.model';
import { EditBeneficiaryModalComponent } from './edit-beneficiary-modal/edit-beneficiary-modal.component';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss'
})
export class BeneficiariesComponent implements OnInit {
  @ViewChild('addModal') addModalComponent!: ModalComponent;
  @ViewChild('editModal') editModalComponent!: ModalComponent;
  @ViewChild('deleteModal') deleteModalComponent!: ModalComponent;

  @ViewChild(EditBeneficiaryModalComponent, { static: false}) editModalCompRef!: EditBeneficiaryModalComponent;

  private cachedList: BeneficiaryDisplayModel[] = [];
  protected beneficiaryList: BeneficiaryDisplayModel[] = [] ;
  protected selectedRow: BeneficiaryDisplayModel | undefined;
  protected selectedColumns: any[] = [];
  protected displayAllRows: boolean = true;
  protected selectedView!: string;
  protected views: string[] = beneficiaryViews;
  protected btnList: any[] = [];
  protected btnConfig: any = {};

  constructor(private beneficiaryService: BeneficiaryService, protected utils: UtilsService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.getBeneficiaryList();
    this.setContextBarButtons();
  }

  private setContextBarButtons() {
    let addBtn: CtxBarBtnConfig = {
      label: 'Add Beneficiary',
      key: 'Add',
      disabled: false
    }

    let editBtn: CtxBarBtnConfig = {
      label: 'Edit',
      key: 'edit',
      disabled: true
    }

    let deleteBtn: CtxBarBtnConfig = {
      label: 'Delete',
      key: 'delete',
      disabled: true
    }

    this.btnList = [ addBtn, editBtn, deleteBtn ];
  }

  onRowSelect(event: any) {
    this.selectedRow = event;
    // refresh ctx bar
  }

  onViewChange() {
    switch (this.selectedView) {
      case BeneficiaryViewEnum.All: {
        this.displayAllRows = true;
        this.beneficiaryList = this.cachedList;
        break;
      }
      case BeneficiaryViewEnum.LegalEntity: {
        this.displayAllRows = false;
        this.selectedColumns = legalEntityCols;
        this.beneficiaryList = this.filterService.filterByField(this.cachedList, 'type', BeneficiaryTypeEnum.LegalEntity);
        break;
      }
      case BeneficiaryViewEnum.NormalPerson: {
        this.displayAllRows = false;
        this.selectedColumns = normalPersonCols;
        this.beneficiaryList = this.filterService.filterByField(this.cachedList, 'type', BeneficiaryTypeEnum.NormalPerson);
        break;
      }
      default:
        break;
    }
  }

  onBtnClick(event: { btn: any, key: string }) {
    switch (event.key) {
      case 'add':
        this.addClicked();
        break;
      case 'edit':
        this.editClicked();
        break;
      case 'delete':
        this.deleteClicked();
        break;
      default:
        break;
    }
  }

  private addClicked() {
    this.addModalComponent.open();
  }

  private editClicked() {
    this.editModalCompRef.init(this.selectedRow!);
    this.editModalComponent.open();
  }

  private deleteClicked() {
    this.deleteModalComponent.open();
  }

  parseColumn(field: keyof BeneficiaryDisplayModel, beneficiary: BeneficiaryDisplayModel) {
    let value = beneficiary[field];
    
    if (this.isDateField(field))
      return this.utils.parseDate(value as Date);

    return beneficiary[field];
  }

  isDateField(field: keyof BeneficiaryDisplayModel): boolean {
    return field === 'dateOfIncorporation' || field === 'birthDate';
  }

  refreshTable() {
    this.getBeneficiaryList();
  }

  private getBeneficiaryList() {
    this.beneficiaryList = this.beneficiaryService.getBeneficiaryList();
    this.cachedList = this.beneficiaryService.getBeneficiaryList();
    console.log(this.beneficiaryList);
  }

  //#region modal configs

  addModalConfig: ModalConfig = {
    title: 'Add Beneficiary',
    headerClass: 'bg-green text-light',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-green',
    submitButtonLabel: 'Save',
    submitButtonColor: 'info',
  }

  editModalConfig: ModalConfig = {
    title: 'Edit Beneficiary',
    headerClass: 'bg-green text-light',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-green',
    submitButtonLabel: 'Save',
    submitButtonColor: 'info',
  }

  deleteModalConfig: ModalConfig = {
    title: 'Delete Beneficiary',
    headerClass: 'bg-danger text-light',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-danger',
    submitButtonLabel: 'Yes',
    submitButtonColor: 'danger',
    onSubmit: this.deleteBeneficiary.bind(this),
  }

  private deleteBeneficiary() {
    this.beneficiaryService.deleteBeneficiary(this.selectedRow?.id!);
  }

  //#endregion
}
