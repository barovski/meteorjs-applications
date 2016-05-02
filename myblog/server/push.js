/* ----------------------------------------------------------
 * NOTE: meteor add cordova:cordova-plugin-device@1.1.1
 * -------------------------------------------------------- */

Push.debug = true;

Push.allow({
    send: function(userId, notification) {
        return true; // Allow all users to send
    }
});

Push.addListener('token', function(token) {
    alert(JSON.stringify(token));
});

Meteor.methods({
    serverNotification: function(text,title) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                text:text,
                // historyId: result
            },
            query: {
                // this will send to all users
            }
        });
        console.log('sending');
    },
    userNotification: function(text,title,userId) {
        var badge = 1
        Push.send({
            from: 'push',
            title: title,
            text: text,
            badge: badge,
            sound: 'airhorn.caf',
            payload: {
                title: title,
                // historyId: result
            },
            query: {
                userId: userId //this will send to a specific Meteor.user()._id
            }
        });
    },
});
