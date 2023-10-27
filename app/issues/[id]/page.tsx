import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import AssigneeSelect from './AssigneeSelect';
import StatusSelect from './StatusSelect';

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage: FC<IssueDetailPageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
