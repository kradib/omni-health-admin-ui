import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import React, { useState } from "react";
import ViewAppointmentModal from "./ViewAppointmentModal";

interface IAppointmentRowComponentProps {
    appointment: any;
    onCancel?: any;
    onReschedule?: any;
}

const AppointmentRowComponent: React.FC<IAppointmentRowComponentProps> = ({
    appointment,
}) => {
    const [showViewModal, setShowViewModal] = useState(false);

    const viewModal = () => {
        return (
            <ViewAppointmentModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                appointmentId={appointment.id}
            />
        );
    };

    return (
        <>
            <TableRow
                key={appointment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{`${appointment.userDetail?.firstName} ${appointment.userDetail?.lastName}`}</TableCell>
                <TableCell>{`${appointment.doctorDetail.firstName} ${appointment.doctorDetail.lastName}`}</TableCell>
                <TableCell>
                    {dayjs(appointment.appointmentDateTime).format(
                        "dddd, D MMMM, YYYY HH:mm"
                    )}
                </TableCell>
                <TableCell>{appointment.appointmentStatus}</TableCell>

                <TableCell>
                    <IconButton onClick={() => setShowViewModal(true)}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton
                        sx={{ color: "red" }}
                        onClick={() => console.log(appointment.id)}
                    >
                        <CloseIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {showViewModal && viewModal()}
        </>
    );
};

export default AppointmentRowComponent;
