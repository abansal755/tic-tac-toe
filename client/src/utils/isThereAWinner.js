const isThereAWinner = (grid) => {
    const row1 = grid[0] === grid[1] && grid[1] === grid[2] && grid[0] !== 'none';
    const row2 = grid[3] === grid[4] && grid[4] === grid[5] && grid[3] !== 'none';
    const row3 = grid[6] === grid[7] && grid[7] === grid[8] && grid[6] !== 'none';
    const col1 = grid[0] === grid[3] && grid[3] === grid[6] && grid[0] !== 'none';
    const col2 = grid[1] === grid[4] && grid[4] === grid[7] && grid[1] !== 'none';
    const col3 = grid[2] === grid[5] && grid[5] === grid[8] && grid[2] !== 'none';
    const diag1 = grid[0] === grid[4] && grid[4] === grid[8] && grid[0] !== 'none';
    const diag2 = grid[2] === grid[4] && grid[4] === grid[6] && grid[2] !== 'none';
    return (row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2);
}

export default isThereAWinner;