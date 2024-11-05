import { BeneficiaryTableColumn } from "../models/beneficiary-table-column.model";


export const legalEntityCols: BeneficiaryTableColumn[] = [
    { field: 'name', header: 'Name', width: '10%', filter: true },
    { field: 'CUI', header: 'CUI', width: '10%', filter: true },
    { field: 'address', header: 'Address', width: '10%', filter: true },
    { field: 'phone', header: 'Phone', width: '10%', filter: true },
    { field: 'dateOfIncorporation', header: 'Date of Incorporation', width: '10%', filter: true},
    { field: 'IBANs', header: 'IBANs', width: '5%', filter: true }
];

export const normalPersonCols: BeneficiaryTableColumn[] = [
    { field: 'lastName', header: 'Last Name', width: '5%', filter: true },
    { field: 'firstName', header: 'First Name', width: '5%', filter: true },
    { field: 'CNP', header: 'CNP', width: '5%', filter: true },
    { field: 'address', header: 'Address', width: '5%', filter: true },
    { field: 'phone', header: 'Phone', width: '5%', filter: true },
    { field: 'birthDate', header: 'Birth Date', width: '5%', filter: true },
    { field: 'IBANs', header: 'IBANs', width: '5%', filter: true }
];

export const beneficiaryViews: string[] = [
    'All',
    'Legal Entity',
    'Normal Person'
];

export enum BeneficiaryViewEnum {
    All = 'All',
    LegalEntity = 'Legal Entity',
    NormalPerson = 'Normal Person'
}