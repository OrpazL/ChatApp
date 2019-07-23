const groupsService = require('../../services/groups/groups.service');

// BASE URL = /groups
function groupsRoutes(BASE_URL, router) {

    // query
    router.get(`${BASE_URL}/:id?`, async (req, res) => {
        const filter = req.query;
        const { id } = req.params;
        if (id) filter._id = id;
        const groups = await groupsService.query(filter);
        res.status(200).send(groups);
    });

    // create
    router.post(`${BASE_URL}`, async (req, res) => {
        const group = req.body;

        // set creator as admin
        const { user } = req.session;
        const iUser = { _id: user._id, role: 'admin' };
        group.users = [iUser]
        group.admins = [user._id];

        const result = await groupsService.create(group);
        if (result.error) {
            res.status(403).send(result.error).end();
            return;
        }
        res.status(201).send(result);
    });

    // update
    router.put(`${BASE_URL}/:_id?`, async (req, res) => {
        const { _id } = req.params;
        const selectors = req.query;
        const newData = req.body;

        // handle bad request
        if (!_id && !Object.keys(selectors).length) {
            res.status(400).send('No id provided!').end();
            return;
        }

        const result = await groupsService.update(_id, selectors, newData);
        if (typeof result !== 'number') {
            res.status(403).send(result.error).end();
            return;
        }
        res.status(200).send(`Modified Count: ${result}`);
    });

    // delete
    router.delete(`${BASE_URL}/:_id?`, async (req, res) => {
        const { _id } = req.params;
        const reqIds = req.body;

        // handle bad request
        if (!_id && !reqIds.length) {
            res.status(400).send('No id provided!').end();
            return;
        }

        // handle delete of array of ids
        const idsArr = [...reqIds];
        if (_id) idsArr.push(_id);

        let resultsSum = 0;
        for (let i = 0; i < idsArr.length; i++) {
            const result = await groupsService.delete(idsArr[i]);
            resultsSum += result.n;
        }

        if (resultsSum) {
            res.status(200).send(`${resultsSum} items found and were deleted.`).end();
            return;
        }
        res.status(418).send(`nothing to delete.`);
    });

}

module.exports = groupsRoutes;