const mongoService = require('../mongo.service');
const usersService = require('../users/users.service');

module.exports = {
    login,
    signup
};

async function login({ username, password }) {
    const user = (await usersService.query({ username }))[0];
    if (user && user.password === password) return { user };
    return { error: `Wrong password` };
}

async function signup(user) {
    return await usersService.create(user);
}