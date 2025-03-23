import dayjs from "dayjs";
import UsersTableComponent from "../components/UsersTableComponent";

const TABLE_HEADERS = {
    Name: (user: any) => `${user.firstName} ${user.lastName}`,
    Gender: (user: any) => `${user.gender}`,
    "Blood Group": (user: any) => `${user.bloodGroup}`,
    "Age (years)": (user: any) =>
        `${dayjs().diff(dayjs(user.dateOfBirth), "year")}`,
};

const Patients = () => {
    return (
        <>
            <UsersTableComponent
                title="Patients"
                role="patient"
                headersToFieldMap={TABLE_HEADERS}
            />
        </>
    );
};

export default Patients;
