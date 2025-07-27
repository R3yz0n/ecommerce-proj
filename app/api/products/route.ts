import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import { withAuth } from "@/lib/middleware/auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

/**
 * POST /api/products
 *
 * Create a new product in the database.
 *
 * Request body (JSON):
 * {
 *   name: string,
 *   description: string,
 *   price: number,
 *   image: string,
 *   category: string
 * }
 *
 * Response:
 *   201: { success: true, data: product }
 *   400: { success: false, error: "Failed to create product" }
 */
export const POST = withAuth(async (request) => {
  await dbConnect();
  const body = await request.json();
  const userId = request.user.id; // Get userId from middleware

  try {
    // Add userId to the product data
    const productData = { ...body, userId };
    console.log(productData);
    const product = await Product.create(productData);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 400 }
    );
  }
});
