import { useState } from "react";
import { categoriesService } from "../../../Services/CategoriesService";
import { notify } from "../../../Utils/Notify";
import "./TotalCategories.css";

function TotalCategories(): JSX.Element {

    const [total, setTotal] = useState<number>(0);

    function showTotal() {
        categoriesService.getTotalCategories()
            .then(total => setTotal(total))
            .catch(err => notify.error(err));
    }

    return (
        <div className="TotalCategories">
            <button onClick={showTotal}>Total Categories: </button>
            <span>{total}</span>
        </div>
    );
}

export default TotalCategories;
