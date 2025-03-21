import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import Button from "@mui/material/Button";
import { createUser, updateUser } from "../api/user";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import dayjs from "dayjs";
import { capitalize } from "../utils/Utils";

interface CreateOrUpdateUserModalProps {
    show: boolean;
    onUpdated: any;
    onClose: any;
    role: string;
    user?: any;
    mode: string;
}

const CreateOrUpdateUserModal: React.FC<CreateOrUpdateUserModalProps> = ({
    show,
    onUpdated,
    onClose,
    role,
    user,
    mode,
}) => {
    const isCreateMode = mode == "create";

    const defaultUser = user
        ? {
            ...user,
            dateOfBirth: dayjs(user.dateOfBirth),
        }
        : user;

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange", defaultValues: defaultUser });

    const [loading, setLoading] = useState(false);

    const handleCreateOrUpdate = async (data: any) => {
        let response;

        setLoading(true);
        if (isCreateMode) {
            response = await createUser(data, role);
        } else {
            response = await updateUser(data, role, data.id);
        }
        setLoading(false);
        onUpdated(response.data.message, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title={`${capitalize(mode)} ${capitalize(role)}`}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {isCreateMode && (
                    <>
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
                    </>
                )}

                <FormInput
                    control={control}
                    rules={{ required: "First name is required" }}
                    name="firstName"
                    label="First Name"
                />

                <FormInput
                    control={control}
                    rules={{ required: "Last name is required" }}
                    name="lastName"
                    label="Last Name"
                />

                <FormInput
                    control={control}
                    rules={{
                        required: "Email id is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    }}
                    name="email"
                    label="Email ID"
                />

                <FormInput
                    control={control}
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            value: /^\+?[1-9]\d{1,14}$/,
                            message: "Invalid phone number format",
                        },
                        minLength: {
                            value: 10,
                            message: "Phone number must be at least 10 digits",
                        },
                        maxLength: {
                            value: 15,
                            message: "Phone number must be at most 15 digits",
                        },
                    }}
                    name="phoneNumber"
                    label="Phone Number"
                />

                <FormInput
                    control={control}
                    rules={{ required: "Date of Birth is required" }}
                    name="dateOfBirth"
                    label="Date Of Birth"
                    type="date"
                    disabled={!isCreateMode}
                />

                <FormInput
                    control={control}
                    rules={{ required: "Specialization is required" }}
                    name="major"
                    label="Specialization"
                />

                <FormInput
                    control={control}
                    rules={{ required: "Location is required" }}
                    name="location"
                    label="Location"
                />

                <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={handleSubmit(handleCreateOrUpdate)}
                    size="large"
                    loading={loading}
                >
                    Submit
                </Button>
            </ModalComponent>
        </>
    );
};

export default CreateOrUpdateUserModal;
