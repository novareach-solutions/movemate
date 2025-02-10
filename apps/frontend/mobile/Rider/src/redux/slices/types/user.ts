import {UserRoleEnum} from './enums';

export interface User {
  id: number;
  phoneNumber: string;
  role: UserRoleEnum;
  firstName: string;
  lastName?: string;
  email: string;
  street?: string;
  suburb?: string;
  state?: string;
  postalCode?: number;
}
