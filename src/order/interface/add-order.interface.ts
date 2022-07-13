import { OrderType } from '../enum/order-type';
import { IAddOrderProduct } from './add-order-product.interface';

export interface IAddOrder {
  storeId: number;
  imp_uid: string;
  merchant_uid: string;
  products: IAddOrderProduct[];
  type: OrderType;
}
