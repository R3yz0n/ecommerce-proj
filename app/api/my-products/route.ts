import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import { withAuth } from "@/lib/middleware/auth";

export const GET = withAuth(async (request) => {
  const userId = request.user?.id;
  console.log("get user product", userId);
  try {
    await dbConnect();
    // Get products created by the authenticated user
    console.log("get user product");

    const products = await Product.find({ userId: userId });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
});
