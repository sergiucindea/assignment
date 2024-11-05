export interface Beneficiary {
    address?: string;
    phone?: string;
    IBANs?: string[];
}

export interface LegalEntity extends Beneficiary {
    Name: string;
    CUI: string;
    DateOfIncorporation?: Date;
}

export interface NormalPerson extends Beneficiary {
    LastName: string;
    FirstName: string;
    CNP: string;
    BirthDate?: Date;
}

export interface BeneficiaryDisplayModel {
    id?: number;
    address?: string;
    phone?: string;
    IBANs?: string[];
    type?: BeneficiaryTypeEnum;
    name?: string;
    CUI?: string;
    dateOfIncorporation?: Date;
    lastName?: string;
    firstName?: string;
    CNP?: string;
    birthDate?: Date;
}

export enum BeneficiaryTypeEnum {
    LegalEntity = 1,
    NormalPerson = 2
}
