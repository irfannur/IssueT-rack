import { IssueStatBadge } from '@/app/component';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetail = ({ issuedet }: { issuedet: Issue }) => {
    return (
        <>
            <Heading as='h1'>Detail Issue : {issuedet.title}</Heading>
            <Flex className='space-x-3' my='2'>
                <IssueStatBadge stat={issuedet.status} />
                <Text>{issuedet.createAt.toLocaleString()}</Text>
                <Text> /  LU : {issuedet.updateAt.toLocaleString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <ReactMarkdown>{issuedet.description}</ReactMarkdown>
            </Card>
        </>
    );
};

export const dynamic = 'force-dynamic';
export default IssueDetail;