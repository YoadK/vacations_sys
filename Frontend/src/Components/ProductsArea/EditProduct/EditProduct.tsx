import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import "./EditProduct.css";
import { notify } from "../../../Utils/Notify";

function EditProduct(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<ProductModel>();
    const navigate = useNavigate();
    const params = useParams();

    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        productsService.getOneProduct(+params.id)
            .then(product => {
                setValue("name", product.name); // Initial value
                setValue("price", product.price); // Initial value
                setValue("stock", product.stock); // Initial value
                setImageUrl(product.imageUrl); // Initial value
            })
            .catch(err => notify.error(err));
    }, []);

    async function send(product: ProductModel) {
        try {
            // Extract first image from FileList into product.image:
            product.image = (product.image as unknown as FileList)[0];

            // Set the id:
            product.id = +params.id;

            // Send product to backend:
            await productsService.updateProduct(product);

            notify.success("Product has been updated.");

            navigate("/products");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditProduct">

            <form onSubmit={handleSubmit(send)}>

                <label>Name: </label>
                <input type="text" {...register("name")} required minLength={2} maxLength={50} />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price")} required min={0} max={1000} />

                <label>Stock: </label>
                <input type="number" {...register("stock")} required min={0} max={1000} />

                <label>Image: </label>
                <input type="file" {...register("image")} />

                <img className="thumbnail" src={imageUrl} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditProduct;
