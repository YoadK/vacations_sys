import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { productsService } from "../../../Services/ProductsService";
import "./ProductDetails.css";
import { notify } from "../../../Utils/Notify";

function ProductDetails(): JSX.Element {

    // Hook for reading route parameters: 
    const params = useParams();

    const navigate = useNavigate();
        
    // Product state: 
    const [product, setProduct] = useState<ProductModel>();
    
    useEffect(()=>{
        const id = +params.id; // Read route parameter named id.
        productsService.getOneProduct(id)
            .then(product => setProduct(product))
            .catch(err => notify.error(err));
    }, []);

    async function deleteMe() {
        try {
            // ask the user to confirm...
            const sure = window.confirm("Are you sure?");
            if(!sure) return;

            await productsService.deleteProduct(product.id);
            notify.success("Product has been deleted.");
            navigate("/products");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="ProductDetails">

			<h3>Name: {product?.name}</h3>
			<h3>Price: {product?.price}</h3>
			<h3>Stock: {product?.stock}</h3>
            <img src={product?.imageUrl} />
            <br /> <br />

            <NavLink to="/products">Back</NavLink>
            <span> | </span>
            <NavLink to={"/products/edit/" + product?.id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>
            
        </div>
    );
}

export default ProductDetails;
