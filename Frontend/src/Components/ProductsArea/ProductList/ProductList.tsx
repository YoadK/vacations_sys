import { useEffect, useState } from "react";
import { productsService } from "../../../Services/ProductsService";
import useTitle from "../../../Utils/UseTitle";
import "./ProductList.css";
import ProductModel from "../../../Models/ProductModel";
import ProductCard from "../ProductCard/ProductCard";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { notify } from "../../../Utils/Notify";

function ProductList(): JSX.Element {

    // Products state: 
    const [products, setProducts] = useState<ProductModel[]>([]);

    // Custom Hook:
    useTitle("Northwind Products");

    useEffect(() => {
        productsService.getAllProducts()
            .then(products => setProducts(products))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="ProductList">

            {products.length === 0 && <Spinner />}

            {products.map(p => <ProductCard key={p.id} product={p} />)}

        </div>
    );
}

export default ProductList;
