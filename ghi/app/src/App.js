import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehicleModelForm from './VehicleModelForm';
import VehicleModelList from './VehicleModelList';
import ManufacturerForm from './ManufacturerForm'
import ManufacturerList from './ManufacturerList'
import AutomobileForm from './AutomobileForm'
import AutomobileList from './AutomobileList'
import SaleRecordForm from './SaleRecordForm';

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
            {/* <Route path="" element={<SaleRecordList />} /> */}
            <Route path="create" element={<SaleRecordForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
