import { Typography } from "@mui/material";
import { Fragment } from "react";
import MoveIcon from "../../components/common/MoveIcon";

const GameInfo = ({areYouWinner,isDraw,isYourTurn,style,opponentStyle}) => {
    return (
        <Typography display='flex' variant="h5" component='span'>
            {areYouWinner === null && !isDraw && isYourTurn && (
                <Fragment>
                    Your turn (<MoveIcon state={style} fontSize='large'/>)
                </Fragment>
            )}
            {areYouWinner === null && !isDraw && !isYourTurn && (
                <Fragment>
                    Opponent's turn (<MoveIcon state={opponentStyle} fontSize='large'/>)
                </Fragment>
            )}
            {areYouWinner === null && isDraw && 'Draw'}
            {areYouWinner === true && (
                <Fragment>
                    You win (<MoveIcon state={style} fontSize='large'/>)
                </Fragment>
            )}
            {areYouWinner === false && (
                <Fragment>
                    You lose (<MoveIcon state={style} fontSize='large'/>)
                </Fragment>
            )}
        </Typography>
    )
}

export default GameInfo;