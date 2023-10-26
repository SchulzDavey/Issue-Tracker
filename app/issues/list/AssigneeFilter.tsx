'use client';

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface AssigneeFilterProps {
  users: User[];
}

const AssigneeFilter = ({ users }: AssigneeFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <Select.Root
      defaultValue={searchParams.get('assignee') || 'ALL'}
      onValueChange={(user) => {
        const params = new URLSearchParams();
        if (user) params.append('assignee', user);

        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!);

        if (searchParams.get('status'))
          params.append('status', searchParams.get('status')!);

        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by assignee..." />
      <Select.Content>
        <Select.Item value="ALL">All</Select.Item>
        {users.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeFilter;
