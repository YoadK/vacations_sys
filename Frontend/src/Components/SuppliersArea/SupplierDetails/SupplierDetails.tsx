import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierModel from "../../../Models/SupplierModel";
import { suppliersService } from "../../../Services/SuppliersService";
import "./SupplierDetails.css";
import { notify } from "../../../Utils/Notify";

function SupplierDetails(): JSX.Element {

    const [supplier, setSupplier] = useState<SupplierModel>(new SupplierModel());

    const params = useParams();

    useEffect(() => {
        const id = +params.id;
        suppliersService.getOneSupplier(id)
            .then(supplier => setSupplier(supplier))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="SupplierDetails">
			<h3>{supplier.company}</h3>
			<h3>Country: {supplier.country}</h3>
			<h3>City: {supplier.city}</h3>
			<h3>Address: {supplier.address}</h3>
			<h3>Phone: {supplier.phone}</h3>
            <img src={supplier.imageUrl} />
        </div>
    );
}

export default SupplierDetails;
