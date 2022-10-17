import { Button, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GameGrid from "../components/GameGrid";
import FindingOpponent from "../components/Online/FindingOpponent";
import GameInfo from "../components/Online/GameInfo";
import { useAuthContext } from "../contexts/AuthContext";
import useSocketHandler from "../hooks/useSocketHandler";
import getInitialGridState from "../utils/getInitialGridState";
import isItDraw from "../utils/isItDraw";
import isThereAWinner from "../utils/isThereAWinner";
import useAudio from '../hooks/useAudio';
import moveMp3 from '../assets/audio/move.mp3';
import gameStartMp3 from '../assets/audio/game-start.mp3';

const Online = () => {
    const { socket } = useAuthContext();
    const [opponent,setOpponent] = useState(null);
    const [grid,setGrid] = useState(getInitialGridState());
    const [isYourTurn,setIsYourTurn] = useState(false);
    const [areYouWinner,setAreYouWinner] = useState(null); // areYouWinner is null => either draw or match is not yet finished
    const [style,setStyle] = useState(null);
    const [isDraw,setIsDraw] = useState(false);
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const history = useHistory();
    const moveAudio = useAudio(moveMp3);
    const gameStartAudio = useAudio(gameStartMp3);

    let opponentStyle;
    if(style === 'cross') opponentStyle = 'circle';
    else opponentStyle = 'cross';

    if(opponent) console.log('Game::',{
        opponent,
        grid,
        isYourTurn,
        areYouWinner,
        style,
        isDraw
    });

    // Initiating game session
    useEffect(() => {
        if(!socket) return;
        socket.emit('game:search:initiate');
    }, [socket]);

    useSocketHandler('game:search:initiate', ({error,opponent,style,yourTurn}) => {
        if(error)
            return console.error(error.message);
        gameStartAudio.playFromStart();
        setOpponent(opponent);
        setStyle(style);
        setIsYourTurn(yourTurn);
        if(document.hidden && window.Notification && Notification.permission === 'granted')
            new Notification(`Game started with ${opponent.username}`);
    }, []);

    // Game move event
    useSocketHandler('game:move', idx => {
        moveAudio.playFromStart();
        setGrid(prev => {
            return [...(prev.slice(0,idx)),opponentStyle,...(prev.slice(idx+1))];
        });
        setIsYourTurn(prev => !prev);
    }, [style]);

    // Game terminate event
    useSocketHandler('game:terminate', () => {
        history.replace('/');
    }, []);

    // play again event
    useSocketHandler('game:replay', ({style,yourTurn}) => {
        console.log('Replay::', {
            style,
            yourTurn
        });
        setGrid(getInitialGridState());
        setIsYourTurn(yourTurn);
        setAreYouWinner(null);
        setStyle(style);
        setIsDraw(false);
    }, []);

    // Checking if there is any winner
    if(areYouWinner === null && isThereAWinner(grid)){
        if(isYourTurn){
            setAreYouWinner(false);
            setIsYourTurn(false);
        }
        else setAreYouWinner(true);
        gameStartAudio.playFromStart();
    }

    // Checking if the game is draw
    if(areYouWinner === null && isItDraw(grid)){
        if(!isDraw){
            setIsDraw(true);
            setIsYourTurn(false);
        }
    }

    const cellClickHandler = (idx) => {
        if(!isYourTurn) return;
        if(grid[idx] !== 'none') return;
        moveAudio.playFromStart();
        setGrid(prev => {
            return [...(prev.slice(0,idx)),style,...(prev.slice(idx+1))];
        });
        setIsYourTurn(prev => !prev);
        socket.emit('game:move', idx);
    }

    const terminateGameHandler = () => {
        socket.emit('game:terminate');
        history.replace('/');
    }

    const playAgainBtnClickHandler = () => {
        socket.emit('game:replay');
    }
    
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' height='100vh' rowSpacing={3}>
            {!opponent && <FindingOpponent/>}
            {opponent && (
                <Fragment>
                    <Grid item>
                        <Typography display='flex' variant="h4" component='span'>
                            vs. {opponent && opponent.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <GameInfo areYouWinner={areYouWinner} isDraw={isDraw} isYourTurn={isYourTurn} style={style} opponentStyle={opponentStyle}/>
                    </Grid>
                    <Grid item>
                        <GameGrid grid={grid} onCellClick={cellClickHandler} disabled={!isYourTurn}/>
                    </Grid>
                    <Grid item>
                        {(areYouWinner !== null || isDraw) && (
                            <Button variant="contained" sx={{ marginRight: 1 }} onClick={playAgainBtnClickHandler}>Play again</Button>
                        )}
                        <Button variant='contained' onClick={() => setIsDialogOpen(true)}>Back</Button>
                        <Dialog open={isDialogOpen}>
                            <DialogTitle>Alert</DialogTitle>
                            <DialogContent>Are you sure you want to abandon the current game?</DialogContent>
                            <DialogActions>
                                <Button onClick={terminateGameHandler}>Yes</Button>
                                <Button onClick={() => setIsDialogOpen(false)}>No</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Fragment>
            )}
        </Grid>
    )
}

export default Online;