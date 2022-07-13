import { Role } from '../enum';

export type User = {
  id: number;
  role: Role;
  exp: number;
  refresh?: boolean;
};

export interface IRequest {
  user?: User;
  ip: string;
  userAgent: string;
  host: string;
}
