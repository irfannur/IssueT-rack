import IssueStatBadge from '@/app/component/IssueStatBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'

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
        <div>
            <Heading as='h1'>Detail Issue : {issuedet.title}</Heading>
            <Flex className='space-x-3' my='2'>
                <IssueStatBadge stat={issuedet.status} />
                <Text>{issuedet.createAt.toLocaleString()}</Text>
                <Text> /  LU : {issuedet.updateAt.toLocaleString()}</Text>
            </Flex>
            <Card className='max-w-xl'>
                <p>{issuedet.description}</p>
            </Card>
        </div>
    )
}

export default IssueDetPage