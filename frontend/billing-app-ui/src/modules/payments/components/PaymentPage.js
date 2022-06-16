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
import ManageBillingsDialog from "./ManageBillingsDailog";

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



const PaymentPage = () => {
    const service = new BillPaymentsService();
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
        getBillingsData();
    }, []);

    async function getBillingsData() {
        setShowDataInProgress(true);
        await service.getBillingsByStatus("Approved")
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


    const CustomSelectField = (props) => {
        let row = props.row
        const handleOnChangeEvent = (event) => {
            row.status = "Processed"
            service.updateBillingStatus(row.id, row);
            alert(`Payment of ${row.amount} has been processed successfully to ${row.customerDetails.customerName}`)
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
                <MenuItem value="Pay">
                    Pay
                </MenuItem>
            </TextField>
        );
    }

    // () => {setIsDialogOpen(true);}
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - resultItemsCount) : 0;
    return (
        <Grid container>
            <React.Fragment>
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

                    {isDialogOpen && <ManageBillingsDialog
                        isDialogOpened={isDialogOpen}
                        handleCloseDialog={() => setIsDialogOpen(false)} />
                    }
                </Card>
            </React.Fragment>
        </Grid >
    )
};



export default PaymentPage;