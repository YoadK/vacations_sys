import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import "./AddProduct.css";
import { notify } from "../../../Utils/Notify";

function AddProduct(): JSX.Element {

    const { register, handleSubmit } = useForm<ProductModel>();

    const navigate = useNavigate();
    
    async function send(product: ProductModel) {
        try {
            // Extract first image from FileList into product.image:
            product.image = (product.image as unknown as FileList)[0];

            // Send product to backend:
            await productsService.addProduct(product);
            
            notify.success("Product has been added.");
            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min={0} max={1000} />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" {...register("image")} required />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddProduct;
