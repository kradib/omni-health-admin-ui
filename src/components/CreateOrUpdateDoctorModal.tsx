import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import Button from "@mui/material/Button";
import { createUser } from "../api/user";
import { useForm } from "react-hook-form";
import FormInput from "./FormInput";

interface CreateOrUpdateDoctorModalProps {
    show: boolean;
    onUpdated: any;
    onClose: any;
    doctor?: any;
}

const CreateOrUpdateDoctorModal: React.FC<CreateOrUpdateDoctorModalProps> = ({
    show,
    onUpdated,
    onClose,
    doctor,
}) => {
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({ mode: "onChange", defaultValues: doctor });

    const [loading, setLoading] = useState(false);

    const handleCreateOrUpdate = async (data: any) => {
        setLoading(true);
        const response = await createUser(data, "doctor");
        setLoading(false);
        onUpdated(response.data.message, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title={"Create Doctor"}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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

export default CreateOrUpdateDoctorModal;
