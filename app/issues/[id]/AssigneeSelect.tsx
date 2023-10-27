'use client';

import { setIssueStatus } from '@/redux/features/issue-slice';
import { fetchUsers } from '@/redux/features/user-slice';
import { AppDispatch, useUserSelector } from '@/redux/store';
import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Skeleton from '../../components/Skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useUserSelector(
    (state) => state.userReducer.value
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssueHandler = async (userId: string) => {
    try {
      const status = users?.map((user) => {
        if (issue.status !== 'CLOSED') {
          return userId === 'unassigned' ? 'OPEN' : 'IN_PROGRESS';
        }
      })[0];

      await axios.patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'unassigned' ? null : userId,
        status,
      });

      dispatch(setIssueStatus(status!));
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssueHandler}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
