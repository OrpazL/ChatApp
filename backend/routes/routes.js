const router = require('express').Router();

const BASE_URL = '/api';


// IMPORT ROUTES
const usersRoutes = require('./users/users.routes');
usersRoutes(`${BASE_URL}/users`, router);
const groupsRoutes = require('./groups/groups.routes');
groupsRoutes(`${BASE_URL}/groups`, router);
const authRoutes = require('./auth/auth.routes');
authRoutes(`${BASE_URL}/auth`, router);

router.get(`${BASE_URL}/`, (req, res) => {
    res.send(req.session)
});

module.exports = router;