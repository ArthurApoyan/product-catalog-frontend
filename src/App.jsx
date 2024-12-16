import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import {Toast} from "./components/Toast.jsx";
import {useEffect} from "react";

function App() {

  useEffect(() => {
      const bagProductsIds = JSON.parse(localStorage.getItem("bagProductsIds"));

      if (!bagProductsIds) {
          localStorage.setItem("bagProductsIds", JSON.stringify([]));
      }
  }, [])

  return (
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider>
                <Toast />
                <AppRouter />
            </ChakraProvider>
        </BrowserRouter>
    </Provider>
  )
}

export default App
