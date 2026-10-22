import type {SaveOrder} from "@/app/types/Order";

const orders: SaveOrder[] = [];

export function saveOrder(order: SaveOrder): void {
  orders.push(order);
}

export function getOrders(): SaveOrder[] {
  return [...orders];
}  



// private static readonly List<SavedOrder> Orders = new();

// public void SaveOrder(SavedOrder order)
// {
//     Orders.Add(order);
// }

// public List<SavedOrder> GetOrders()
// {
//     return Orders.ToList();
// }