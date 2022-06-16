import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, Card, Grid } from '@mui/material';
import BillPaymentsService from '../services/BillPaymentsService';

const ManageBillingsDialog = ({ isDialogOpened, handleCloseDialog }) => {
    const restClient = new BillPaymentsService();
    const [amount, setAmount] = useState(0.0);
    const [customers, setCustomers] = useState([{ customerName: "", id: "" }]);
    const [selectedCustomer, setSelectedCustomer] = useState({ customerName: "", id: "" });

    useEffect(() => {
        getCustomersDropDown();
    }, []);

    const handleClose = () => {
        handleCloseDialog(false);
    };

    async function getCustomersDropDown() {
        await restClient.getAllCustomers()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ customerId: selectedCustomer.id, amount });
        restClient.createBilling({ customerId: selectedCustomer.id, amount });
        handleCloseDialog(false);
    }
    return (
        <Card>
            <Dialog open={isDialogOpened} onClose={handleClose}>
                <DialogTitle sx={{ backgroundColor: '#007AAA', textAlign: 'center' }}>Add New Billing</DialogTitle>
                <DialogContent>
                    <Grid container sx={{ width: '100%' }}>
                        <Grid container
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { ml: 1 },
                            }}
                            noValidate
                            autoComplete="off">
                            <Grid item sx={{ width: '100%' }}>
                                <Autocomplete
                                    autoFocus
                                    size="small"
                                    fullWidth
                                    disablePortal={true}
                                    id="customerFilter"
                                    getOptionLabel={(option) => option.customerName}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    options={customers}
                                    onChange={(event, newValue) => {
                                        setSelectedCustomer(newValue);
                                    }}
                                    value={selectedCustomer}
                                    renderInput={(params) => <TextField
                                        fullWidth
                                        SelectProps={{ autoWidth: true, displayEmpty: true, defaultOpen: true }}
                                        {...params}
                                        variant="standard"
                                        label="Customer"
                                    />}
                                />
                                <TextField
                                    fullWidth
                                    type={"number"}
                                    margin="dense"
                                    id="amount"
                                    label="Amount"
                                    variant="standard"
                                    value={amount}
                                    onChange={(event) => { setAmount(event.target.value) }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
                    <Button type='submit' variant='contained' onClick={handleSubmit}>Submit</Button>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
export default ManageBillingsDialog;
