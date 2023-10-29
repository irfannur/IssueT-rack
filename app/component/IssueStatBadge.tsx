import React from 'react'
import { Stat } from '@prisma/client'
import { Badge } from '@radix-ui/themes';

const statMap: Record<
    Stat, {label: string, color: 'red' | 'violet' | 'green'}
> = {
    OPEN: {label: 'Open', color: 'red'},
    IN_PROGRES: {label: 'In Progress', color: 'violet'},
    CLOSE: {label: 'Close', color: 'green'}
};

const IssueStatBadge = ({stat}: {stat:Stat}) => {
  return (
    <Badge color={statMap[stat].color}>
        {statMap[stat].label}
    </Badge>
  )
}

export default IssueStatBadge