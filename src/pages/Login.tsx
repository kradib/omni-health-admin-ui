import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState } from "react";
import { AUTH_TOKEN_KEY, RouteConstants, USER_DETAILS_KEY } from "../Constants";
import { signinUser } from "../api/user";
import { useNavigate } from "react-router";
import Toast from "../components/Toast";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";

const saveTokenAndUserDetailsToLocalStorage = (
    token: string,
    userDetails: object
) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(userDetails));
};

const Login = () => {
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange" });

    const [loading, setLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );
    const navigate = useNavigate();

    const handleLogin = async (data: any) => {
        setLoading(true);
        const response = await signinUser(
            data.username,
            data.password,
            data.masterKey
        );
        setLoading(false);

        if (response.success) {
            // Set bearer token
            const token = response.data.authToken;
            const userDetails = response.data.userDetail;
            saveTokenAndUserDetailsToLocalStorage(token, userDetails);
            navigate(`/${RouteConstants.APPOINTMENT_ROUTE}`);
            return;
        }
        setToastMessage(response.data);
        setToastSeverity(response.success ? "success" : "error");
        setOpenToast(true);
    };

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "98vh",
                        p: 1,
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h4">Admin Login</Typography>
                        <Typography variant="subtitle1">
                            Login with your admin credentials
                        </Typography>

                        <FormInput
                            control={control}
                            rules={{ required: "Username is required" }}
                            name="username"
                            label="Username"
                        />

                        <FormInput
                            control={control}
                            rules={{ required: "Password is required" }}
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <FormInput
                            control={control}
                            rules={{ required: "Master Key is required" }}
                            name="masterKey"
                            label="Master Key"
                            type="password"
                        />

                        <Button
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleSubmit(handleLogin)}
                            size="large"
                            loading={loading}
                        >
                            Sign In
                        </Button>
                    </Stack>

                    <Toast
                        open={openToast}
                        severity={toastSeverity}
                        message={toastMessage}
                        onClose={handleCloseSnackbar}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Login;
