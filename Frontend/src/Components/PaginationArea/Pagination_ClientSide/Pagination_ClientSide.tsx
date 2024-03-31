import "./Pagination_ClientSide.css";
import { Pagination, Stack } from "@mui/material";


type PaginationComponentProps = {
    totalCount: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;};


function Pagination_ClientSide({totalCount,itemsPerPage,currentPage,onPageChange} : PaginationComponentProps): JSX.Element {
    
    return (

        <div>           

            <Stack spacing={2} className="pagination-container">
                <Pagination
                    count={Math.ceil(totalCount / itemsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => onPageChange(page)}
                    color="primary"
                    variant="outlined"
                />
            </Stack>
        </div>
    );
}

export default Pagination_ClientSide;
