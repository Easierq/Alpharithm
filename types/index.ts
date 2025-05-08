export interface Manager {
  id: string;
  fullName: string;
  companyName: string;
  companyDescription: string;
  createdAt: string;
}
export interface Identity {
  id: string;
  identity: string;
  identityType: string;
  verificationStatus: string;
  createdAt: string;
}

export interface IdentityArray {
  id: string;
  identities: Identity[];
  count: number;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  roles: string[];
  country: string;
  state: string;
  city: string;
  managerId: string;
  workMode: "remote" | "onsite" | "hybrid";
  whyJoinUs: string;
  createdAt: string;
}

type Group = {
  title: string;
  fields: Field[];
  sortOrder: number;
};

type Field = {
  id: string;
  label: string;
  type: string;
  options?: string;
  required: boolean;
  applicantFieldMapping: string;
  sortOrder: number;
};

export interface Template {
  id: string;
  title: string;
  managerId: string;
  formType: "application";
  groups: Group[];
  fields: Field[];
  createdAt: string;
}

export interface FormAct {
  title: string;
  formType: "application";
  groups: Group[];
  fields: Field[];
}

type ResponseItem = {
  fieldId: string;
  value: Record<string, any>;
  fileId?: string;
};

interface FormResponse {
  responses: ResponseItem[];
}

interface PublicForm {
  token: string;
  isActive: boolean;
}
