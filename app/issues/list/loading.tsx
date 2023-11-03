import { Table } from '@radix-ui/themes';
import IssueAct from './IssueAct';
import { Skeleton } from '@/app/component';

const LoadingIssuesPage = async () => {
  const getDataIssues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssueAct />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell><Skeleton /></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell><Skeleton /></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell><Skeleton /></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell><Skeleton /></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            getDataIssues.map(perIssue => (
              <Table.Row key={perIssue}>
                <Table.Cell><Skeleton /></Table.Cell>
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