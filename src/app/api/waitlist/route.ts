import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Basic sanitization
    const sanitizedEmail = email?.trim();
    const sanitizedName = name?.trim();

    // Simple backend validation (frontend does the heavy lifting)
    if (!sanitizedEmail || !/^\S+@\S+\.\S+$/.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email: sanitizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already on the waitlist!" },
        { status: 409 }
      );
    }

    // Create waitlist entry
    await prisma.waitlist.create({
      data: {
        email: sanitizedEmail,
        name: sanitizedName || null,
      },
    });

    return NextResponse.json(
      { success: true, message: "Successfully joined the waitlist!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await prisma.waitlist.count();
    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Waitlist count error:", error);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
