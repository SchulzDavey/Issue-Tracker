'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from '../../components/Skeleton';
import toast, { Toaster } from 'react-hot-toast';
import prisma from '@/prisma/client';
import { useRouter } from 'next/navigation';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

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
