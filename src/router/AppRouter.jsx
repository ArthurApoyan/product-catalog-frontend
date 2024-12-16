import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import useAccessToken from "../hooks/useAccessToken.js";
import DefaultLayout from "../layouts/DefaultLayout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import Products from "../pages/Products.jsx";
import SignUp from "../pages/SignUp.jsx";
import SignIn from "../pages/SignIn.jsx";
import Bag from "../pages/Bag.jsx";
import {setBagQTY} from "../store/features/products/productsSlice/productsSlice.js";

const AppRouter = () => {

    const isAuth = useAccessToken();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const quantities = JSON.parse(localStorage.getItem("productsQty"));
        if (quantities) {
            const qty = Object.values(quantities).reduce((acc, item) => {
                acc += item;
                return acc;
            }, 0)
            dispatch(setBagQTY(qty));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (location.pathname !== "/signIn" && location.pathname !== "/signUp") {
            const token = localStorage.getItem('ACCESS_TOKEN');
            if (!token) {
                navigate("/signIn");
            }
        }
    }, [location.pathname, navigate]);

    return (
        <Routes>
            {
                isAuth ? (
                    <Route element={<DefaultLayout />}>
                        <Route path="/products" element={<Products />}/>
                        <Route path="/bag" element={<Bag />}/>
                    </Route>
                ) : (
                    <Route element={<GuestLayout />}>
                        <Route path="/" element={<Navigate to="/signIn" />} />
                        <Route path="/signUp" element={<SignUp />}/>
                        <Route path="/signIn" element={<SignIn />}/>
                    </Route>
                )
            }
        </Routes>
    );
};

export default AppRouter;