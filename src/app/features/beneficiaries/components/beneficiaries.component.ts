import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { AddBeneficiaryModalComponent } from './add-beneficiary-modal/add-beneficiary-modal.component';
import { CtxBarConfig } from '../../context-bar/models/ctx-bar-config.model';
import { ResponseModel } from 'src/app/core/models/response.model';
import { BeneficiaryTableColumn } from '../models/beneficiary-table-column.model';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.scss'
})
export class BeneficiariesComponent implements OnInit {
  @ViewChild('addModal') addModalComponent!: ModalComponent;
  @ViewChild('editModal') editModalComponent!: ModalComponent;
  @ViewChild('deleteModal') deleteModalComponent!: ModalComponent;

  @ViewChild(AddBeneficiaryModalComponent, { static: false}) addModalCompRef!: AddBeneficiaryModalComponent;
  @ViewChild(EditBeneficiaryModalComponent, { static: false}) editModalCompRef!: EditBeneficiaryModalComponent;

  private cachedList: BeneficiaryDisplayModel[] = [];
  protected beneficiaryList: BeneficiaryDisplayModel[] = [] ;
  protected selectedRow: BeneficiaryDisplayModel | null = null;
  protected selectedColumns: BeneficiaryTableColumn[] = [];
  protected displayAllRows: boolean = true;
  protected selectedView!: string;
  protected views: string[] = beneficiaryViews;
  protected btnList: CtxBarBtnConfig[] = [];
  protected btnConfig: CtxBarConfig = {};
  protected filters: { [key: string]: any } = {};
  protected isTableLoading: boolean = false;

  constructor(private beneficiaryService: BeneficiaryService, protected utils: UtilsService,
    private filterService: FilterService, private statusModalService: StatusModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBeneficiaryList();
    this.setContextBarButtons();
  }

  onFilter(event: any) {
    this.selectedRow = null;
    this.cdr.detectChanges();
    this.refreshCtxBar();
  }

  //#region Buttons

  private setContextBarButtons() {
    this.btnConfig = {
      containerClass: 'd-flex gap-2'
    };

    let addBtn: CtxBarBtnConfig = {
      label: '<i class="pi pi-plus me-2"></i> Add Beneficiary',
      key: 'Add',
      class: 'rounded-1 bg-dark-blue',
      disabled: false
    }

    let editBtn: CtxBarBtnConfig = {
      label: '<i class="pi pi-user-edit me-2"></i> Edit',
      key: 'Edit',
      class: 'rounded-1 bg-light-blue',
      disabled: true
    }

    let deleteBtn: CtxBarBtnConfig = {
      label: '<i class="pi pi-trash me-2"></i> Delete',
      key: 'Delete',
      class: 'rounded-1 bg-danger',
      disabled: true
    }

    this.btnList = [ addBtn, editBtn, deleteBtn ];
  }

  private refreshCtxBar() {
    this.btnList[1].disabled = this.selectedRow === null;
    this.btnList[2].disabled = this.selectedRow === null;
  }

  protected onBtnClick(event: { btn: any, key: string }) {
    switch (event.key) {
      case 'Add':
        this.addClicked();
        break;
      case 'Edit':
        this.editClicked();
        break;
      case 'Delete':
        this.deleteClicked();
        break;
      default:
        break;
    }
  }

  private addClicked() {
    this.addModalCompRef.init();
    this.addModalComponent.open();
  }

  private editClicked() {
    this.editModalCompRef.init(this.selectedRow!);
    this.editModalComponent.open();
  }

  private deleteClicked() {
    this.deleteModalComponent.open();
  }

  //#endregion

  protected onRowSelect(event: any) {
    this.selectedRow = event.data;
    this.refreshCtxBar();
    this.cdr.detectChanges();
  }

  protected onRowUnselect(event: any) {
    this.selectedRow = null;
    this.refreshCtxBar();
  }

  protected onViewChange() {
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

  protected parseColumn(field: string, beneficiary: BeneficiaryDisplayModel) {
    let key = field as keyof BeneficiaryDisplayModel;
    let value = beneficiary[key];
    
    if (this.isDateField(key))
      return this.utils.parseDate(value as Date);

    return beneficiary[key];
  }

  protected isDateField(field: keyof BeneficiaryDisplayModel): boolean {
    return field === 'dateOfIncorporation' || field === 'birthDate';
  }

  protected refreshTable() {
    this.isTableLoading = true;
    
    setTimeout(() => {
      this.getBeneficiaryList();
      this.onViewChange();
      this.selectedRow = null;
      this.refreshCtxBar();
      this.isTableLoading = false;
      this.cdr.detectChanges();
    }, 300);
  }

  private getBeneficiaryList() {
    this.beneficiaryList = this.beneficiaryService.getBeneficiaryList();
    this.cachedList = this.beneficiaryService.getBeneficiaryList();
  }

  private deleteBeneficiary() {
    try {
      let response: ResponseModel = this.beneficiaryService.deleteBeneficiary(this.selectedRow?.id!);
    if (response.type === ModalStatusType.Success) {
      this.statusModalService.openStatusModal(response.message, response.type);
      this.deleteModalComponent.close();
      this.refreshTable();
    } else {
      this.statusModalService.openStatusModal(response.message, response.type);
    }
    } catch (error) {
      this.statusModalService.openStatusModal('An error occurred while creating the beneficiary.', ModalStatusType.Error);
    }
    
  }

  //#region modal configs

  addModalConfig: ModalConfig = {
    title: '<i class="pi pi-plus me-2"></i> Add Beneficiary',
    headerClass: 'bg-green text-light',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-green',
    submitButtonLabel: 'Save',
    submitButtonClass: 'bg-dark-blue'
  }

  editModalConfig: ModalConfig = {
    title: '<i class="pi pi-user-edit me-2"></i> Edit Beneficiary',
    headerClass: 'bg-green text-light',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-green',
    submitButtonLabel: 'Save',
    submitButtonClass: 'bg-dark-blue'
  }

  deleteModalConfig: ModalConfig = {
    title: '<i class="pi pi-trash me-2"></i> Delete Beneficiary',
    headerClass: 'bg-danger text-light',
    bodyClass: 'p-5 text-center',
    options: {
      size: 'l'
    },
    closeButtonTextOnly: true,
    closeButtonClass: 'text-red',
    closeButtonLabel: 'No',
    submitButtonLabel: 'Yes',
    submitButtonClass: 'bg-danger',
    onSubmit: this.deleteBeneficiary.bind(this),
  }

  //#endregion
}
