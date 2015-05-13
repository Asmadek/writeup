Template.measureSettings.helpers({
    'measures': function() {
        return Measures.find({companyId: this._id}).fetch();
    }
});