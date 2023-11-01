import { NextRequest, NextResponse } from 'next/server';
import schema from './schema';
import prisma from '@/prisma/client';
const bcrypt = require('bcrypt');

export async function POST(request: NextRequest) {
    // Receive the body
    let body;
    try {
        body = await request.json();
    } catch (error) {
        return NextResponse.json({ error: "Body is Empty!" }, { status: 400 });
    }

    // Validate the body
    const validation = schema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });
    }

    // Search the database based on the username
    const user = await prisma.users.findFirst({
        where: {
            Username: body.username
        }
    });

    if (!user) {
        return NextResponse.json({ error: "User Not Found!" }, { status: 404 });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(body.password, user.Password);

    if (!isPasswordValid) {
        return NextResponse.json({ error: "Invalid username or password." }, { status: 403 });
    }

    // Successful login
    return NextResponse.json(user, { status: 200 });
}
