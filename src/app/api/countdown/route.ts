import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const id = "early-access";

  let row = await prisma.countdown.findUnique({ where: { id } });
  if (!row) {
    const now = new Date();
    const endAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    row = await prisma.countdown.create({ data: { id, endAt } });
  }

  return NextResponse.json(
    { endAt: row.endAt.toISOString() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
