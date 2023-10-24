'use client';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { TableHead } from './TableHead/TableHead';
import { TableBody } from '@/modules/contactsContent/components/Table/TableBody/TableBody';
import { EMPTY_ARRAY } from '@/common/constants/initValue';
import ReactPaginate from 'react-paginate';
import { TableData } from '@/common/types/Api';

import styles from './Table.module.scss';

interface ITableProps<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
}

export const Table: FC<ITableProps<TableData>> = ({
  results,
  count,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  ...otherProps
}) => {
  const [initPagination, setInitPagination] = useState(false);
  useEffect(() => {
    setInitPagination(true);
  }, []);
  const keys = results && results.length > 0 ? Object.keys(results[0]) : EMPTY_ARRAY;

  const pageCount = Math.ceil(count / itemsPerPage);

  const handlePageChange = (selected: any) => {
    setCurrentPage(selected.selected);
  };
  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          {keys && <TableHead data={keys} />}
          {results && <TableBody data={results} />}
        </table>
      </div>
      <div className={styles.footer}>
        {initPagination && (
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            initialPage={currentPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            containerClassName={styles.pagination}
            pageLinkClassName={styles.pageLink}
            activeClassName={styles.activePage}
            previousLinkClassName={styles.pageLink}
            nextLinkClassName={styles.pageLink}
            disabledClassName={styles.disabledPage}
          />
        )}
      </div>
    </>
  );
};
