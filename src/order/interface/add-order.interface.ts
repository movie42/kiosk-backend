import { OrderType } from '../enum/order-type';
import { IOrderProduct } from './add-order-product.interface';

export interface IAddOrder {
  storeId: number;
  imp_uid: string;
  merchant_uid: string;
  products: IOrderProduct[];
  type: OrderType;
}
