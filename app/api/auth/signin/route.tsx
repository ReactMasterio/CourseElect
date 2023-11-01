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

    const {
        UID,
        USSN,
        UFirstname,
        ULastname,
        Username,
        Password,
        UEmail,
        URole,
        UPhoneNumber
    } = body;

    // Check if user already exists in the database
    const user = await prisma.users.findFirst({
        where: {
            USSN: USSN
        }
    });

    if (user) {
        return NextResponse.json({ error: `User with USSN : ${USSN} Already Exist` });
    }

    const UIDExist = await prisma.users.findFirst({
        where: {
            UID: UID
        }
    });

    if (UIDExist) {
        return NextResponse.json({ error: `User with UID : ${UID} Already Exist` });
    }

    const UsernameExist = await prisma.users.findFirst({
        where: {
            Username: Username
        }
    });

    if (UsernameExist) {
        return NextResponse.json({ error: `User with Username : ${Username} Already Exist` });
    }


    const EmailExist = await prisma.users.findFirst({
        where: {
            UEmail: UEmail
        }
    });

    if (EmailExist) {
        return NextResponse.json({ error: `User with Email : ${UEmail} Already Exist` });
    }


    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await prisma.users.create({
        data: {
            UID: UID,
            USSN: USSN,
            UFirstname: UFirstname,
            ULastname: ULastname,
            Username: Username,
            Password: hashedPassword,
            UEmail: UEmail,
            URole: URole,
            UPhoneNumber: UPhoneNumber
        }
    });

    return NextResponse.json(newUser, { status: 201 });
}