import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

export async function GET(request: Request) {
  try {
    await dbConnect();
    NextResponse.json({ message: "Database connected" });
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
export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  try {
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 400 }
    );
  }
}
