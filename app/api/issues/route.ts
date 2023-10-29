import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueRule } from "../../rule/issueRule";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = issueRule.safeParse(body);

    if (!validation.success) { //cek / validation data masuk
        return NextResponse.json(validation.error.errors, { status: 400})
    }

    const createIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    });

    return NextResponse.json(createIssue, { status: 201 });
}