import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SupplierModel from "../../../Models/SupplierModel";
import { suppliersService } from "../../../Services/SuppliersService";
import "./AddSupplier.css";
import { notify } from "../../../Utils/Notify";

function AddSupplier(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<SupplierModel>();

    const navigate = useNavigate();

    async function send(supplier: SupplierModel) {
        try {
            supplier.image = (supplier.image as unknown as FileList)[0];
            await suppliersService.addSupplier(supplier);
            notify.success("Supplier has been added.");
            navigate("/suppliers");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddSupplier">

            <form onSubmit={handleSubmit(send)}>

                <label>Company:</label>
                <input type="text" {...register("company", SupplierModel.companyValidation)} />
                <span className="error">{formState.errors.company?.message}</span>

                <label>Country:</label>
                <input type="text" {...register("country")} />

                <label>City:</label>
                <input type="text" {...register("city")} />

                <label>Address:</label>
                <input type="text" {...register("address")} />

                <label>Phone:</label>
                <input type="text" {...register("phone")} />

                <label>Image:</label>
                <input type="file" {...register("image")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddSupplier;
