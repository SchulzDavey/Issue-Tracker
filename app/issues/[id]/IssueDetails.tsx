'use client';

import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { useIssueSelector } from '@/redux/store';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface IssueDetailsProps {
  issue: Issue;
}

const IssueDetails: FC<IssueDetailsProps> = ({ issue }) => {
  const status = useIssueSelector((state) => state.issueReducer.value.status);

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={status} />
        <Text>{issue.createdAt.toLocaleDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
