import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import "./TotalProducts.css";

function TotalProducts(): JSX.Element {

    const count = useSelector((appState: AppState) => appState.products.length);

    if (!count) return null;

    return (
        <div className="TotalProducts">
            <span>Total Products: {count}</span>
        </div>
    );
}

export default TotalProducts;
