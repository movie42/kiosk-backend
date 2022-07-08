export interface IOrderProductDAO {
  id?: number;
  orderId: number;
  productId: number;
  productOptionIds: number[];
  amount: number;
}
