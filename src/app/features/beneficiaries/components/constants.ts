export const legalEntityCols: any[] = [
    { field: 'name', header: 'Name', width: '10%' },
    { field: 'CUI', header: 'CUI', width: '10%' },
    { field: 'address', header: 'Address', width: '10%' },
    { field: 'phone', header: 'Phone', width: '10%' },
    { field: 'dateOfIncorporation', header: 'Date of Incorporation', width: '10%'},
    { field: 'IBANs', header: 'IBANs', width: '5%' }
];

export const normalPersonCols: any[] = [
    { field: 'lastName', header: 'Last Name', width: '5%' },
    { field: 'firstName', header: 'First Name', width: '5%' },
    { field: 'CNP', header: 'CNP', width: '5%' },
    { field: 'address', header: 'Address', width: '5%' },
    { field: 'phone', header: 'Phone', width: '5%' },
    { field: 'birthDate', header: 'Birth Date', width: '5%' },
    { field: 'IBANs', header: 'IBANs', width: '5%' }
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