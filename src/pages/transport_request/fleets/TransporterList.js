import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useExpanded,
} from 'react-table';
import { toast } from 'react-toastify'
import classNames from 'classnames';
import { master_list, TransporterList } from '../../../helpers/api'
import Pagination from '../../../components/Pagination';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import TableShimmer from '../../../components/Shimmer/TableShimmer';


/* action column render */
const ActionColumn = ({ row }) => {
    return (
        <>
            <Link to={`/transport-request/transporter/${row.original["data-supplier_Id"]}`} className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
        </>
    );
};

// get all columns
const columns = [
    {
        Header: 'Transporter',
        accessor: 'data-supplier',
        sort: true
    },
    {
        Header: 'Contact Person',
        accessor: 'contact_person',
        sort: true,
    },
    {
        Header: 'Phone',
        accessor: 'mobile',
        sort: true,
    },
    {
        Header: 'Email',
        accessor: 'email',
        sort: true,
    },
    {
        Header: 'Pickup Location',
        accessor: 'pickup_location',
        sort: true,
    },
    {
        Header: 'Drop Location',
        accessor: 'drop_location',
        sort: true,
    },

    {
        Header: 'View',
        accessor: 'action',
        sort: false,
        classes: 'table-action',
        Cell: ActionColumn,
    },
];

const TransporterListComp = ({ selectedSupplierArr, materialid,
    materialName, pickupcityid, pickupStateid, dropStateid,
    pickupcityName, dropcityid, dropcityName, listtype }) => {
    const [transportList, setTransportList] = useState([])
    const navigate = useNavigate()
    const [materialsList, setMaterialsList] = useState([])
    const [cityList, setCityList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState({
        material_id: 0,
        fromcityid: 0,
        pickupCityName: "",
        fromstateid: 0,
        tocityid: 0,
        dropCityName: "",
        tostateid: 0,
        materialname: ""
    })

    const buttonRef = useRef();

    const disableButton = () => {
        buttonRef.current.disabled = true; // this disables the button
    }

    const enableButton = () => {
        buttonRef.current.disabled = false; // this enable the button
    }

    const handelSupplierIsInArr = (supplierId) => {
        if (selectedSupplierArr && selectedSupplierArr.length !== 0) {
            const result = selectedSupplierArr.find(item => Number(item.id) === Number(supplierId)) ? true : false
            return result;

        }
    }

    const loadTrasporter = (materialid, pickupcityid, dropcityid) => {
        setIsLoading(true)
        const moduleName = "FleetOwner"
        TransporterList(moduleName, materialid, pickupcityid, dropcityid).then(res => {
            if (res !== undefined) {
                const result = res.data
                if (result.success) {
                    const newdata = result.data

                    // Changing obj key name's here
                    for (var item of newdata) {
                        if (item.supplier)
                            delete Object.assign(item, { 'data-supplier': item.supplier })['supplier'];
                        if (item.supplier_Id)
                            delete Object.assign(item, { 'data-supplier_Id': item.supplier_Id })['supplier_Id'];
                    }
                    setTransportList(newdata)

                    setTimeout(() => {
                        const checkedArr = []
                        const checkboxes = document.querySelectorAll('input[name=supplier]');
                        const checkboxesChecked = document.querySelectorAll('input[name=supplier]:checked');
                        const checkboxesCheckedAll = document.getElementsByName("allsupplier")[0]
                        for (var checkbox of checkboxes) {
                            if (handelSupplierIsInArr(checkbox.getAttribute('data-supplier_id'))) {
                                checkbox.checked = true;
                                checkedArr.push('1')
                            } else {
                                checkbox.checked = false;
                            }

                            if (checkboxesChecked.length === checkboxes.length) {
                                checkboxesCheckedAll.checked = true;
                            } else {
                                checkboxesCheckedAll.checked = false;
                            }
                        }
                        checkedArr.length === 0 ? disableButton() : enableButton()
                    }, 500);
                    setIsLoading(false);
                };
            } else {
                toast.error("Something went wrong please try again")
            }
        })
    };


    useEffect(() => {
        loadTrasporter(filter.material_id, filter.fromcityid, filter.tocityid);
    }, [filter])


    const loadMasterData = () => {
        master_list().then(res => {
            if (res !== undefined) {
                const cityLst = res.data.data.cities
                cityLst[0] = {
                    active: true,
                    city_name: "All",
                    id: 0
                }
                const materialLst = res.data.data.materials
                materialLst[0] = {
                    material_name: "All",
                    id: 0
                }
                setCityList(cityLst)
                setMaterialsList(materialLst)
            }
        })
    }

    useEffect(() => {
        disableButton()
        loadMasterData();
        setFilter({
            ...filter,
            material_id: materialid || 0,
            fromcityid: pickupcityid || 0,
            fromstateid: pickupStateid || 0,
            tocityid: dropcityid || 0,
            tostateid: dropStateid || 0,
            materialname: materialName || null
        })
        loadTrasporter(materialid || 0, pickupcityid || 0, dropcityid || 0);
    }, [])

    // get pagelist to display
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',
            value: transportList.length,
        }
    ];

    const handelAddRFQBtn = () => {
        var markedCheckbox = document.querySelectorAll('.trasporterlist input[class=form-check-input]:checked');
        const tocityid = filter.tocityid
        const tostateid = filter.tostateid
        const fromcityid = filter.fromcityid
        const fromstateid = filter.fromstateid
        const materialname = filter.materialname
        const material_id = filter.material_id
        let objArr = [];
        if (markedCheckbox.length === 0) {
            toast.error("Please select at least one transporter")
        }
        else {
            for (var checkbox of markedCheckbox) {
                if (checkbox.checked) {
                    const elem = checkbox;
                    elem.getAttribute('data-supplier');
                    let id = elem.getAttribute('data-supplier_id')
                    let suppliername = elem.getAttribute('data-supplier')
                    const obj = {
                        id: id,
                        supplier: suppliername
                    }
                    objArr.push(obj);
                }
            }
            const obj = {
                objArr: objArr,
                filter: {
                    material_id: material_id,
                    tocityid: tocityid,
                    tostateid: tostateid,
                    fromcityid: fromcityid,
                    fromstateid: fromstateid,
                    materialname: materialname
                }
            }
            if (listtype === "createrfq") {
                navigate('/transport-request/add-rfq', {
                    state: obj
                })
            }
            if (listtype === "directorder") {
                navigate('/transport-request/add-po', {
                    state: obj
                })
            }
        }

    }
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
            func?: Object
        },
        data: Array<any>,
        searchBoxClass?: string,
        tableClass?: string,
        theadClass?: string,
        rightButton?: {
            link: string,
            title: string
        },
        rightButtonArr?: Array<any>,
        sizePerPageList: {
            text: string,
            value: number,
        }[],
    };

    // --- Table ---//
    const Table = (props: TableProps): React$Element<React$FragmentType> => {
        const isSortable = props['isSortable'] || false;
        const pagination = props['pagination'] || false;
        const isSelectable = props['isSelectable'] || false;
        const isExpandable = props['isExpandable'] || false;
        const isLoading = props['isLoading'] || false;
        const handelChecked = (event) => {
            const checkedArr = []
            const name = event.target.getAttribute("name")
            const checkboxes = document.querySelectorAll('input[name=supplier]');
            const checkboxesChecked = document.querySelectorAll('input[name=supplier]:checked');
            const checkboxesCheckedAll = document.getElementsByName("allsupplier")[0]
            if (name === "supplier") {
                if (checkboxesChecked.length === checkboxes.length) {
                    checkboxesCheckedAll.checked = true;
                } else {
                    checkboxesCheckedAll.checked = false;
                }
            } else if (name === "allsupplier") {
                for (let checkbox of checkboxes) {
                    checkbox.checked = event.target.checked;
                }
            }

            for (let checkbox of checkboxes) {
                if (checkbox.checked) {
                    checkedArr.push('1')
                }
            }
            checkedArr.length === 0 ? disableButton() : enableButton()
        }

        const dataTable = useTable(
            {
                columns: props['columns'],
                data: props['data'],
                initialState: { pageSize: props['pageSize'] || 10 },
            },
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
                                    <input onChange={handelChecked} name="allsupplier" type="checkbox" className="form-check-input" />
                                </div>
                            ),
                            // The cell can use the individual row's getToggleRowSelectedProps method
                            // to the render a checkbox
                            Cell: ({ row }) => (
                                <div>
                                    <input onChange={handelChecked} name="supplier" data-supplier={row.original['data-supplier']}
                                        data-supplier_id={row.original['data-supplier_Id']}
                                        type="checkbox" className="form-check-input" />
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
                <div className="table-responsive">
                    <table
                        {...dataTable.getTableProps()}
                        id="rfqTable"
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
                        <tbody className='trasporterlist' {...dataTable.getTableBodyProps()}>

                            {isLoading ?
                                <>
                                    <TableShimmer columnCount={headerGroupsLength} rowCount={pageSize} />
                                </> :
                                (!rows) || (rows) && (rows.length === 0) ?
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
    return (
        <>
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <Row className="d-flex align-items-center mb-2">
                            <Col sm={8}>
                                {' '}
                                <Row>
                                    <Col lg={3}>
                                        <Form.Group>
                                            <Form.Label>Materials</Form.Label>
                                            <Select
                                                defaultValue={materialid ? { label: materialName, value: materialid } : { label: "All", value: 0 }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setFilter(
                                                    {
                                                        ...filter,
                                                        material_id: e.value,
                                                        materialname: e.label
                                                    }
                                                )}
                                                options={materialsList.length === 0 ? [] : materialsList.map(item => (
                                                    { value: item.id, label: item.material_name }
                                                ))}>
                                            </Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3}>
                                        <Form.Group>
                                            <Form.Label className="">Pickup City</Form.Label>
                                            <Select
                                                defaultValue={materialid ? { label: pickupcityName, value: pickupcityid } : { label: "All", value: 0 }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setFilter(
                                                    {
                                                        ...filter,
                                                        fromcityid: e.value,
                                                        fromstateid: e.value2
                                                    }
                                                )}
                                                options={cityList.length === 0 ? [] : cityList.map(item => (
                                                    { value: item.id, label: item.city_name, value2: item.state_id }
                                                ))}>
                                            </Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={3}>
                                        <Form.Group>
                                            <Form.Label className="">Drop City</Form.Label>
                                            <Select
                                                defaultValue={materialid ? { label: dropcityName, value: dropcityid } : { label: "All", value: 0 }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={(e) => setFilter(
                                                    {
                                                        ...filter,
                                                        tocityid: e.value,
                                                        tostateid: e.value2
                                                    }
                                                )}
                                                options={cityList.length === 0 ? [] : cityList.map(item => (
                                                    { value: item.id, label: item.city_name, value2: item.state_id }
                                                ))}>
                                            </Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <div className="text-sm-end">
                                    <Button ref={buttonRef} onClick={handelAddRFQBtn} variant={"success"} className="mb-2">
                                        <i className='dripicons-plus'></i> {listtype === "createrfq" ? "Add RFQ" : "Add Po"}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            data={transportList}
                            pageSize={5}
                            isLoading={isLoading}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            pagination={true}
                            isSelectable={true}
                            theadClass="table-light"
                            searchBoxClass="mb-2"
                        />
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}

export default TransporterListComp;