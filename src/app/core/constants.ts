import { BeneficiaryDisplayModel, BeneficiaryTypeEnum } from "../features/beneficiaries/models/beneficiary.model";

export const beneficiaryList: BeneficiaryDisplayModel[] = [
    {
        id: 1,
        address: '32 Sunny Ave, Bucharest',
        phone: '021-555-0123',
        IBANs: ['DE22500105172938386461'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Optimus Technologies',
        CUI: '29799772',
        dateOfIncorporation: new Date('2000-02-20'),
    },
    {
        id: 2,
        address: '45 Rainy St, Cluj-Napoca',
        phone: '0264-555-6789',
        IBANs: ['RO17RZBR3444631451528937'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Popescu',
        firstName: 'Andrei',
        CNP: '1870105416178',
        birthDate: new Date('1985-06-01')
    },
    {
        id: 3,
        address: '78 Foggy Rd, Timisoara',
        phone: '0256-555-2233',
        IBANs: ['FR5712739000405441648861F44', 'FR1512739000405648925797F57'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Tech Wave',
        CUI: '12459849',
        dateOfIncorporation: new Date('2008-09-15'),
    },
    {
        id: 4,
        address: '12 Winter Blvd, Iasi',
        phone: '0232-555-3344',
        IBANs: ['RO54PORL8281494545236253'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Ionescu',
        firstName: 'Maria',
        CNP: '2951017128327',
        birthDate: new Date('1990-03-22'),
    },
    {
        id: 5,
        address: '90 Spring St, Brasov',
        phone: '0268-555-4455',
        IBANs: ['RO04RZBR1329312869941389'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Green Solutions',
        CUI: '18933150',
        dateOfIncorporation: new Date('2012-11-12'),
    },
    {
        id: 6,
        address: '53 Mountain Ave, Sibiu',
        phone: '0269-555-5566',
        IBANs: ['RO51RZBR9729467343772363'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Vasilescu',
        firstName: 'Elena',
        CNP: '2951028098444',
        birthDate: new Date('1985-07-18'),
    },
    {
        id: 7,
        address: '27 River Rd, Constanta',
        phone: '0241-555-6677',
        IBANs: ['RO32RZBR7766225388964392', 'RO96PORL2381856739953428'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Fast Logistics',
        CUI: '32606120',
        dateOfIncorporation: new Date('2015-05-05'),
    },
    {
        id: 8,
        address: '34 Ocean St, Galati',
        phone: '0236-555-7788',
        IBANs: ['GB06BARC20039584543823'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Georgescu',
        firstName: 'Cristina',
        CNP: '2960419240214',
        birthDate: new Date('1989-08-23'),
    },
    {
        id: 9,
        address: '81 Desert Ave, Ploiesti',
        phone: '0244-555-8899',
        IBANs: ['GB17BARC20037858851642'],
        type: BeneficiaryTypeEnum.LegalEntity,
        name: 'Creative Minds',
        CUI: '92345672',
        dateOfIncorporation: new Date('2020-01-10'),
    },
    {
        id: 10,
        address: '65 City Square, Craiova',
        phone: '0251-555-9900',
        IBANs: ['GB15BARC20037869338542'],
        type: BeneficiaryTypeEnum.NormalPerson,
        lastName: 'Dumitrescu',
        firstName: 'Alex',
        CNP: '1960419243779',
        birthDate: new Date('1999-09-04'),
    }
];