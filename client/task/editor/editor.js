Template.editor.events({
	'input .wysiwyg': function (event, template) {
		var text = template.$('.wysiwyg').text();
		Tasks.update({_id: template.data._id}, {$set: {value: text.length}});

		var html = template.$('.wysiwyg').html();

		Session.set('text', html);
		Session.set('textId', template.data._id);
	},
	'focusout .wysiwyg': function (event, template) {
		console.log(1);
	}
})

Template.editor.onRendered(function () {
	var editor = new MediumEditor('.text-editor', {
	    delay: 1000,
	    targetBlank: true,
	    toolbar: {
	        buttons: ['bold', 'italic', 'quote'],
	        diffLeft: 25,
	        diffTop: 10,
	    },
	    anchor: {
	        placeholderText: 'Type a link',
	        customClassOption: 'btn',
	        customClassOptionText: 'Create Button'
	    },
		paste: {
	        forcePlainText: true,
	        cleanPastedHTML: false,
	        cleanReplacements: [],
	        cleanAttrs: ['class', 'style', 'dir'],
	        cleanTags: ['meta']
	    },
	    anchorPreview: {
	        hideDelay: 300
	    },
	    placeholder: {
	        text: 'Click to edit'
	    }
	});
	window.addEventListener("beforeunload", function(e){
		if (Session.get('textId')) {
			Tasks.update({_id: Session.get('textId')}, {$set: {content: Session.get('text')}});
			Session.set('text', null);
			Session.set('textId', null);
		}
	}, false);

	window.addEventListener("blur", function(e){
		if (Session.get('textId')) {
			Tasks.update({_id: Session.get('textId')}, {$set: {content: Session.get('text')}});
			Session.set('text', null);
			Session.set('textId', null);
		}
	}, false);
});
