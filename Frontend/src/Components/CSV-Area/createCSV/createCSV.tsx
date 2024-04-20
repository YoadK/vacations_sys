import { useSelector } from "react-redux";
import "./createCSV.css";
import UserModel from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { VacationModel } from "../../../Models/vacation-model";
import { vacationsService } from "../../../Services/VacationsService";
import LoginIsNeeded from "../../SharedArea/LoginIsNeeded/LoginIsNeeded";
import useTitle from "../../../Utils/UseTitle";
import downloadFileIcon from "../../../Assets/icons/icons8-inbox-tray-48.png";

export function CreateCSV(): JSX.Element {

    const user = useSelector<AppState, UserModel>(state => state.user);
    const userId = user?.id;
    const isAdmin = (user?.role.toLowerCase() === 'admin');
    useTitle("Vacations | Create CSV Report");



    // Function to convert an array of VacationModel to a CSV string
    function convertToCSV(vacationData: VacationModel[]): string {
        // Define the CSV header
        const headers = ['destination', 'totalLikesCount'];
        const csvLines = [headers.join(',')]; // Start with the header row

        // Add a line for each vacation entry
        vacationData.forEach(vacation => {
            const line = [vacation.destination, vacation.totalLikesCount];
            csvLines.push(line.join(','));
        });

        // Join all lines into a single string, each line separated by a newline character
        return csvLines.join('\n');
    }


    async function generateCSV() {
        // Assuming you have a function to fetch your vacation data
        const vacationData = await vacationsService.getAllVacationsWithLikes(userId);
        const csvString = convertToCSV(vacationData);       
        return csvString;
    }

    async function handleDownload() {
        const csvString = await generateCSV();
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', '/CSV_Reports/vacations.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }




    return (
        <div className="createCSV">
            {isAdmin && (
                <div>
                    <h1>Create CSV Report</h1>
                    <p>Press the button below, to download a CSV report, containing information about Each Destination and its total amount of likes</p>
                    <button onClick={handleDownload}><img className="download-file-icon" src={downloadFileIcon} />Download</button>
                </div>
            )}

            {!isAdmin && (
                <LoginIsNeeded />
            )}
        </div>
    );
}
