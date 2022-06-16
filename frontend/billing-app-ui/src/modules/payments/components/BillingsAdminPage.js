import React, { useEffect, useState } from "react";

import { TextField, MenuItem, Grid, Card, Box, Backdrop, CircularProgress } from '@mui/material';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import BillPaymentsService from "../services/BillPaymentsService";

const headCells = {
    data: [
        {
            id: 'customerName',
            label: 'Customer Name',
            isValueLink: false,
        },
        {
            id: 'amount',
            label: 'Amount',
            isValueLink: false,
        },
        {
            id: 'date',
            label: 'Date Initiated',
            isValueLink: false,
        },
        {
            id: 'status',
            label: 'Status',
            isValueLink: false,
        },
        {
            id: 'remarks',
            label: 'Remarks',
            isValueLink: false,
        },
        {
            id: 'action',
            label: 'Actions',
            isValueLink: false,
        }
    ]
};

const BillingsAdminPage = () => {
    const service = new BillPaymentsService();
    const [statusDropDownValues, setStatusDropDownValues] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [billingsResp, setBillingsResp] = useState([]);
    const [resultItemsCount, setResultItemsCount] = useState(0);

    const [showDataInProgress, setShowDataInProgress] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        getScreenModelsDropDown();
        getBillingsData("All");
    }, []);

    const setStatusFilterHandler = (event) => {
        setStatusFilter(event.target.value);
        getBillingsData(event.target.value);
    }


    async function getScreenModelsDropDown() {
        setStatusDropDownValues(["Pending", "Approved", "Rejected", "Processed"]);
    }

    async function getBillingsData(status) {
        setShowDataInProgress(true);
        if (status !== "All" && status !== null && status !== "") {
            await service.getBillingsByStatus(status)
                .then((response) => {
                    setBillingsResp(response.data);
                    setResultItemsCount(response.data.length)
                    setShowDataInProgress(false);
                })
                .catch((err) => {
                    setShowDataInProgress(false);
                    console.log(err);
                });
        } else {
            await service.getBillings()
                .then((response) => {
                    setBillingsResp(response.data);
                    setResultItemsCount(response.data.length)
                    setShowDataInProgress(false);
                })
                .catch((err) => {
                    setShowDataInProgress(false);
                    console.log(err);
                });
        }
    }


    const CustomSelectField = (props) => {
        let row = props.row
        const handleOnChangeEvent = (event) => {
            row.status = event.target.value
            service.updateBillingStatus(row.id, row);
        }
        return (
            <TextField
                select
                label="Action"
                id={`${row.id}`}
                variant="standard"
                onChange={handleOnChangeEvent}
                margin='none'
                SelectProps={{ margin: 'none' }}
                sx={{ minWidth: '80px' }}
            >
                <MenuItem value="Approved">
                    Approve
                </MenuItem>
                <MenuItem value="Pending">
                    Pending
                </MenuItem>
                <MenuItem value="Rejected">
                    Reject
                </MenuItem>
            </TextField>
        );
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - resultItemsCount) : 0;
    return (
        <Grid container>
            <React.Fragment>
                <Grid container
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { ml: 1, minWidth: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">
                    <Grid item sx={{ marginTop: 0.75 }}>
                        <TextField
                            select
                            id="status"
                            label="Billing Status"
                            variant="standard"
                            onChange={setStatusFilterHandler}
                            value={statusFilter}
                        >
                            <MenuItem key='all' value='All'>
                                All
                            </MenuItem>
                            {statusDropDownValues.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Card sx={{ width: '100%', m: 1, position: 'relative' }}>
                    <Box sx={{ width: '100%' }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: '100%', maxWidth: '100%', mt: 1 }}
                                size='medium'
                            >
                                <TableHead>
                                    <TableRow>
                                        {headCells.data.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                padding='normal'
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {headCell.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {billingsResp
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={index}
                                                    sx={{ ml: 3 }}
                                                >
                                                    <TableCell>
                                                        {row.customerDetails.customerName}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.amount}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.requestRaisedOn}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.remarks}
                                                    </TableCell>
                                                    <TableCell>
                                                        <CustomSelectField row={row} />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 15, 20, 25]}
                            component="div"
                            count={resultItemsCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>
                    {showDataInProgress && <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Backdrop
                            sx={{ color: '#fff', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer - 1, opacity: 0.5 }}
                            open={showDataInProgress}
                        >
                            <CircularProgress />
                        </Backdrop>
                    </Box>}
                </Card>
            </React.Fragment>
        </Grid >
    )
};

export default BillingsAdminPage;
