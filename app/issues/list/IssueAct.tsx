import { Button, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueAct = () => {
  return (
    <div className='flex mb-5 justify-between'>
        <Heading as='h1'>List Issues</Heading>
        <Button className='float-right'><Link href="/issues/create">New Issue</Link></Button>
      </div>
  )
}

export default IssueAct