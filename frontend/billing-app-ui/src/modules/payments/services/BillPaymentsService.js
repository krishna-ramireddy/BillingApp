import * as axios from "axios";
import Constants from '../../../Constants.json'

let requestHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

export default class BillPaymentsService {

    constructor() {
        this.client = null;
        this.api_url = Constants.BACKEND_SERVER_URL;
    }

    init = () => {
        this.client = axios.create({
            baseURL: this.api_url,
            headers: requestHeaders,
        });
        return this.client;
    };

    getBillings = () => {
        return this.init().get("billings");
    }

    getBillingsByStatus = (status) => {
        return this.init().get("billings/status/" + status);
    }

    createBilling = (body) => {
        return this.init().post("billings", body)
    }

    updateBillingStatus = (id, body) => {
        return this.init().put("billings/"+id, body)
    }

    getAllCustomers = () => {
        return this.init().get("customers")
    }
}
