import React from 'react'
import { Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueStatBadge from '../component/IssueStatBadge';
import IssueAct from './issueAct';
import delay from 'delay';

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
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getDataIssues.map(perIssue => (
              <Table.Row key={perIssue.id}>
                <Table.Cell>{perIssue.title}<div className='block md:hidden'><IssueStatBadge stat={perIssue.status}/></div></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><IssueStatBadge stat={perIssue.status} /></Table.Cell>
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