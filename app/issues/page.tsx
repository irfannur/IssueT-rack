import React from 'react'
import { Button, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const IssuesPage = async () => {
  const getDataIssues = await prisma.issue.findMany({
    orderBy: { createAt: 'desc' }
  });

  return (
    <div>
      <div className='flex mb-5 justify-between'>
        <Heading as='h1'>List Issues</Heading>
        <Button className='float-right'><Link href="/issues/create">New Issue</Link></Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getDataIssues.map(perIssue => (
              <Table.Row key={perIssue.id}>
                <Table.Cell>{perIssue.title}<div className='block md:hidden'>{perIssue.status}</div></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{perIssue.status}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{perIssue.createAt.toLocaleString()}</Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage