const fs = require('fs/promises');
const path = require('path');

const _getContents = async (names,dir) => {
    const contents = await fs.readdir(dir, { withFileTypes: true });
    for(const dirent of contents){
        if(dirent.isFile()) names.push(path.join(dir,dirent.name));
        else await _getContents(names,path.join(dir,dirent.name));
    }
}
const getContents = async dir => {
    const names = [];
    await _getContents(names,dir);
    return names;
}

module.exports = getContents;