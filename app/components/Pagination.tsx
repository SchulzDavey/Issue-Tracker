'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Select, Text } from '@radix-ui/themes';
import { useSearchParams, useRouter } from 'next/navigation';
import { FC } from 'react';

interface PaginationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  itemCount,
  pageSize,
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const pages = [...Array(pageCount)].map((page, index) => index + 1);

  const changePageHandler = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePageHandler(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePageHandler(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePageHandler(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePageHandler(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>

      {pageCount !== 0 && (
        <Select.Root
          onValueChange={(value) => changePageHandler(Number(value))}
          defaultValue={currentPage.toString()}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              {[...Array(pageCount)].map((val, index) => (
                <Select.Item
                  key={Number(index + 1).toString()}
                  value={Number(index + 1).toString()}
                >
                  {Number(index + 1).toString()}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    </Flex>
  );
};

export default Pagination;
