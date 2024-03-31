import { useEffect, useState } from "react";
import "./SupplierList.css";
import { suppliersService } from "../../../Services/SuppliersService";
import SupplierModel from "../../../Models/SupplierModel";
import { NavLink } from "react-router-dom";
import { notify } from "../../../Utils/Notify";

function SupplierList(): JSX.Element {

    const [suppliers, setSuppliers] = useState<SupplierModel[]>([]);

    useEffect(() => {
        suppliersService.getAllSuppliers()
            .then(suppliers => setSuppliers(suppliers))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="SupplierList">

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(s =>
                        <tr key={s.id}>
                            <td>
                                {/* אתגר: לבצע את הקישור על שורה שלמה */}
                                <NavLink to={"/suppliers/details/" + s.id}>
                                    {s.company}
                                </NavLink>
                            </td>
                            <td>{s.country}</td>
                            <td>{s.city}</td>
                            <td>{s.address}</td>
                            <td>{s.phone}</td>
                            <td>
                                <img src={s.imageUrl} className="rounded-circle" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default SupplierList;
