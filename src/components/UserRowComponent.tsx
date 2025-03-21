import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React from "react";

interface UserRowComponentProps {
    user: any;
    headerToFieldMap: any;
    onEditClick: any;
}

const UserRowComponent: React.FC<UserRowComponentProps> = ({
    user,
    headerToFieldMap,
    onEditClick,
}) => {
    return (
        <>
            <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
                {Object.keys(headerToFieldMap).map((key) => {
                    return <TableCell>{headerToFieldMap[key](user)}</TableCell>;
                })}
                <TableCell>
                    <IconButton onClick={() => onEditClick(user)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
};

export default UserRowComponent;
