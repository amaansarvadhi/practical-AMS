import { useEffect } from "react";
import {
  Department,
  Hospital,
  Users,
  setItem,
} from "./Services/LocalStorageManager";
import { HospitalConstants } from "./Constants/hospitalConstants";
import { DepartmentConstant } from "./Constants/departmentConstants";
import { UsersConstants } from "./Constants/userConstants";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Appointments from "./Pages/Appointments";
import PageNotFound from "./PageNotFound";
import NewAppointment from "./Pages/Appointments/NewAppointment";

function App() {
  const dataFiller = () => {
    setItem(Hospital, HospitalConstants);
    setItem(Department, DepartmentConstant);
    setItem(Users, UsersConstants);
  };

  useEffect(() => {
    dataFiller();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Appointments />} />
          <Route path="/newAppointment" element={<NewAppointment />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
