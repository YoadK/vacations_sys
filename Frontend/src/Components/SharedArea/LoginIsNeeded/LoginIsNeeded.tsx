import { useNavigate } from "react-router-dom";
import "./LoginIsNeeded.css";

function LoginIsNeeded(): JSX.Element {

    const navigate = useNavigate();
    
    return (
        <div className="LoginIsNeeded">			
                    Please <button onClick={() => navigate('/login')}>login here</button> to use this feature. <br/>
                    If you're not registered, please <button onClick={() => navigate('/register')}>register here</button>
               
        </div>
    );
}

export default LoginIsNeeded;
