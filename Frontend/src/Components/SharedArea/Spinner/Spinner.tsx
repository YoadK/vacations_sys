
import loadingSrc from "../../../Assets/images/03-19-26-213_512.gif";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={loadingSrc} />
        </div>
    );
}

export default Spinner;
