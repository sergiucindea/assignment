import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from "../features/beneficiaries/models/beneficiary.model";

export const beneficiaryList: BeneficiaryDisplayModel[] = [
    {
        id: 1,
        address: '123 Main St, Springfield',
        phone: '123-456-7890',
        IBANs: ['RO49AAAA1B310075938400', 'RO49AAAA1B310075938401'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'ABC Corp',
        CUI: '12345678',
        dateOfIncorporation: new Date('2001-01-15'),
    },
    {
        id: 2,
        address: '456 Elm St, Springfield',
        phone: '234-567-8901',
        IBANs: ['RO49AAAA1B310075938402'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Doe',
        firstName: 'John',
        CNP: '1234567890123',
        birthDate: new Date('1985-08-15')
    },
    {
        id: 3,
        address: '789 Oak St, Springfield',
        phone: '345-678-9012',
        IBANs: ['RO49AAAA1B310075938403', 'RO49AAAA1B310075938404'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'XYZ Ltd',
        CUI: '87654321',
        dateOfIncorporation: new Date('2005-09-10'),
    },
    {
        id: 4,
        address: '101 Maple St, Springfield',
        phone: '456-789-0123',
        IBANs: ['RO49AAAA1B310075938405'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Smith',
        firstName: 'Jane',
        CNP: '9876543210987',
        birthDate: new Date('1985-08-15'),
    },
    {
        id: 5,
        address: '202 Birch St, Springfield',
        phone: '567-890-1234',
        IBANs: ['RO49AAAA1B310075938406'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Tech Innovations',
        CUI: '11223344',
        dateOfIncorporation: new Date('2010-11-30'),
    },
    {
        id: 6,
        address: '303 Pine St, Springfield',
        phone: '678-901-2345',
        IBANs: ['RO49AAAA1B310075938407'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Johnson',
        firstName: 'Emily',
        CNP: '1231231231234',
        birthDate: new Date('1995-03-12'),
    },
    {
        id: 7,
        address: '404 Cedar St, Springfield',
        phone: '789-012-3456',
        IBANs: ['RO49AAAA1B310075938408', 'RO49AAAA1B310075938409'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Global Enterprises',
        CUI: '44332211',
        dateOfIncorporation: new Date('2000-07-22'),
    },
    {
        id: 8,
        address: '505 Spruce St, Springfield',
        phone: '890-123-4567',
        IBANs: ['RO49AAAA1B310075938410'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Brown',
        firstName: 'Chris',
        CNP: '7897897897890',
        birthDate: new Date('1992-11-25'),
    },
    {
        id: 9,
        address: '606 Fir St, Springfield',
        phone: '901-234-5678',
        IBANs: ['RO49AAAA1B310075938411'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Creative Solutions',
        CUI: '55443322',
        dateOfIncorporation: new Date('2015-02-18'),
    },
    {
        id: 10,
        address: '707 Walnut St, Springfield',
        phone: '012-345-6789',
        IBANs: ['RO49AAAA1B310075938412'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Wilson',
        firstName: 'Anna',
        CNP: '3213213213210',
        birthDate: new Date('1998-09-04'),
    }
];
