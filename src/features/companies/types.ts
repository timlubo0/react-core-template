export interface ICompany {
  id?: number;
  uid?: string;
  name: string;
  nif?: string;
  idNat?: string;
  rccm: string;
  companyCategoryId: string;
  category?: ICompanyCategory;
}

export interface ICompanyCategory {
  id?: string;
  uid?: string;
  name: string;
  description?: string;
}
