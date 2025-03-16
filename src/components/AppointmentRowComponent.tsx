import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import React, { useState } from "react";
import ViewAppointmentModal from "./ViewAppointmentModal";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { cancelAppointment } from "../api/appointment";
import { getAppointmentStatus } from "../utils/Utils";
import { EDITABLE_APPOINT_STATUS } from "../Constants";
interface IAppointmentRowComponentProps {
    appointment: any;
    onCancel?: any;
    onReschedule?: any;
}

const AppointmentRowComponent: React.FC<IAppointmentRowComponentProps> = ({
    appointment,
    onCancel,
}) => {
    const appointmentStatus = getAppointmentStatus(appointment);
    const [showViewModal, setShowViewModal] = useState(false);
    const [cancellationConfirmation, setCancellationConfirmation] =
        useState(false);

    const viewModal = () => {
        return (
            <ViewAppointmentModal
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                appointmentId={appointment.id}
            />
        );
    };

    const handleCancel = async () => {
        const response = await cancelAppointment(appointment.id);
        onCancel(response.data, response.success ? "success" : "error");
        setCancellationConfirmation(false);
    };

    const handleCancellationClose = () => {
        setCancellationConfirmation(false);
    };

    const cancellationConfirmationDialog = () => {
        return (
            <Dialog
                open={cancellationConfirmation}
                onClose={handleCancellationClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel your appointment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancellationClose}>No</Button>
                    <Button onClick={handleCancel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
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
                <TableCell>{appointmentStatus}</TableCell>

                <TableCell>
                    <IconButton onClick={() => setShowViewModal(true)}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>

                <TableCell>
                    <IconButton
                        disabled={!EDITABLE_APPOINT_STATUS.includes(appointmentStatus)}
                        sx={{ color: "red" }}
                        onClick={() => setCancellationConfirmation(true)}
                    >
                        <CloseIcon />
                    </IconButton>
                </TableCell>
            </TableRow>

            {showViewModal && viewModal()}
            {cancellationConfirmationDialog()}
        </>
    );
};

export default AppointmentRowComponent;
