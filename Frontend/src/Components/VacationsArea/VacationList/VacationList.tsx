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
import LoginIsNeeded from "../../SharedArea/LoginIsNeeded/LoginIsNeeded";



function VacationList(): JSX.Element {
   
    const navigate = useNavigate();
    const [allVacations, setAllVacations] = useState<VacationModel[]>([]);
    const [vacationsToDisplayOnCurrentPage, setVacationsToDisplayOnCurrentPage] = useState<VacationModel[]>([]);// 
    const user = useSelector<AppState, UserModel>(state => state.user);
    const [page, setPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 10;
    // for vacations filtering purposes...
    const [filters, setFilters] = useState({ notStarted: false, active: false, likedByCurrentUser: false });
    const [allFilteredVacations, setAllFilteredVacations] = useState<VacationModel[]>([]);
    // spinner active when isloading===true
    const [isLoading, setIsLoading] = useState(false);
    useTitle("Vacations | View Vacation List");

    // Fetching data
    useEffect(() => {
        const fetchVacations = async () => {
            setIsLoading(true);
            try {
                if (user) {
                    
                    const fetchedVacations = await vacationsService.getAllVacationsWithLikes(user.id);
                    setAllVacations(fetchedVacations);
                    setPage(1); // Reset to first page on new data
                } else {
                    notify.error("You must be logged in to view vacations.");
                    setAllVacations([]);
                    return;
                }
            } catch (err) {
                notify.error("An Error occured while fetching vacations:  " + err);
            }
            finally {
                setIsLoading(false); // End loading
            }
        };

        fetchVacations();
    }, [user]); // Dependencies → re-execute the useEffect to fetch vacations relevant to the current user


    // Filtering vacations logic
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

    const handleAddVacationFAB = () => {
        try {
            navigate("/vacations/new")

        } catch (error) {
            console.error("An error occurred  when tried to navigate the 'vacations' page ", error);
        }
    };

    //updating current vacations list when card-deletion occurs
    const handleVacationDeleted = (deletedVacationId: number) => {
        setAllVacations(allVacations.filter(vacation => vacation.id !== deletedVacationId));
    };

    const handleVacationLikeStatusChange = (updatedVacation: VacationModel) => {
        setAllVacations(prevVacations =>
            prevVacations.map(vacation =>
                vacation.id === updatedVacation.id ? updatedVacation : vacation
            )
        );
    };

    return (
        <div className="vacation-list-container">
            {user ? (
                <>
                    {(user.role.toLowerCase() === "admin") && (
                        <button className="vacations-fab" title="Add Vacation" onClick={handleAddVacationFAB}>
                            +<span className="tooltip-text">Add Vacation</span>
                        </button>
                    )}

                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            {/* Display the number of filtered results */}
                            <div className="filtering-container">
                                <h5>Current Results: {allFilteredVacations.length}</h5>
                                <FilterVacationsElement onFilterChange={setFilters} />
                            </div>

                            <br />
                            <br />
                            <h5 className="filter-no-results">
                                {allFilteredVacations.length === 0
                                    ? "No results were found (filters might be too strict)"
                                    : ""}
                            </h5>
                            <div className="vacation-card-container">
                                {vacationsToDisplayOnCurrentPage.map(vacation => (
                                    <VacationCard key={vacation.id} vacation={vacation} onDelete={handleVacationDeleted} onLikeStatusChange={handleVacationLikeStatusChange} />
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
                        </>
                    )}
                </>
            ) : (
                <LoginIsNeeded />
            )}
        </div>
    );

}

export default VacationList;
