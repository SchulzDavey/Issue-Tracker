import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import AssigneeFilter from './AssigneeFilter';
import IssueStatusFilter from './IssueStatusFilter';
import prisma from '@/prisma/client';

const IssueActions = async () => {
  const users = await prisma.user.findMany({});

  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <AssigneeFilter users={users} />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
