import { Button, Grid, Typography } from "@mui/material";
import { useAuthContext } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import useSocketHandler from "../hooks/useSocketHandler";

const Home = () => {
    const { username, socket } = useAuthContext();
	const [numOnlinePlayers,setNumOnlinePlayers] = useState(null);

	useEffect(() => {
		if(!socket) return;
		socket.emit('stats');
	}, [socket]);

	useSocketHandler('stats', count => {
		setNumOnlinePlayers(count);
	}, []);
    
    return (
        <Grid container direction='column' alignItems='center' justifyContent='center' height='100vh' rowSpacing={1}>
			<Grid item>
                <Typography variant="h5" component='span'>
					Your username: {username}
				</Typography>
            </Grid>
			<Grid item>
                <Typography variant="h6" component='span'>
					{numOnlinePlayers} players online
				</Typography>
            </Grid>
            <Grid item>
				<Button variant="contained" component={Link} to='/local' replace>Play multiplayer locally</Button>
			</Grid>
			<Grid item>
				<Button variant="contained" component={Link} to='/online' replace>Play multiplayer online</Button>
			</Grid>
		</Grid>
    )
}

export default Home;