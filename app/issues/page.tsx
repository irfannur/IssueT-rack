import React from 'react'
import { IconButton, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueStatBadge from '../component/IssueStatBadge';
import IssueAct from './IssueAct';
import delay from 'delay';
import Link from 'next/link';
import { MagnifyingGlassIcon, Pencil2Icon } from '@radix-ui/react-icons';

const IssuesPage = async () => {
  const getDataIssues = await prisma.issue.findMany({
    orderBy: { createAt: 'desc' }
  });
  await delay(2000);

  return (
    <div>
      <IssueAct />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getDataIssues.map((perIssue, i) => (
              <Table.Row key={perIssue.id}>
                <Table.Cell>{i++ + 1}</Table.Cell>
                <Table.Cell><Link href={`/issues/${perIssue.id}`}>{perIssue.title}</Link> <div className='block md:hidden'><IssueStatBadge stat={perIssue.status}/></div></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><IssueStatBadge stat={perIssue.status} /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{perIssue.createAt.toLocaleString()}</Table.Cell>
                <Table.Cell className='space-x-1'>
                  <IconButton variant='solid'><Link href='/update'><Pencil2Icon /></Link></IconButton>
                  <IconButton variant='solid' color='blue'><Link href={`/issues/${perIssue.id}`}><MagnifyingGlassIcon /></Link></IconButton>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default IssuesPage