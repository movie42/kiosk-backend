import { Role } from '../enum';

export type User = {
  id: number;
  role: Role;
};

export interface IRequest {
  user?: User;
  ip: string;
  userAgent: string;
  host: string;
}
