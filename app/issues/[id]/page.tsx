import prisma from '@/prisma/client'
import { Heading } from '@radix-ui/themes';
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
            <p>{issuedet.description}</p>
            <p>{issuedet.createAt.toLocaleString()}</p>
            <p>{issuedet.updateAt.toLocaleString()}</p>
        </div>
    )
}

export default IssueDetPage