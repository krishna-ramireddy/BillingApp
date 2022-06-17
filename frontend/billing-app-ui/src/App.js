
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import Layout from './modules/core/Layout';
import BillingsAdminPage from './modules/payments/components/BillingsAdminPage';
import ManageBillPayments from './modules/payments/components/ManageBillPayments';
import PaymentPage from './modules/payments/components/PaymentPage';

function App() {
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  return (
    <Layout>
      <Routes>
        {isAuth && <Fragment>
          <Route path="billings/manage" element={<ManageBillPayments />} />
          <Route path="admin/manage/billings" element={<BillingsAdminPage />} />
          <Route path='billings/payment' element={<PaymentPage />} />
        </Fragment>}
      </Routes>
    </Layout>
  );
}

export default App;
