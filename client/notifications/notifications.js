Template.notifications.helpers({
    'notifications': function () {
        var notifications = localStorage.getItem('notifications');
        if (notifications) {
            localStorage.setItem('notifications', null)
            return JSON.parse(notifications)
        } else {
            return Notifications.find({viewed: 0});
        }
    }
})
