Template.themeSettings.helpers({
    'themes': function() {
        return Themes.find().fetch();
    }
});

Template.themeSettings.events({
    "click #addTheme": function(event, template){
         event.preventDefault();
         event.stopPropagation();

         template.$(".form-inline").removeClass('hide');
    },
    "click #save": function(event, template){
         event.preventDefault();
         event.stopPropagation();

         var theme = {
             name : template.$("#inputName").val(),
         };

         if (theme.name.length == 0)
            return false;

         Themes.insert(theme);

         template.$("#inputName").val('')
         template.$(".form-inline").addClass('hide');
    }
});
