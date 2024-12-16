import {Outlet} from "react-router-dom";
import GuestHeader from "src/components/GuestHeader.jsx";

const GuestLayout = () => {
    return (
        <>
           <GuestHeader />

           <Outlet />
        </>
    );
};

export default GuestLayout;