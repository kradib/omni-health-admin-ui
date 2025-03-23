import React, { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import LoadingComponent from "./LoadingComponent";
import { getAppointment } from "../api/appointment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { DoctorIcon } from "../icons/DoctorIcon";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import { getAppointmentStatus } from "../utils/Utils";

interface ViewAppointmentModalProps {
    show: boolean;
    appointmentId: number;
    handleClose: any;
}

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({
    show,
    appointmentId,
    handleClose,
}) => {
    const [appointment, setAppointment] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getAppointmentDetails = async () => {
        setLoading(true);
        const response = await getAppointment(appointmentId);
        setLoading(false);

        if (response.success) {
            setErrorMessage(null);
            setAppointment(response.data?.data.appointmentSchedule);
        } else {
            setErrorMessage("Error fetching appointment details");
        }
    };

    useEffect(() => {
        getAppointmentDetails();
    }, []);

    const title = `Appointment Details`;

    return (
        <>
            <ModalComponent open={show} onClose={handleClose} title={title}>
                {loading && <LoadingComponent isLoading={loading} />}
                {errorMessage && (
                    <Typography variant="h4" sx={{ color: "red" }}>
                        {errorMessage}
                    </Typography>
                )}

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <PersonOutlineOutlinedIcon />
                    <Typography variant="body1">{`${appointment.userDetail?.firstName} ${appointment.userDetail?.lastName}`}</Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <FemaleOutlinedIcon />
                    <Typography variant="body1">{`${appointment.userDetail?.gender}`}</Typography>
                </Stack>


                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <DoctorIcon />
                    <Typography variant="body1">{`${appointment.doctorDetail?.firstName} ${appointment.doctorDetail?.lastName}`}</Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center", mb: 1 }}
                    direction="row"
                    spacing={2}
                >
                    <CalendarMonthIcon />
                    <Typography variant="body1">
                        {dayjs(appointment.appointmentDateTime).format(
                            "dddd, D MMMM, YYYY"
                        )}
                    </Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <AccessTimeIcon />
                    <Typography variant="body1">
                        {dayjs(appointment.appointmentDateTime).format("h:mm A")}
                    </Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <LocationOnOutlinedIcon />
                    <Typography variant="body1">
                        {appointment.doctorDetail?.location}
                    </Typography>
                </Stack>

                <Stack
                    sx={{ justifyContent: "left", alignItems: "center" }}
                    direction="row"
                    spacing={2}
                >
                    <AutorenewOutlinedIcon />
                    <Typography variant="body1">
                        {getAppointmentStatus(appointment)}
                    </Typography>
                </Stack>
            </ModalComponent>
        </>
    );
};

export default ViewAppointmentModal;
