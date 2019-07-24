const authService = require('../../services/auth/auth.service');

// BASE URL = /auth
function authRoutes(BASE_URL, router) {

    // login
    router.post(`${BASE_URL}`, async (req, res) => {
        if (req.session.user) {
            res.status(418).end('user is already logged in, please log out first');
            return;
        }
        const userAuth = req.body;
        const { user, error } = await authService.login(userAuth);
        if (user) {
            req.session.user = user;
            res.json(user);
        } else {
            res.status(401).end(error);
        }
    });

    //logout
    router.put(`${BASE_URL}/logout`, (req, res) => {
        if (req.session.user) {
            res.status(200).end(`${req.session.user.username} logged out successfully.`);
            req.session.destroy();
        } else {
            res.status(404).end(`User is not connected.`)
        }
    });

    // signup
    router.post(`${BASE_URL}/signup`, async (req, res) => {
        const user = req.body;
        const result = await authService.signup(user);
        if (result.error) {
            res.status(403).end(result.error);
            return;
        }
        res.status(201).send(result);
        await authService.login(user);
    });
}

module.exports = authRoutes;