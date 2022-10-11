import { Button, Grid } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';

const Home = () => {
    const { username } = useAuthContext();
    
    return (
        <Grid container direction='column' alignItems='center' justifyContent='center' height='100vh' rowSpacing={1}>
			<Grid item>
                Your username: {username}
            </Grid>
            <Grid item>
				<Button variant="contained" component={Link} to='/local' replace>Play multiplayer locally</Button>
			</Grid>
			<Grid item>
				<Button variant="contained" component={Link} to='/online' replace>Play multiplayer online</Button>
			</Grid>
            <Grid item>
				<Button variant="contained">Invite a friend</Button>
			</Grid>
		</Grid>
    )
}

export default Home;