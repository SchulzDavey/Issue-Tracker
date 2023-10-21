import prisma from '@/prisma/client';
import IssueForm from '../../_components/IssueForm';
import { FC } from 'react';
import { notFound } from 'next/navigation';

interface EditIssuePageProps {
  params: { id: string };
}

const EditIssuePage: FC<EditIssuePageProps> = async ({ params }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
