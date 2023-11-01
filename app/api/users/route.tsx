import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const users = await prisma.users.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "مشکلی هنگام ارتباط با سرور به وجود آمد." }, { status: 500 })
    }
}


export async function POST(request:NextRequest){}
