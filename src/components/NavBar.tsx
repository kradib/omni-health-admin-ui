import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { AUTH_TOKEN_KEY, RouteConstants } from "../Constants";
import { useNavigate } from "react-router";
import { getUserDetailFromLocalStorage } from "../utils/Utils";
import { useState } from "react";
import { DoctorIcon } from "../icons/DoctorIcon";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const drawerWidth = 300;

const NavBar = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        navigate(`/${RouteConstants.LOGIN_ROUTE}`);
    };

    const navigateToPage = (route: string) => {
        navigate(`/${route}`);
        handleDrawerToggle();
    };

    const userDetails = getUserDetailFromLocalStorage();

    const drawer = (
        <div>
            <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                <Toolbar sx={{ p: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="h5">Omni Health</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                alt="User"
                                src="https://img.freepik.com/premium-photo/profile-icon-white-background_941097-160810.jpg?w=740"
                                sx={{ width: 56, height: 56 }}
                            />
                            <Stack
                                spacing={0}
                                sx={{
                                    alignItems: "left",
                                }}
                            >
                                <Typography variant="h6">{`${userDetails.firstName} ${userDetails.lastName}`}</Typography>
                                <Typography variant="body2">{userDetails.email}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Toolbar>

                <List sx={{ flexGrow: 1 }}>
                    <ListItem key="general">
                        <Typography variant="subtitle2">General</Typography>
                    </ListItem>

                    <ListItem key="appointment" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigateToPage(RouteConstants.APPOINTMENT_ROUTE);
                            }}
                        >
                            <ListItemIcon>
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Appointments" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="doctors" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigateToPage(RouteConstants.DOCTOR_ROUTE);
                            }}
                        >
                            <ListItemIcon>
                                <DoctorIcon />
                            </ListItemIcon>
                            <ListItemText primary="Doctors" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="patients" disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigateToPage(RouteConstants.PATIENT_ROUTE);
                            }}
                        >
                            <ListItemIcon>
                                <PersonOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Patients" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Box>
                    <ListItem key="logout" disablePadding>
                        <ListItemButton sx={{ color: "red" }} onClick={logout}>
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: "red" }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Box>
        </div>
    );

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                borderRadius: "0px 20px 20px 0",
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default NavBar;
