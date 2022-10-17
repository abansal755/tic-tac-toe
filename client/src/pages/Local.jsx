import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MoveIcon from "../components/common/MoveIcon";
import GameGrid from "../components/GameGrid";
import isItDraw from "../utils/isItDraw";
import isThereAWinner from "../utils/isThereAWinner";
import getInitialGridState from "../utils/getInitialGridState";
import getInititalPlayers from "../utils/getInitialPlayers";
import useAudio from '../hooks/useAudio';
import moveMp3 from '../assets/audio/move.mp3';

const Local = () => {
    const [grid,setGrid] = useState(getInitialGridState);
    const [players,setPlayers] = useState(getInititalPlayers);
    const [currentPlayer,setCurrentPlayer] = useState(0);
    const [winner,setWinner] = useState(null);
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const moveAudio = useAudio(moveMp3);

    if(isThereAWinner(grid)){
        if(currentPlayer !== -1) {
            setWinner((currentPlayer + 1) % 2);
            setCurrentPlayer(-1);
        }
    }
    if(isItDraw(grid)){
        if(currentPlayer !== -1){
            setCurrentPlayer(-1);
        }
    }

    const cellClickHandler = (idx) => {
        if(currentPlayer === -1) return;
        if(grid[idx] !== 'none') return;
        setGrid(prev => {
            return [...(prev.slice(0,idx)), players[currentPlayer], ...(prev.slice(idx + 1))];
        });
        setCurrentPlayer(curr => (curr + 1) % 2);
        moveAudio.playFromStart();
    }

    const playAgainBtnClickHandler = () => {
        setGrid(getInitialGridState());
        setPlayers(getInititalPlayers());
        setCurrentPlayer(0);
        setWinner(null);
    }

    console.log('Game::', {
        grid,
        players,
        currentPlayer,
        winner
    });
    
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' height='100vh' rowSpacing={3}>
            <Grid item>
                <Typography display='flex' variant="h4" component='span'>
                    {currentPlayer !== -1 && (
                        <Fragment>
                            Player{currentPlayer}'s chance
                            (<MoveIcon state={players[currentPlayer]} fontSize='large'/>)
                        </Fragment>
                    )}
                    {currentPlayer === -1 && winner !== null && (
                        <Fragment>
                            Player{winner} (<MoveIcon state={players[winner]} fontSize='large'/>) wins
                        </Fragment>
                    )}
                    {currentPlayer === -1 && winner === null && 'Draw'}
                </Typography>
            </Grid>
            <Grid item>
                <GameGrid grid={grid} onCellClick={cellClickHandler} disabled={currentPlayer === -1}/>
            </Grid>
            <Grid item>
                {currentPlayer === -1 && <Button variant='contained' onClick={playAgainBtnClickHandler} sx={{marginRight: 1}}>Play again</Button>}
                <Button variant="contained" onClick={() => setIsDialogOpen(true)} 
                    {...(() => {
                        const props = {};
                        if(currentPlayer === -1){
                            props.component = Link;
                            props.to = '/';
                        };
                        return props;
                    })()}>Back</Button>
                {currentPlayer !== -1 && (
                    <Dialog open={isDialogOpen}>
                        <DialogTitle>Alert</DialogTitle>
                        <DialogContent>Are you sure you want to abandon the current game?</DialogContent>
                        <DialogActions>
                            <Button component={Link} to='/' replace>Yes</Button>
                            <Button onClick={() => setIsDialogOpen(false)}>No</Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Grid>
        </Grid>
    )
}

export default Local;