Template.index.helpers({
    'messages': function () {
        return Messages.find({}, {sort: {date:-1}});
    }
})
