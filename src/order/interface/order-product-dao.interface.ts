export interface IOrderProductDAO {
  id?: number;
  orderId: number;
  productId?: number;
  productOptionId?: number;
  amount: number;
}
