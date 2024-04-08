import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import AddSupplier from "../../SuppliersArea/AddSupplier/AddSupplier";
import SupplierDetails from "../../SuppliersArea/SupplierDetails/SupplierDetails";
import SupplierList from "../../SuppliersArea/SupplierList/SupplierList";
import Page404 from "../page404/page404";
import "./Routing.css";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import ViewReports from "../../ReportsArea/ViewReports/ViewReports";
import { CreateCSV } from "../../CSV-Area/createCSV/createCSV";

function Routing(): JSX.Element {





    return (

       

            <Routes>

                {/* Home: */}
                <Route path="/home" element={<Home/>} />

                {/* Products: */}
                <Route path="/products" element={<ProductList />} />

                {/* Product Details: */}
                <Route path="/products/details/:id" element={<ProductDetails />} />

                {/* Add Product: */}
                <Route path="/products/new" element={<AddProduct />} />

                {/* Edit Product: */}
                <Route path="/products/edit/${userId}" element={<EditProduct />} />

                {/* Suppliers: */}
                <Route path="/suppliers" element={<SupplierList />} />

                {/* Add Supplier: */}
                <Route path="/suppliers/new" element={<AddSupplier />} />

                {/* Supplier Details: */}
                <Route path="/suppliers/details/:id" element={<SupplierDetails />} />

                {/* vacations: */}
                <Route path="/vacations" element={<VacationList />} />

                  {/* Add a Vacation */}
                  <Route path="/vacations/new" element={<AddVacation />} />

                {/* Edit a Vacation */}
                <Route path="/vacations/edit/:id" element={<EditVacation />} />


                {/* About: */}
                <Route path="/about" element={<About />} />

                {/* Register: */}
                <Route path="/register" element={<Register />} />

                {/* Login: */}
                <Route path="/login" element={<Login />} />

                 {/* Reports: */}
                 <Route path="/viewReports" element={<ViewReports />} />

                  {/* create CSV file: */}
                  <Route path="/create-csv-file" element={<CreateCSV />} />

                {/* Default Route: */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found route: */}
                <Route path="*" element={<Page404 />} />

            </Routes>

    );
}

export default Routing;
