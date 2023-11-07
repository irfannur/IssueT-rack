import authOptions from '@/app/api/auth/authOptions';
import { Button, Heading } from '@radix-ui/themes'
import { getServerSession } from 'next-auth';
import Link from 'next/link'
import React from 'react'

const IssueAct = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='flex mb-5 justify-between'>
      <Heading as='h1'>List Issues</Heading>
      {session && (
        <Button className='float-right'><Link href="/issues/create">New Issue</Link></Button>
      )}
    </div>
  )
}

export default IssueAct