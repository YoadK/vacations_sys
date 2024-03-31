import { useEffect, useState } from "react";
import "./FilterVacationsElement.css";

type VacationsFilterProps = {
    onFilterChange: (filter: { notStarted: boolean; active: boolean; likedByCurrentUser: boolean }) => void;
};


function VacationsFilter({ onFilterChange }: VacationsFilterProps): JSX.Element {
    const [notStarted, setNotStarted] = useState(false);
    const [active, setActive] = useState(false);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

    // Use useEffect to call onFilterChange when filter states change
    useEffect(() => {
        onFilterChange({ notStarted, active, likedByCurrentUser });
    }, [notStarted, active, likedByCurrentUser, onFilterChange]);

    return (
        <div className="vacations-filter">
            <label>
                <input
                    type="checkbox"
                    checked={notStarted}
                    onChange={e => setNotStarted(e.target.checked)}
                />
                Not Started
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                />
                Active
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={likedByCurrentUser}
                    onChange={e => setLikedByCurrentUser(e.target.checked)}
                />
                Liked
            </label>
        </div>
    );
}

export default VacationsFilter;
