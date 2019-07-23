const groupsService = require('../groups/groups.service');

module.exports = (io, socket) => {

    // on new msg
    socket.on('newChatMsg', async ({ msg, groupId }) => {
        await groupsService.update(groupId, {}, { $push: { history: msg } });
        io.to(groupId).emit('gotNewChatMsg', msg);
    });

    // on join user group
    socket.on('joinUserToGroup', async ({ user, groupId }) => {
        const iUser = { _id: user._id, role: 'standard' };
        await groupsService.update(groupId, {}, { $push: { users: iUser } });
        io.to(groupId).emit('newUserJoined', user);
    });

    // on user exits group
    socket.on('removeUserFromGroup', async ({ user, groupId }) => {
        const updateObj = {
            $set: {
                users: {
                    $pull: {
                        _id: user._id
                    }
                }
            }
        };
        await groupsService.update(groupId, {}, updateObj);
        io.to(groupId).emit('userLeftTheGroup', user);
    });

    //

}