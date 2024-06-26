import { VacationModel } from "../../../Models/vacation-model";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import Pagination_ClientSide from "../../PaginationArea/Pagination_ClientSide/Pagination_ClientSide";
import "./VacationList.css";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import FilterVacationsElement from "../../FilterVacationsElement/FilterVacationsElement";
import moment from 'moment'; //manage date better than "new Date()" 
import { useNavigate } from "react-router-dom";



function VacationList(): JSX.Element {
    useTitle("Vacations list");
    const navigate = useNavigate();
    const [allVacations, setAllVacations] = useState<VacationModel[]>([]);
    const [vacationsToDisplayOnCurrentPage, setVacationsToDisplayOnCurrentPage] = useState<VacationModel[]>([]);// 
    const user = useSelector<AppState, UserModel>(state => state.user);
    const [page, setPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 10;
    // for vacations filtering purposes...
    const [filters, setFilters] = useState({ notStarted: false, active: false, likedByCurrentUser: false });
    const [allFilteredVacations, setAllFilteredVacations] = useState<VacationModel[]>([]);

    // Fetching data
    useEffect(() => {
        const fetchVacations = async () => {
            try {
                if (user) {
                    const fetchedVacations = await vacationsService.getAllVacationsWithLikes(user.id);
                    setAllVacations(fetchedVacations);
                    setPage(1); // Reset to first page on new data
                } else {
                    setAllVacations([]);
                }
            } catch (err) {
                notify.error("Error fetching vacations: " + err);
            }
        };

        fetchVacations();
    }, [user]); // Dependencies → re-execute the useEffect to fetch vacations relevant to the current user

    useEffect(() => {
        const filteredVacations = allVacations.filter(vac => {
            const startDate = moment(vac.start_date, 'DD.MM.YYYY').toDate();
            const endDate = moment(vac.end_date, 'DD.MM.YYYY').toDate();
            const now = moment(new Date(), 'DD.MM.YYYY').toDate();
            const isNotStarted = startDate > now;
            const isActive = startDate <= now && endDate >= now;
            const isLiked = vac.isLikedByCurrentUser;

            return (
                (filters.notStarted ? isNotStarted : true) &&
                (filters.active ? isActive : true) &&
                (filters.likedByCurrentUser ? isLiked : true)
            );
        });

        setAllFilteredVacations(filteredVacations);
    }, [allVacations, filters]);

    // Update vacationsToDisplayOnCurrentPage based on allFilteredVacations
    useEffect(() => {
        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setVacationsToDisplayOnCurrentPage(allFilteredVacations.slice(startIndex, endIndex));

    }, [allFilteredVacations, page]);

    const handleFAB = () => {
        try {
            navigate("/vacations/new")

        } catch (error) {
            console.error("An error occurred  when tried to navigate the 'vacations' page ", error);
        }
    };

    return (
        <div className="vacation-list-container">

            <button className="vacations-fab" title="Add Vacation" onClick={handleFAB}>
                +
                <span className="tooltip-text">Add Vacation</span>
            </button>

            {(allVacations.length === 0) && <Spinner />}


            {/* Display the number of filtered results */}
            <div className="filtering-container">
                <h5>Current Results: {allFilteredVacations.length}</h5>
                <FilterVacationsElement onFilterChange={setFilters} />
            </div>

            <br />
            <br />
            <h5 className="filter-no-results">{allFilteredVacations.length === 0 ? "No results were found (filters might be too strict)" : ""}</h5>
            <div className="vacation-card-container">
                {vacationsToDisplayOnCurrentPage.map(vacation => (
                    <VacationCard key={vacation.id} vacation={vacation} />
                ))}

                <br />
                <div className="pagination-container">
                    <Pagination_ClientSide
                        totalCount={allFilteredVacations.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={page}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default VacationList;
