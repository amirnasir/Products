export type OrderItem = { productId: number; quantity: number; };
export type CreateOrderRequest = { name:string; address:string; email:string; items: OrderItem[]; };
export type CreateOrderResponse = {orderId: string ; total: number; message: string; };
