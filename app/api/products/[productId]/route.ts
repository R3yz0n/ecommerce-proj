import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import { withAuth } from "@/lib/middleware/auth";

/**
 * DELETE /api/products/{productId}
 *
 * Deletes a product by its ID.
 *
 * Authentication:
 *   Requires a valid Bearer token in the Authorization header.
 *   The user must be the owner of the product.
 *
 * URL Parameters:
 *   - productId: The ID of the product to delete.
 *
 * Response (200 - Success):
 * {
 *   "success": true,
 *   "message": "Product deleted successfully"
 * }
 *
 * Response (400 - Bad Request):
 * {
 *   "error": "Product ID is required"
 * }
 *
 * Response (401 - Unauthorized):
 * {
 *   "error": "Access denied. No token provided."
 * }
 *
 * Response (404 - Not Found):
 * {
 *   "error": "Product not found or you do not have permission to delete it"
 * }
 *
 * Response (500 - Server Error):
 * {
 *   "error": "Failed to delete product"
 * }
 */

export const DELETE = withAuth(async (request, { params }) => {
  const { productId } = params;
  const userId = request.user.id;

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    await dbConnect();

    const product = await Product.findOne({ _id: productId, userId });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found or you do not have permission to delete it" },
        { status: 404 }
      );
    }

    await Product.deleteOne({ _id: productId });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
});
