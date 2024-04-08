import React, { useEffect, useState } from "react";
//@ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { vacationsService } from "../../../Services/VacationsService"; // Adjust the import path as necessary
import UserModel from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { useSelector } from "react-redux";

function ViewReports(): JSX.Element {
    const [chartData, setChartData] = useState([]);
    const user = useSelector<AppState, UserModel>(state => state.user);

    const userId = user.id;
    
    useEffect(() => {
        const fetchVacations = async () => {
            try {
                // Assuming you want to use the method that gets all vacations with likes
                const allVacationsWithLikes = await vacationsService.getAllVacationsWithLikes(userId);

                // Transform the fetched data to match the chart's dataPoints format
                const dataPoints = allVacationsWithLikes.map(vacation => ({
                    label: vacation.destination, // Adjust based on actual property names
                    y: vacation.totalLikesCount // Adjust based on actual property names
                }));

                setChartData(dataPoints);
            } catch (error) {
                console.error("Error fetching vacations:", error);
            }
        };

        fetchVacations();
    }, []); // Dependency array is empty, so this effect runs only once when the component mounts

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"        
        title: {
            text: 'Vacation  countries vs Likes : Chart'
        },
        legend: {
            horizontalAlign: "left", // "center" , "right"
            verticalAlign: "center",  // "top" , "bottom"
            fontSize: 15
          },
        data: [
            {
                type: 'column', // Or any other type suitable for your data
                indexLabelFontColor: "white",
                indexLabelPlacement: "outside",
                showInLegend: true,
                legendText: "Number of likes for each country",
                dataPoints: chartData
            }
        ]
    };

    return (
        <div className="ViewReports">
            <h2>Vacation Reports</h2>
            <CanvasJSReact.CanvasJSChart options={options} />
        </div>
    );
}

export default ViewReports;
