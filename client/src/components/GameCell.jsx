import { Grid, Box, useTheme } from "@mui/material";
import { useState } from "react";
import MoveIcon from './common/MoveIcon';

const GameCell = props => {
    const newProps = {};
    for(const key in props)
        if(key !== 'children' && key !== 'idx' && key !== 'state')
            newProps[key] = props[key];

    const theme = useTheme();

    return (
        <Grid item xs={4} {...newProps} onClick={() => props.onClick(props.idx)} sx={() => {
            const sx = {
                paddingY: 10,
                paddingX: 4,
                position: 'relative',
                transition: 'background-color 200ms, transform 200ms',
            };
            if(!props.disabled){
                sx.cursor = 'pointer';
                sx['&:hover'] = {
                    backgroundColor: theme.palette.grey[800]
                };
                sx['&:active'] = {
                    backgroundColor: theme.palette.grey[700],
                    transform: 'scale(1.2)'
                };
            }
            return sx;
        }}>
            <Box 
                position='absolute' 
                top={0} 
                left={0} 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                flexDirection='center' 
                height='100%' 
                width='100%'
                >
                    <MoveIcon sx={{ transform: 'scale(6)' }} state={props.state}/>
            </Box>
        </Grid>
    )
}

export default GameCell;