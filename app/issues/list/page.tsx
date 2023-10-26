import prisma from '@/prisma/client';
import Pagination from '@/app/components/Pagination';
import { Issue, Status, User } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columns } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface IssuePageProps {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
    assignee: string;
    user: keyof User;
  };
}

const IssuesPage = async ({ searchParams }: IssuePageProps) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      ...(searchParams.assignee != 'ALL'
        ? { assignedToUserId: searchParams.assignee }
        : {}),
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalIssues = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={totalIssues}
      />
    </Flex>
  );
};

export default IssuesPage;
