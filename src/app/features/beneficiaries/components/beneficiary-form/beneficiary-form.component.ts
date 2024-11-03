import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiaryTypeEnum } from '../../models/beneficiary.model';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrl: './beneficiary-form.component.scss'
})
export class BeneficiaryFormComponent implements OnInit {

  protected BeneficiaryType = BeneficiaryTypeEnum;
  protected formGroup!: FormGroup;
  protected selectedBeneficiaryType: BeneficiaryTypeEnum = BeneficiaryTypeEnum.LegalEntity;
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

  private leForm: FormGroup = new FormGroup({
    'Type': new FormControl('LegalEntity'),
    'Name': new FormControl('', Validators.required),
    'CUI': new FormControl('', Validators.required),
    'IncorporationDate': new FormControl(''),
    'Address': new FormControl(''),
    'Phone': new FormControl(''),
    'IBANs': new FormControl('')
  });
  
  private personForm: FormGroup = new FormGroup({
    'Type': new FormControl('NormalPerson'),
    'Address': new FormControl(''),
    'Phone': new FormControl(''),
    'IBANs': new FormControl(''),
    'FirstName': new FormControl('', Validators.required),
    'LastName': new FormControl('', Validators.required),
    'CNP': new FormControl('', Validators.required),
    'BirthDate': new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      'Type': new FormControl('LegalEntity'),
      'Name': new FormControl('', Validators.required),
      'CUI': new FormControl(''),
      'IncorporationDate': new FormControl(''),
      'Address': new FormControl(''),
      'Phone': new FormControl(''),
      'IBANs': new FormControl(''),
      'FirstName': new FormControl(''),
      'LastName': new FormControl(''),
      'BirthDate': new FormControl(''),
    });
  }

  onTypeChange() {
    let selectedType = this.formGroup.get('Type')!.value;
    this.selectedBeneficiaryType = selectedType === 'LegalEntity' ? BeneficiaryTypeEnum.LegalEntity : BeneficiaryTypeEnum.NormalPerson;
    this.formGroup = selectedType === 'LegalEntity' ? this.leForm : this.personForm;
    this.formGroup.get('Type')!.patchValue(selectedType);
    console.log(this.formGroup.value);
  }

  get form() {
    return this.formGroup;
  }
}
