import { products } from "@/app/data/products";
import type { CreateOrderRequest } from "@/app/types/Order";
import type { SaveOrder } from "@/app/types/Order";
import { saveOrder } from "@/app/lib/orderRepository";
import {getOrders} from "@/app/lib/orderRepository"


export async function POST(request: Request) {
  let order: CreateOrderRequest;

  try {
    order = await request.json();
  } catch {
    return Response.json(
      { message: "Invalid JSON" },
      { status: 400 }
    );
  }

  if (
    !order ||
    typeof order.name !== "string" ||
    !order.name.trim() ||
    typeof order.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) ||
    typeof order.address !== "string" ||
    !order.address.trim() ||
    !Array.isArray(order.items) ||
    order.items.length === 0
  ) {
    return Response.json(
      { message: "Invalid order information" },
      { status: 400 }
    );
  }

  let total = 0;

  for (const item of order.items) {
    if (
      !item ||
      !Number.isSafeInteger(item.productId) ||
      !Number.isSafeInteger(item.quantity) ||
      item.quantity <= 0
    ) {
      return Response.json(
        { message: "Invalid order item" },
        { status: 400 }
      );
    }

    const product = products.find(
      (p) => p.id === item.productId
    );

    if (!product) {
      return Response.json(
        { message: `Product ${item.productId} not found` },
        { status: 400 }
      );
    }

    total += product.price * item.quantity;
  }

  const orderId = crypto.randomUUID();

  const savedOrder: SaveOrder = {
    orderId,
    name: order.name.trim(),
    email: order.email.trim(),
    address: order.address.trim(),
    items: order.items,
    total: Number(total.toFixed(2)),
    createAt: new Date().toISOString(),
  };

  saveOrder(savedOrder);

  return Response.json({
    orderId: savedOrder.orderId,
    total: savedOrder.total,
    message: "Demo order saved in memory",
  },
    { status: 201 }
  );
}

export async function GET(){
  return Response.json(getOrders());
}



