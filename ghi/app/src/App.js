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
            {/* <Route path="create" element={<AutomobileForm />} /> */}
          </Route>
          <Route path="/appointment/">
              <Route path="" element={<AppointmentList />} />
              <Route path="create" element={<AppointmentForm />} />
          </Route>
          <Route path="create-technician" element={<TechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
