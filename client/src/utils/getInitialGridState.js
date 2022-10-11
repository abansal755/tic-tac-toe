const getInitialGridState = () => {
    const gridInitState = [];
    for(let i = 0; i < 9; i++)
        gridInitState[i] = 'none';
    return gridInitState;
};

export default getInitialGridState;