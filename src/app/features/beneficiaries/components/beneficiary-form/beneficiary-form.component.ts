import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from '../../models/beneficiary.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.scss'
})
export class BeneficiaryFormComponent implements OnInit {

  protected BeneficiaryType = BeneficiaryTypeEnum;
  protected formGroup!: FormGroup;
  protected selectedBeneficiaryType: BeneficiaryTypeEnum = BeneficiaryTypeEnum.LegalEntity;
  protected displayBeneficiaryType: boolean = true;
  protected beneficiaryType: any[] = [
    {
      label: 'Legal Entity',
      value: 'LegalEntity'
    },
    {
      label: 'Normal Person',
      value: 'NormalPerson'
    }
  ];

  constructor(protected utils: UtilsService) {}

  ngOnInit(): void {
    this.setLeForm();
  }

  setBeneficiaryType(type?: number) {
    if (type) {
      this.formGroup.get('Type')?.patchValue(BeneficiaryTypeEnum[type]);
      this.displayBeneficiaryType = false;
    } else {
      this.formGroup.get('Type')?.patchValue(BeneficiaryTypeEnum[BeneficiaryTypeEnum.LegalEntity]);
    }
    this.onTypeChange();
  }

  onTypeChange() {
    let selectedType = this.formGroup.get('Type')!.value;
    this.selectedBeneficiaryType = selectedType === 'LegalEntity' ? BeneficiaryTypeEnum.LegalEntity : BeneficiaryTypeEnum.NormalPerson;
    if (selectedType === 'LegalEntity') {
      this.setLeForm();
    } else {
      this.setPersonForm();
    }
    this.formGroup.get('Type')!.patchValue(selectedType);
  }

  patchFormValues(rowData: BeneficiaryDisplayModel) {
    if (rowData.type === BeneficiaryTypeEnum.LegalEntity) {
      this.patchLegalEntityForm(rowData);
    } else {
      this.patchPersonForm(rowData);
    }
  }

  private patchLegalEntityForm(data: BeneficiaryDisplayModel) {
    this.formGroup.patchValue({
      Id: data.id,
      Type: 'LegalEntity',
      Name: data.name || '',
      CUI: data.CUI || '',
      IncorporationDate: data.dateOfIncorporation ? new Date(data.dateOfIncorporation) : null,
      Address: data.address || '',
      Phone: data.phone || '',
      IBANs: data.IBANs || []
    });
  }

  private patchPersonForm(data: BeneficiaryDisplayModel) {
    this.formGroup.patchValue({
      Id: data.id,
      Type: 'NormalPerson',
      Address: data.address || '',
      Phone: data.phone || '',
      IBANs: data.IBANs || [],
      FirstName: data.firstName || '',
      LastName: data.lastName || '',
      CNP: data.CNP || '',
      BirthDate: data.birthDate ? new Date(data.birthDate) : null
    })
  }

  private setLeForm() {
    this.formGroup = new FormGroup({
      'Id': new FormControl(''),
      'Type': new FormControl('LegalEntity'),
      'Name': new FormControl('', Validators.required),
      'CUI': new FormControl('', [Validators.required, this.utils.cuiValidator()]),
      'IncorporationDate': new FormControl('', this.utils.dateValidator()),
      'Address': new FormControl(''),
      'Phone': new FormControl('', this.utils.phoneValidator()),
      'IBANs': new FormControl('', [this.utils.ibanValidator()])
    });
  }

  private setPersonForm() {
    this.formGroup = new FormGroup({
      'Id': new FormControl(''),
      'Type': new FormControl('NormalPerson'),
      'Address': new FormControl(''),
      'Phone': new FormControl('', this.utils.phoneValidator()),
      'IBANs': new FormControl('', [this.utils.ibanValidator()]),
      'FirstName': new FormControl('', Validators.required),
      'LastName': new FormControl('', Validators.required),
      'CNP': new FormControl('', [Validators.required, this.utils.cnpValidator()]),
      'BirthDate': new FormControl('', this.utils.dateValidator()),
    });
  }

  get form() {
    return this.formGroup;
  }
}
