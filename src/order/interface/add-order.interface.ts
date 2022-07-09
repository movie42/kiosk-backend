import { OrderType } from '../enum/order-type';
import { IAddOrderProduct } from './add-order-product.interface';

export interface IAddOrder {
  storeId: number;
  products: IAddOrderProduct[];
  type: OrderType;
}
