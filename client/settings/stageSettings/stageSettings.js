Template.stageSettings.helpers({
    'stages': function() {
        return Stages.find().fetch();
    },
    'stepsNumbers': function() {
        var stages = Stages.find().fetch();

        var steps = [];
        steps.push({step: stages.length + 1});

        return steps;
    }
});

Template.stageSettings.events({
    "click #addStage": function(event, template){
         event.preventDefault();
         event.stopPropagation();

         $(".form-inline").removeClass('hide');
    },
    "click #save": function(event, template){
         event.preventDefault();
         event.stopPropagation();

         var stage = {
             name :$("#inputName").val(),
             step : $("#inputStep").val()
         };

         Stages.insert(stage);

         $("#inputName").val('')
         $(".form-inline").addClass('hide');
    }
});
