import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { getDoctors } from "../api/doctor";
import LoadingComponent from "./LoadingComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DoctorRowComponent from "./DoctorRowComponent";
import Toast from "./Toast";
import { IGetDoctorParams } from "../interface/IGetDoctorParams";
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";

const DEFAULT_PAGE_SIZE = 10;

const TABLE_HEADERS = ["Name", "Specialization", "Location", "View"];

const DoctorsTableComponent = ({ title }: { title: string }) => {
    const [isDoctorListEmpty, setIsDoctorListEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLimit, setPageLimit] = useState(0);
    const [doctorParams, setDoctorParams] = useState<IGetDoctorParams>({
        name: "",
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
    });

    const [doctorList, setDoctorList] = useState([]);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const getDoctorList = async () => {
        setLoading(true);
        const response = await getDoctors(doctorParams);
        setLoading(false);
        let docList = [];
        if (response.success) {
            docList = response.data?.data.doctorDetails;
        }
        if (!docList || docList.length === 0) {
            setIsDoctorListEmpty(true);
            return;
        }
        setIsDoctorListEmpty(false);
        setPageLimit(response.data?.data.totalPages);
        setDoctorList(docList);
    };

    useEffect(() => {
        getDoctorList();
    }, [doctorParams]);

    const searchAndFilter = () => {
        return (
            <>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                >
                    <TextField
                        id="doctorName"
                        label="Search by name"
                        onChange={(e) =>
                            setDoctorParams({
                                ...doctorParams,
                                name: e.target.value,
                            })
                        }
                        variant="outlined"
                        value={doctorParams.name}
                    />

                    <Button
                        variant="contained"
                        onClick={() => console.log("Create")}
                        startIcon={<AddIcon />}
                    >
                        Create Doctor
                    </Button>
                </Stack >
            </>
        );
    };

    const doctorTable = () => {
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
                            {doctorList.map((doctor: any) => (
                                <DoctorRowComponent key={doctor.id} doctor={doctor} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ justifyItems: "center" }}>
                    <Pagination
                        count={pageLimit}
                        color="primary"
                        onChange={(_event, page) =>
                            setDoctorParams({ ...doctorParams, page: page - 1 })
                        }
                    />
                </Box>
            </>
        );
    };

    const noDoctorsMessage = () => {
        return (
            <>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no appointments for the selected dates
                </Typography>
            </>
        );
    };

    const doctorsTableComponent = () => {
        return (
            <>
                <Stack spacing={2}>
                    {searchAndFilter()}
                    {isDoctorListEmpty ? noDoctorsMessage() : doctorTable()}
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
            {doctorsTableComponent()}

            <Toast
                open={openToast}
                severity={toastSeverity}
                message={toastMessage}
                onClose={() => setOpenToast(false)}
            />
        </>
    );
};

export default DoctorsTableComponent;
