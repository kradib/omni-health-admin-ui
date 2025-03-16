import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from 'react';

interface DoctorRowComponentProps {
    doctor: any;
}

const DoctorRowComponent: React.FC<DoctorRowComponentProps> = ({ doctor }) => {
    return (
        <>
            <TableRow
                key={doctor.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
                <TableCell>{`${doctor.major}`}</TableCell>
                <TableCell>{`${doctor.location}`}</TableCell>
                <TableCell>
                    <IconButton onClick={() => console.log("doc")}>
                        <VisibilityIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}

export default DoctorRowComponent
