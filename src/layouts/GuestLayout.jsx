import {Outlet} from "react-router-dom";
import GuestHeader from "../components/GuestHeader.jsx";

const GuestLayout = () => {
    return (
        <>
           <GuestHeader />

           <Outlet />
        </>
    );
};

export default GuestLayout;