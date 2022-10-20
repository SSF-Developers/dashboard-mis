import auth from "./auth";
import { useEffect } from "react";


const Logout = () => {

    auth.logout();
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);

        });
    }, [])

    return window.location.href = "/";
}
export default Logout