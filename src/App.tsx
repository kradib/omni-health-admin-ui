import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { RouteConstants } from "./Constants";
import PublicRoute from "./components/PublicRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import ProtectedRoute from "./components/ProtectedRoute";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={RouteConstants.LOGIN_ROUTE} />}
        />
        <Route
          path={RouteConstants.LOGIN_ROUTE}
          element={<PublicRoute element={<Login />} />}
        />
        <Route
          path={RouteConstants.APPOINTMENT_ROUTE}
          element={
            <ProtectedRoute title="Appointments" element={<Appointments />} />
          }
        />
        <Route
          path={RouteConstants.DOCTOR_ROUTE}
          element={
            <ProtectedRoute title="Doctors" element={<Doctors />} />
          }
        />
        <Route
          path={RouteConstants.PATIENT_ROUTE}
          element={
            <ProtectedRoute title="Patients" element={<Patients />} />
          }
        />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
