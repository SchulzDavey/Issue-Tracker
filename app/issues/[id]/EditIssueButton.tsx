import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { FC } from 'react';

interface EditIssueButtonProps {
  issueId: number;
}

const EditIssueButton: FC<EditIssueButtonProps> = ({ issueId }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
