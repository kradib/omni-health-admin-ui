import UsersTableComponent from "../components/UsersTableComponent";

const TABLE_HEADERS = {
    Name: (user: any) => `${user.firstName} ${user.lastName}`,
    Specialization: (user: any) => `${user.major}`,
    Location: (user: any) => `${user.location}`
};

const Doctors = () => {
    return (
        <>
            <UsersTableComponent
                title="Doctors"
                role="doctor"
                headersToFieldMap={TABLE_HEADERS}
            />
        </>
    );
};

export default Doctors;
