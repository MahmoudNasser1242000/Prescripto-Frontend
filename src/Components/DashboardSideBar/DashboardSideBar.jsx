import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import {
    HiAdjustments,
    HiChartPie,
    HiClock,
    HiOutlineClipboardList,
    HiOutlineDocumentAdd,
    HiOutlineLogin,
    HiSearch,
    HiUsers,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function DashBoardSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const navigate = useNavigate()

    const actions = [
        { icon: <HiChartPie />, name: 'Dashboard', to: "/" },
        { icon: <HiOutlineClipboardList />, name: 'Doctors List', to: "/dashboard" },
        { icon: <HiOutlineDocumentAdd />, name: 'Add Doctors', to: "/dashboard" },
        { icon: <HiUsers />, name: 'Users List', to: "/dashboard" },
        { icon: <HiClock />, name: 'Appointments', to: "/dashboard" },
        { icon: <HiOutlineLogin />, name: 'Signout', to: "/dashboard" },
    ];
    return (
        <>
            {/* <button className="rounded-full size-14 flex fixed right-8 bottom-8 justify-center items-center bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50" onClick={() => setIsOpen(true)}>
                <HiAdjustments className="text-2xl" />
            </button> */}
            <Box onClick={() => setIsOpen(true)}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'fixed', bottom: 50, right: 40 }}
                    icon={<HiAdjustments className="text-2xl" />}
                >
                    {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                className="size-12"
                                onClick={() => navigate(action.to)}
                            />
                    ))}
                </SpeedDial>
            </Box>
            <Drawer open={isOpen} onClose={handleClose}>
                <Drawer.Header className="text-start" title="Admin Dashboard" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                                </form>
                                <Sidebar.Items className="h-full pb-60">
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item icon={HiChartPie}>
                                            <Link to={"/dashboard"}>Dashboard</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item icon={HiOutlineClipboardList}>
                                            <Link to={"/dashboard"}>Doctors List</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item icon={HiOutlineDocumentAdd}>
                                            <Link to={"/dashboard"}>Add Doctors</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item icon={HiUsers}>
                                            <Link to={"/dashboard"}>Users List</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item icon={HiClock}>
                                            <Link to={"/dashboard"}>Appointments</Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item icon={HiOutlineLogin}>
                                            Signout
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </div>
                        </div>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    );
}

export default DashBoardSideBar;