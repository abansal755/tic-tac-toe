const isItDraw = (grid) => {
    for(const cell of grid){
        if(cell === 'none') return false;
    }
    return true;
}

export default isItDraw;