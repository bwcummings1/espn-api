import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTable, useSortBy } from 'react-table';

const TeamComparison = () => {
  const teams = useSelector((state: RootState) => state.league.teams);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Team',
        accessor: 'name',
      },
      {
        Header: 'W-L-T',
        accessor: (row) => `${row.wins}-${row.losses}-${row.ties}`,
      },
      {
        Header: 'Points For',
        accessor: 'points_for',
      },
      {
        Header: 'Points Against',
        accessor: 'points_against',
      },
      {
        Header: 'Streak',
        accessor: 'streak',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: teams }, useSortBy);

  return (
    <div className="bg-slate-800 text-slate-100 shadow rounded-lg p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 font-header">Team Comparison</h2>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamComparison;