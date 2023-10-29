import React from 'react'
import { Table } from '@radix-ui/themes';
import IssueStatBadge from '../component/IssueStatBadge';
import IssueAct from './issueAct';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssuesPage = async () => {
  const getDataIssues = [1,2,3,4,5];

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
              <Table.Row key={perIssue}>
                <Table.Cell><Skeleton /> <div className='block md:hidden'><Skeleton /> </div></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuesPage