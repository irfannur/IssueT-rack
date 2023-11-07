import React from 'react'
import { IconButton, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueStatBadge from '../../component/IssueStatBadge';
import IssueAct from './IssueAct';
import Link from 'next/link';
import { MagnifyingGlassIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';

const IssuesPage = async () => {
  const getDataIssues = await prisma.issue.findMany({
    orderBy: { createAt: 'desc' }
  });

  const session = await getServerSession(authOptions);

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
                  {session && (
                    <IconButton variant='solid'><Link href={`/issues/edit/${perIssue.id}`}><Pencil2Icon /></Link></IconButton>
                  )}
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

export const dynamic = 'force-dynamic';
export default IssuesPage