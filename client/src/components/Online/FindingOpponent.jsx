import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const FindingOpponent = () => {
    const {socket} = useAuthContext();
    const history = useHistory();
    
    const cancelBtnClickHandler = () => {
        socket.emit('game:search:terminate');
        history.push('/');
    }

    return (
        (
            <Fragment>
                <Grid item>
                    <Typography variant="h4" component='span'>
                        Looking for an opponent
                    </Typography>
                </Grid>
                <Grid item>
                    <CircularProgress/>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={cancelBtnClickHandler}>Cancel</Button>
                </Grid>
            </Fragment>
        )
    )
}

export default FindingOpponent;