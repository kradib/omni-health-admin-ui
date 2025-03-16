import AppointmentsTableComponent from "../components/AppointmentsTableComponent";
import { APPOINTMENT_MODE_OWN } from "../Constants";

const Appointments = () => {
    return (
        <>
            <AppointmentsTableComponent
                mode={APPOINTMENT_MODE_OWN}
                title="Appointments"
            />
        </>
    );
};

export default Appointments;
