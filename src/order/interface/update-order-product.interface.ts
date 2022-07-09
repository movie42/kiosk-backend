export interface IUpdateOrderProduct {
  id?: number;
  productId?: number;
  amount: number;
  productOptionIds: number[];
}
