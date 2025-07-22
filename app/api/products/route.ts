import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

export async function GET(request: Request) {
  const dummyProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for product 1",
      price: 100,
      image: "https://via.placeholder.com/150",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for product 2",
      price: 200,
      image: "https://via.placeholder.com/150",
      category: "Category 2",
    },
  ];

  return NextResponse.json(dummyProducts);
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
