import { Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import useTitle from "../../../Utils/UseTitle";
import "./About.css";
import { ContactMail } from "@mui/icons-material";

function About(): JSX.Element {

    // Custom Hook:
    useTitle("Vacations | About us");

    return (
        <div className="About">

            <Typography variant="h3">
                About Us
                &nbsp;
                <ContactMail fontSize="large" />
            </Typography>

            <form>

                <TextField label="Name" type="text" className="text-box" />

                <TextField label="Email" type="email" className="text-box" />

                <TextField label="Message" type="text" className="text-box" />

                <FormControlLabel control={<Checkbox />} label="Send me promotional emails." />

                <ButtonGroup fullWidth variant="contained">
                    <Button color="primary">Send</Button>
                    <Button color="secondary" type="reset">Clear</Button>
                </ButtonGroup>




            </form>
            
            




        </div>
    );
}

export default About;
