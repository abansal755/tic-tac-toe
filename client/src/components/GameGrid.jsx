import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GameCell from "./GameCell";

const GameGrid = ({ grid, onCellClick, disabled }) => {
    const theme = useTheme();

    return (
        <Grid container>
            <GameCell idx={0}  onClick ={onCellClick} state={grid[0]} disabled={disabled || grid[0] !== 'none'}></GameCell>
            <GameCell idx={1}  onClick ={onCellClick} state={grid[1]} disabled={disabled || grid[1] !== 'none'} borderLeft={4} borderRight={4} borderColor={theme.palette.primary.light}></GameCell>
            <GameCell idx={2}  onClick ={onCellClick} state={grid[2]} disabled={disabled || grid[2] !== 'none'}></GameCell>
            <GameCell idx={3}  onClick ={onCellClick} state={grid[3]} disabled={disabled || grid[3] !== 'none'} borderTop={4} borderBottom={4} borderColor={theme.palette.primary.light}></GameCell>
            <GameCell idx={4}  onClick ={onCellClick} state={grid[4]} disabled={disabled || grid[4] !== 'none'} borderLeft={4} borderRight={4} borderTop={4} borderBottom={4} borderColor={theme.palette.primary.light}></GameCell>
            <GameCell idx={5}  onClick ={onCellClick} state={grid[5]} disabled={disabled || grid[5] !== 'none'} borderTop={4} borderBottom={4} borderColor={theme.palette.primary.light}></GameCell>
            <GameCell idx={6}  onClick ={onCellClick} state={grid[6]} disabled={disabled || grid[6] !== 'none'}></GameCell>
            <GameCell idx={7}  onClick ={onCellClick} state={grid[7]} disabled={disabled || grid[7] !== 'none'} borderLeft={4} borderRight={4} borderColor={theme.palette.primary.light}></GameCell>
            <GameCell idx={8}  onClick ={onCellClick} state={grid[8]} disabled={disabled || grid[8] !== 'none'}></GameCell>
        </Grid>
    )
}

export default GameGrid;