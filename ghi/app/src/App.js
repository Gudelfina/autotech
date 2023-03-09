import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import AutomobileList from './AutomobileList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentHistory from './AppointmentHistory';
import AutomobileForm from './AutomobileForm'
import AutomobileList from './AutomobileList'
import SaleRecordForm from './SaleRecordForm';
import SaleRecordList from './SaleRecordList';
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalesPersonList from './SalesPersonList';
import TechnicianForm from './TechnicianForm';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import AppointmentHistory from './AppointmentHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturer/">
            <Route path="" element={<ManufacturerList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="/vehicle-model/">
            <Route path="" element={<VehicleModelList />} />
            <Route path="create" element={<VehicleModelForm />} />
          </Route>
          <Route path="/automobile/">
            <Route path="" element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="/sale-record/">
            <Route path="" element={<SaleRecordList />} />
            <Route path="create" element={<SaleRecordForm />} />
          </Route>
          <Route path="/customer/">
            <Route path="" element={<CustomerList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="/sales-person/">
            <Route path="" element={<SalesPersonList />} />
            <Route path="create" element={<SalesPersonForm />} />
          </Route>
          <Route path="create-technician" element={<TechnicianForm />} />
          <Route path="/appointment/">
              <Route path="" element={<AppointmentList />} />
              <Route path="history" element={<AppointmentHistory />} />
              <Route path="create" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
