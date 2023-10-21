import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface IssueDetailPageProps {
  params: { id: string };
}

const IssueDetailPage: FC<IssueDetailPageProps> = async ({ params }) => {
  if (typeof params.id !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toLocaleDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
