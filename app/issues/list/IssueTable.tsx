'use client';

import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import NextLink from 'next/link';
import { Issue, Status } from '@prisma/client';
import { useDispatch } from 'react-redux';
import { AppDispatch, useListSelector } from '@/redux/store';
import { setListOrder } from '@/redux/features/list-slice';

interface IssueTableProps {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
  issues: Issue[];
}

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const IssueTable = ({ searchParams, issues }: IssueTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const listOrder = useListSelector((state) => state.listReducer.listOrder);

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              onClick={() => {
                dispatch(setListOrder(listOrder === 'asc' ? 'desc' : 'asc'));
              }}
              key={column.label}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    orderList: listOrder,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && listOrder === 'asc' && (
                <ArrowUpIcon className="inline" />
              )}
              {column.value === searchParams.orderBy &&
                listOrder === 'desc' && <ArrowDownIcon className="inline" />}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
