module.exports = (fn) => {
    return async (...args) => {
        try {
            await fn(...args);
        }
        catch(err){
            console.error(err);
        }
    }
}