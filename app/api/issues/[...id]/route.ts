import authOptions from '../../auth/authOptions';
import { issueRule, issueRuleAssign } from '@/app/rule/issueRule';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string[] } }

  //param id array. /api/issues/{id}/{assign} 
  //buat dir nya [...id] menandakan param id array
  //lihat di file AssigneeSelect.tsx
  //ref : https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-routes
) {

  const { id } = params;
  const idIssue = id[0];
  const isAssign = (id[1] !== undefined ? id[1] : null);

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const ruleSchema = (isAssign == 'yes' ? issueRuleAssign : issueRule);
  const validation = ruleSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const getUser = await prisma.user.findUnique({
      where: { id: assignedToUserId }
    });

    if (!getUser) {
      return NextResponse.json(
        { error: 'Invalid user' },
        { status: 404 }
      );
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(idIssue) },
  });

  if (!issue) {
    return NextResponse.json(
      { error: 'Invalid issue' },
      { status: 404 }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: 'Invalid issue' },
      { status: 404 }
    );

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}