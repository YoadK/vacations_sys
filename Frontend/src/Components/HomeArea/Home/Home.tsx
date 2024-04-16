import "./Home.css";
import useTitle from "../../../Utils/UseTitle";


function Home(): JSX.Element {

    // Custom Hook:
    useTitle("Vacation  | Vacations Home");


    return (
      
            <div className="Home">
                <div className="background-image-container">
                 <img  src="../../../../public/Assets/images/brown-glass-bottle-beside-white-book-on-blue-and-white-textile-oj0zeY2Ltk4.jpg" alt=""></img>
                </div>
                <p>Welcome to our little slice of paradise! Whether you're seeking sun-soaked beaches, mountain adventures, or cultural escapes, we've got you covered. Let the relaxation begin!</p>
                
                
            </div>
        

    );

}

export default Home;
