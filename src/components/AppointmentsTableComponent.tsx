import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { getAppointments } from "../api/appointment";
import LoadingComponent from "./LoadingComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { APPOINTMENT_STATUS_OPTIONS, DATE_TIME_FORMAT } from "../Constants";
import dayjs from "dayjs";
import { IGetAppointmentsParams } from "../interface/IGetAppointmentsParams";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AppointmentRowComponent from "./AppointmentRowComponent";
import Toast from "./Toast";

const DEFAULT_PAGE_SIZE = 10;

const TABLE_HEADERS = ["Patient", "Doctor", "Slot", "Status", "View", "Cancel"];

const AppointmentsTableComponent = ({
    title,
    mode,
}: {
    title: string;
    mode: string;
}) => {
    const [isAppointmentListEmpty, setIsAppointmentListEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLimit, setPageLimit] = useState(0);
    const [appointmentParams, setAppointmentParams] =
        useState<IGetAppointmentsParams>({
            status: undefined,
            page: 0,
            size: DEFAULT_PAGE_SIZE,
        });

    const [appointmentList, setAppointmentList] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const getAppointmentList = async () => {
        setLoading(true);
        const response = await getAppointments(appointmentParams, mode);
        setLoading(false);
        let appointmentList = [];
        if (response.success) {
            appointmentList = response.data?.data.appointments;
        }
        if (!appointmentList || appointmentList.length === 0) {
            setIsAppointmentListEmpty(true);
            return;
        }
        setIsAppointmentListEmpty(false);
        setPageLimit(response.data?.data.totalPages);
        setAppointmentList(appointmentList);
    };

    const handleAppointmentCancelled = (
        message: string,
        severity: "success" | "error"
    ) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        getAppointmentList();
    };

    useEffect(() => {
        getAppointmentList();
    }, [appointmentParams]);

    const searchAndFilter = () => {
        return (
            <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={2} direction="row">
                        <DateTimePicker
                            label="Start Date & Time"
                            value={
                                appointmentParams.startDate
                                    ? dayjs(appointmentParams.startDate, DATE_TIME_FORMAT)
                                    : null
                            }
                            onChange={(newValue) =>
                                setAppointmentParams({
                                    ...appointmentParams,
                                    startDate: newValue
                                        ? newValue.format(DATE_TIME_FORMAT)
                                        : dayjs().format(DATE_TIME_FORMAT),
                                })
                            }
                        />

                        <DateTimePicker
                            label="End Date & Time"
                            value={
                                appointmentParams.endDate
                                    ? dayjs(appointmentParams.endDate, DATE_TIME_FORMAT)
                                    : null
                            }
                            onChange={(newValue) =>
                                setAppointmentParams({
                                    ...appointmentParams,
                                    endDate: newValue
                                        ? newValue.format(DATE_TIME_FORMAT)
                                        : dayjs().format(DATE_TIME_FORMAT),
                                })
                            }
                            minDateTime={dayjs(appointmentParams.startDate, DATE_TIME_FORMAT)} // Prevent end date from being before start date
                        />

                        <Autocomplete
                            options={APPOINTMENT_STATUS_OPTIONS}
                            onChange={(_, newValue) => {
                                if (newValue?.toLocaleLowerCase() == "all") {
                                    setAppointmentParams({
                                        ...appointmentParams,
                                        status: undefined,
                                    });
                                    return;
                                }
                                setAppointmentParams({
                                    ...appointmentParams,
                                    status: newValue || undefined,
                                });
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label={"Status"} variant="outlined" />
                            )}
                            sx={{ width: "10%", maxWidth: 500 }}
                            value={appointmentParams.status}
                        />
                    </Stack>
                </LocalizationProvider>
            </>
        );
    };

    const appointmentTable = () => {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="appointments">
                        <TableHead>
                            <TableRow sx={{ fontWeight: "bold" }}>
                                {TABLE_HEADERS.map((header) => (
                                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointmentList.map((appointment: any) => (
                                <AppointmentRowComponent
                                    key={appointment.id}
                                    appointment={appointment}
                                    onCancel={handleAppointmentCancelled}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ justifyItems: "center" }}>
                    <Pagination
                        count={pageLimit}
                        color="primary"
                        onChange={(_event, page) =>
                            setAppointmentParams({ ...appointmentParams, page: page - 1 })
                        }
                    />
                </Box>
            </>
        );
    };

    const noAppointmentsMessage = () => {
        return (
            <>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no appointments for the selected dates
                </Typography>
            </>
        );
    };

    const appointmentsTableComponent = () => {
        return (
            <>
                <Stack spacing={2}>
                    {searchAndFilter()}
                    {isAppointmentListEmpty
                        ? noAppointmentsMessage()
                        : appointmentTable()}
                </Stack>
            </>
        );
    };

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <LoadingComponent isLoading={loading} />
            {appointmentsTableComponent()}
            <Toast
                open={openToast}
                severity={toastSeverity}
                message={toastMessage}
                onClose={() => setOpenToast(false)}
            />
        </>
    );
};

export default AppointmentsTableComponent;
