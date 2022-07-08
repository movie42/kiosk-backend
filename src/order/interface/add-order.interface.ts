import { OrderType } from '../enum/order-type';
import { IOrderProduct } from './add-order-product.interface';

export interface IAddOrder {
  storeId: number;
  products: IOrderProduct[];
  type: OrderType;
}
