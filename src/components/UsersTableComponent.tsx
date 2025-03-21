import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { getUsers } from "../api/user";
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
import UserRowComponent from "./UserRowComponent";
import Toast from "./Toast";
import { IGetUserParams } from "../interface/IGetUserParams";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CreateOrUpdateUserModal from "./CreateOrUpdateUserModal";
import { capitalize } from "../utils/Utils";

const DEFAULT_PAGE_SIZE = 10;

interface UsersTableComponentProps {
    title: string;
    role: string;
    headersToFieldMap: any;
}

const UsersTableComponent: React.FC<UsersTableComponentProps> = ({
    title,
    role,
    headersToFieldMap,
}) => {
    const [isUserListEmpty, setIsUserListEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLimit, setPageLimit] = useState(0);
    const [userParams, setUserParams] = useState<IGetUserParams>({
        name: "",
        page: 0,
        size: DEFAULT_PAGE_SIZE,
        roles: role,
    });

    const [userList, setUserList] = useState([]);

    const [showCreateUserModal, setShowCreateUserModal] = useState(false);

    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
    const [userSelected, setUserSelected] = useState<any>(undefined);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const getUserList = async () => {
        setLoading(true);
        const response = await getUsers(userParams);
        setLoading(false);
        let usrList = [];
        if (response.success) {
            usrList = response.data?.data.userDetailWithRole;
        }
        if (!usrList || usrList.length === 0) {
            setIsUserListEmpty(true);
            return;
        }
        setIsUserListEmpty(false);
        setPageLimit(response.data?.data.totalPages);
        setUserList(usrList);
    };

    useEffect(() => {
        getUserList();
    }, [userParams]);

    const handleUserCreated = (
        message: string,
        severity: "success" | "error"
    ) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        setShowCreateUserModal(false);
        setShowUpdateUserModal(false);
        getUserList();
    };

    const searchAndFilter = () => {
        return (
            <>
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                >
                    <TextField
                        id="userName"
                        label="Search by name"
                        onChange={(e) =>
                            setUserParams({
                                ...userParams,
                                name: e.target.value,
                            })
                        }
                        variant="outlined"
                        value={userParams.name}
                    />

                    {createUserComponent()}
                </Stack>
            </>
        );
    };

    const userTable = () => {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="appointments">
                        <TableHead>
                            <TableRow sx={{ fontWeight: "bold" }}>
                                {Object.keys(headersToFieldMap).map((header: any) => (
                                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                                        {header}
                                    </TableCell>
                                ))}
                                <TableCell key="view" sx={{ fontWeight: "bold" }}>
                                    View/ Edit
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((user: any) => (
                                <UserRowComponent
                                    key={user.userDetail.id}
                                    user={user.userDetail}
                                    headerToFieldMap={headersToFieldMap}
                                    onEditClick={(user: any) => {
                                        setUserSelected(user);
                                        setShowUpdateUserModal(true);
                                    }}
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
                            setUserParams({ ...userParams, page: page - 1 })
                        }
                    />
                </Box>
            </>
        );
    };

    const noUsersMessage = () => {
        return (
            <>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no {role} for the search parameters
                </Typography>
            </>
        );
    };

    const usersTableComponent = () => {
        return (
            <>
                <Stack spacing={2}>
                    {searchAndFilter()}
                    {isUserListEmpty ? noUsersMessage() : userTable()}
                </Stack>
            </>
        );
    };

    const createUserComponent = () => (
        <>
            <Button
                variant="contained"
                onClick={() => setShowCreateUserModal(true)}
                startIcon={<AddIcon />}
            >
                Create {capitalize(role)}
            </Button>
            {showCreateUserModal && (
                <CreateOrUpdateUserModal
                    show={showCreateUserModal}
                    onClose={() => setShowCreateUserModal(false)}
                    onUpdated={handleUserCreated}
                    role={role}
                    mode="create"
                />
            )}
        </>
    );

    const updateUserComponent = () => (
        <>
            {showUpdateUserModal && (
                <CreateOrUpdateUserModal
                    show={showUpdateUserModal}
                    onClose={() => setShowUpdateUserModal(false)}
                    onUpdated={handleUserCreated}
                    role={role}
                    user={userSelected}
                    mode="update"
                />
            )}
        </>
    );

    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {title}
            </Typography>
            <LoadingComponent isLoading={loading} />
            {usersTableComponent()}
            {updateUserComponent()}

            <Toast
                open={openToast}
                severity={toastSeverity}
                message={toastMessage}
                onClose={() => setOpenToast(false)}
            />
        </>
    );
};

export default UsersTableComponent;
