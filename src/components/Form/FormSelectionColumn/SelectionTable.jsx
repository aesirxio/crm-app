/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import {
  useAsyncDebounce,
  useExpanded,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useRowState,
  useSortBy,
  useTable,
} from 'react-table';
import { withTranslation } from 'react-i18next';
import './index.scss';
import ComponentNoData from 'components/ComponentNoData';
import ComponentSVG from 'components/ComponentSVG';
function useInstance(instance) {
  const { allColumns } = instance;

  let rowSpanHeaders = [];

  allColumns.forEach((column) => {
    const { id, enableRowSpan } = column;

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }];
    }
  });

  Object.assign(instance, { rowSpanHeaders });
}

const SelectionTable = ({ columns, data, dataList, classNameTable, isSelectedTable, ...props }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    rowSpanHeaders,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.useInstance.push(useInstance);
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useRowState
  );

  const { t } = props;
  const isTableHaveData = !(
    !isSelectedTable && rows.every((row) => row.original?.selected === true)
  );
  const [value, setValue] = React.useState(state.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div className="selection">
      <div className="position-relative">
        <input
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={t('txt_search') + '...'}
          className="form-control rounded-0 my-16 ps-6 py-12 lh-1 fs-6"
        />
        <ComponentSVG
          url="/assets/images/search.png"
          className={`me-1 bg-gray-800 selection-search-icon`}
        />
      </div>
      <div className="selection-table p-0 rounded-2 mt-16">
        <div className="fs-14 text-color position-relative h-100">
          {rows.length && isTableHaveData ? (
            <table {...getTableProps()} className={`w-100 mb-0 ${classNameTable}`}>
              <thead className="fs-6 bg-white zindex-1">
                {headerGroups.map((headerGroup, index) => {
                  let newHeaderGroup = '';

                  dataList
                    ? (newHeaderGroup = headerGroup.headers.filter(
                        (item) => !dataList.some((other) => item.id === other)
                      ))
                    : (newHeaderGroup = headerGroup.headers);

                  return (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {newHeaderGroup.map((column, index) => {
                        return (
                          <th
                            key={index}
                            className={`${column.className}`}
                            rowSpan={`${column.rowSpanHeader ?? 1}`}
                          >
                            {column.render('Header')}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  for (let j = 0; j < row.allCells.length; j++) {
                    let cell = row.allCells[j];
                    let rowSpanHeader = rowSpanHeaders.find((x) => x.id === cell.column.id);

                    if (rowSpanHeader !== undefined) {
                      if (
                        rowSpanHeader.topCellValue === null ||
                        rowSpanHeader.topCellValue !== cell.value
                      ) {
                        cell.isRowSpanned = false;
                        rowSpanHeader.topCellValue = cell.value;
                        rowSpanHeader.topCellIndex = i;
                        cell.rowSpan = 1;
                      } else {
                        rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                        cell.isRowSpanned = true;
                      }
                    }
                  }
                  return null;
                })}
                {rows.length > 0 &&
                  rows.map((row) => {
                    return (
                      ((isSelectedTable && row.original?.selected) ||
                        (!isSelectedTable && !row.original?.selected)) && (
                        <tr key={row.getRowProps().key} {...row.getRowProps()}>
                          {row.cells.map((cell, index) => {
                            if (cell.isRowSpanned) return null;
                            else
                              return (
                                <td
                                  key={index}
                                  rowSpan={cell.rowSpan}
                                  {...cell.getCellProps({
                                    style: { width: cell.column.width },
                                  })}
                                  className="py-0 fs-14 align-middle border-bottom-0"
                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                          })}
                        </tr>
                      )
                    );
                  })}
              </tbody>
            </table>
          ) : null}

          {rows.length === 0 || !isTableHaveData ? (
            <div className="py-5">
              <ComponentNoData icons="/assets/images/ic_project.svg" title="No Data" width="w-50" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withTranslation('common')(SelectionTable);
