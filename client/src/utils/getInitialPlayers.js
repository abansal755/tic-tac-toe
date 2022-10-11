const getInititalPlayers = () => {
    const players = ['cross','cross'];
    const idx = Math.floor(Math.random() * 2);
    players[idx] = 'circle';
    return players;
};

export default getInititalPlayers;