

export const StatusRoute = {
    path: '/platform/status',
    method: 'GET',
    handler: function (req, reply) {
        reply({success: true, message: 'All platforms worked'});
    }
};