import {Outlet} from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader.jsx";

const DefaultLayout = () => {
    return (
        <>
           <DefaultHeader />

           <Outlet />
        </>
    );
};

export default DefaultLayout;