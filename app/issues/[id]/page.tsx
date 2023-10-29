import prisma from '@/prisma/client'
import { Box, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import IssueDetail from './IssueDetail';
import EditIssueButton from './EditIssueButton';

interface Props {
    params: { id: string }
}

const IssueDetPage = async ({ params }: Props) => {
    const issuedet = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!issuedet) {
        notFound();
    }

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetail issuedet={issuedet}/>
            </Box>
            <Box>
                <EditIssueButton issueId={issuedet.id}/>
            </Box>
        </Grid>
    )
}

export default IssueDetPage