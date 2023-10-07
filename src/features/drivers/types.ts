import { IAddress } from "../addresses/types";
import { ICompany } from "../companies/types";

export interface IDriver{
    id?: number;
    uid?: string;
    name: string;
    phone: string;
    email?: string;
    driverLicenseNumber: string;
    driver_license_number? : string;
    identityCardNumber: string;
    identity_card_number? : string;
    driverLicenseNumberFile?: any;
    driver_license_numberFile?: any;
    identityCardNumberFile?: any;
    identity_card_numberFile?: any;
    contractFile?: any;
    contract_file? : any;
    profile?: any;
    gender: string;
    company?: ICompany;
    companyId?: number | null;
    address?: IAddress;
    reference?: string;
}