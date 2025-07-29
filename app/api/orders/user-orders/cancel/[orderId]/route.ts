import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";
import { withAuth } from "@/lib/middleware/auth";

// PATCH /api/orders/user-orders/cancel/[orderId] - Cancel an order
export const PATCH = withAuth(async (req: Request & { user?: any }, context?: any) => {
  try {
    await dbConnect();

    const { params } = context;
    const { orderId } = params;
    const user = req.user;

    // Find the order
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only cancel your own orders" },
        { status: 403 }
      );
    }

    // Check if the order can be cancelled (only pending orders can be cancelled)
    if (order.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot cancel order with status: ${order.status}. Only pending orders can be cancelled.`,
        },
        { status: 400 }
      );
    }

    // Update the order status to cancelled
    order.status = "cancelled";
    order.updatedAt = new Date();
    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order cancelled successfully",
      order: {
        id: order._id,
        status: order.status,
        updatedAt: order.updatedAt,
      },
    });
  } catch (error) {
    console.error("Order cancellation error:", error);
    return NextResponse.json({ success: false, error: "Failed to cancel order" }, { status: 500 });
  }
});
