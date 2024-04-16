import { useNavigate } from "react-router-dom";
import "./LoginIsNeeded.css";
import { useEffect, useState } from "react";

function LoginIsNeeded(): JSX.Element {

    const navigate = useNavigate();
    const [pageName, setPageName] = useState("");  // Initialize as an empty string

    useEffect(() => {
        setPageName(document.title);  // This will set the pageName to the current document title
    }, []);


    return (
        <div className="LoginIsNeeded">
            <h1> {pageName}</h1>
            Please <button onClick={() => navigate('/login')}>login here</button> to use this feature. <br />
            If you're not registered, please <button onClick={() => navigate('/register')}>register here</button>

        </div>
    );
}

export default LoginIsNeeded;
