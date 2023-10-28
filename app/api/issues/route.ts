import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueRule = z.object({ //rule validation
    title: z.string().min(1).max(255),
    description: z.string().min(1),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueRule.safeParse(body);

    if (!validation.success) { //cek / validation data masuk
        return NextResponse.json(validation.error.errors, { status: 400})
    }

    const createIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(createIssue, { status: 201 });
}