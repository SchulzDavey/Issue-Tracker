'use client';

import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { setIssueStatus } from '@/redux/features/issue-slice';
import { AppDispatch, useIssueSelector } from '@/redux/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

const statuses: { label: string; value?: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const dispatch = useDispatch<AppDispatch>();
  const issueStats = useIssueSelector(
    (state) => state.issueReducer.value.status
  );

  const router = useRouter();

  if (issueStats.length < 0) return <Skeleton />;

  const onChangeStatus = async (status: string) => {
    try {
      await axios.patch('/api/issues/' + issue.id, {
        status,
      });

      dispatch(setIssueStatus(status));

      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <Select.Root
      defaultValue={issueStats}
      value={issueStats}
      onValueChange={onChangeStatus}
    >
      <Select.Trigger placeholder="Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses?.map((status, index) => (
            <Select.Item
              key={`${status}_${index}`}
              value={status.value || 'ALL'}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
