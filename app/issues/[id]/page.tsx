import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import IssueDetail from './IssueDetail';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
    params: { id: string }
}

const IssueDetPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions); //get session login
    // if (!session) 
    //     return NextResponse.json({}, { status: 401 });
    // agar bisa buka tanpa login
console.log(session);
    const issuedet = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issuedet) {
        notFound();
    }

    return (
        <Grid columns={{ initial: "1", md: "5" }} gap="5">
            <Box className='md:col-span-4'>
                <IssueDetail issuedet={issuedet} />
            </Box>

            {/* if tidak login tombol di hide */}
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <AssigneeSelect />
                        <EditIssueButton issueId={issuedet.id} />
                        <DeleteIssueButton issueId={issuedet.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    )
}

export default IssueDetPage