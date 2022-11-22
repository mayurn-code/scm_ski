// @flow
import React, { useRef, useEffect, forwardRef } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';

// components
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import { string } from 'yup';
import { Button } from 'react-bootstrap';
import TableShimmer from './Shimmer/TableShimmer';


// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass, rightButton, rightButtonArr, selectFilterValues }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (


        <div className={classNames(searchBoxClass)}>
            <div className="d-flex justify-content-space-between">
                {' '}
                <span className='d-flex'>
                    <input
                        value={value || ''}
                        onChange={(e) => {
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        placeholder={`Search`}
                        className="form-control w-auto ms-1"
                    />
                    {selectFilterValues && selectFilterValues['arrayData'] && selectFilterValues['arrayData'].length > 0 &&
                        <select className="form-control w-auto ms-1" onChange={(e) => selectFilterValues['func'](e.target.value)}>
                            {selectFilterValues['arrayData'].map((item) => (
                                <option key={item.key} value={item.value}>{item.title}</option>
                            ))}
                        </select>
                    }
                </span>
                {rightButton &&
                    <>
                        {
                            rightButton.state ?
                                <Link
                                    to={rightButton.link}
                                    state={{ state: rightButton.state }}
                                    className="btn btn-primary">
                                    <i className="dripicons-plus "></i> {rightButton.title}
                                </Link>
                                :
                                <Link to={rightButton.link} className="btn btn-primary">
                                    <i className="dripicons-plus "></i>
                                    {rightButton.title}
                                </Link>
                        }
                    </>
                }
                {rightButtonArr && rightButtonArr.length !== 0 &&
                    <div className='text-sm-end'>
                        {
                            rightButtonArr.map(index => (
                                <Button className={index.className} onClick={index.func}>
                                    {index.btn}
                                </Button>
                            ))
                        }
                    </div>
                }
            </div>
        </div >
    );
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

type TableProps = {
    isSearchable?: boolean,
    isSortable?: boolean,
    pagination?: boolean,
    isSelectable?: boolean,
    isExpandable?: boolean,
    pageSize: number,
    columns: Array<any>,
    tdWrap?: boolean,
    isLoading?: boolean,
    selectFilterValues?: {
        arrayData?: Array<any>,
        func?: Object,

    },
    data: Array<any>,
    searchBoxClass?: string,
    tableClass?: string,
    theadClass?: string,
    rightButton?: {
        link: string,
        title: string,
        state?: Object
    },
    rightButtonArr?: Array<any>,
    sizePerPageList: {
        text: string,
        value: number,
    }[],
};

const Table = (props: TableProps): React$Element<React$FragmentType> => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;
    const isLoading = props['isLoading'] || false;



    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    // Let's make a column for selection
                    {
                        // Build our expander column
                        id: 'expander', // Make sure it has an ID
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                            // to build the toggle for expanding a row
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            // We can even use the row.depth property
                                            // and paddingLeft to indicate the depth
                                            // of the row
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;

    const headerGroupsLength = dataTable.headerGroups &&
        dataTable.headerGroups[0] &&
        dataTable.headerGroups[0].headers &&
        dataTable.headerGroups[0].headers.length

    const pageSize = props['pageSize'] && Number(props['pageSize'])

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    selectFilterValues={props['selectFilterValues']}
                    rightButton={props['rightButton']}
                    rightButtonArr={props['rightButtonArr']}
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}
            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {dataTable.headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...dataTable.getTableBodyProps()}>
                        {isLoading ?
                            <>
                                <TableShimmer columnCount={headerGroupsLength} rowCount={pageSize} />
                            </> :
                            !rows || rows && rows.length === 0 ?
                                <tr>
                                    <td colspan={headerGroupsLength || 0} style={{ textAlign: "center" }}>
                                        No records found.
                                    </td>
                                </tr>
                                :
                                (rows || []).map((row, i) => {
                                    dataTable.prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return <td className={props['tdWrap'] ? "tbody-td-wrap" : ""} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                            })}
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>

            {pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

export default Table;
