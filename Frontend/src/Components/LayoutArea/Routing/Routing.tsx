import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Home from "../../HomeArea/Home/Home";
import Page404 from "../page404/page404";
import "./Routing.css";

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
