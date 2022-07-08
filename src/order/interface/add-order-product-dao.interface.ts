export interface IOrderProductDAO {
  orderId: number;
  productId: number;
  productOptionIds: number[];
  amount: number;
}
