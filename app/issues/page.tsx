import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssuesPage = () => {
  return (
    <div>
        <h1>IssuesPage</h1>
        <Button><Link href="/issues/create">New Issue</Link></Button>
    </div>
  )
}

export default IssuesPage