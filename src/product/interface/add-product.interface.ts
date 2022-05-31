import { IAddOptionCascade } from './add-option-cascade.interface';

export interface IAddProduct {
  storeId: number;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  options?: IAddOptionCascade[];
}
