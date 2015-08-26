Template.taskGroup.helpers({
   'tasks': function() {
       var self = this;
       if (!self.length) {
           self = [this];
       }
       return self;
   },
    'day': function() {
        var self = this;
        if (!self.length) {
            self = [this];
        }
		
        var options = {
			month: 'long',
			day: 'numeric'
		};
        return new Date(self[0].deadlineDate).toLocaleDateString("ru", options);
    }
});