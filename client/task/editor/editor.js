Template.editor.events({
	'paste .wysiwyg': function (event, template) {
		var e = event.originalEvent;
		
		if (e.clipboardData) {
            
			var text = e.clipboardData.getData('text/plain');
			var html = e.clipboardData.getData('text/html');
			
		} else {

		}
	},
	'input .wysiwyg': function (event, template) {	
		/*	
		var range = document.createRange();
		var sel = window.getSelection();
		range.setStart(sel.focusNode, sel.focusOffset);
		
		var text = template.$('.wysiwyg').text();
		var html = template.$('.wysiwyg').html();
		
		Tasks.update({_id: template.data._id}, {$set: {
			value: text.length,
			content: html
		}});
		
		Session.set('text', html);
		Session.set('textId', template.data._id);
		Session.set('spanId', template.data._id + Meteor.user()._id);
		
		var newElement = document.createElement('span');
		newElement.id = template.data._id + Meteor.user()._id;
		sel.addRange(range);
		range.insertNode(newElement);
		*/
	},
	'focusout .wysiwyg': function (event, template) {
		console.log(1);
	},
	'focusout .text-editor': function (event, template) {
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
		}
	},
	'click .save': function (event, template) {
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
		}
	},
	'click .insert': function (event, template) {
		event.preventDefault();
		event.stopPropagation();
		
		pasteHtmlAtCaret('&ndash;');
		
	},
	'input .text-editor': function (event, template) {		
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		
		Tasks.update({_id: template.data._id}, {$set: {
			value: text.length,
			//content: html
		}});
	}
})

Template.editor.helpers({
/*	'contentEditHandler': function() {

		if (FOCUSNODE != {}) {
			var focus = FOCUSNODE;
			var editorNodes = $('.text-editor')[0].childNodes;
			for (var index = 0; index < editorNodes.length; index++) {
				var element = editorNodes[index];
				if (compare(element, FOCUSNODE))
					focus = element;
			}
			var range = document.createRange();
			var sel = window.getSelection();
			
			var placeCursor = function () {
				range.setStart(focus, FOCUSOFFSET);
				range.collapse(true);
				
				sel.removeAllRanges();
				sel.addRange(range);    
			}
	
	
			setTimeout(placeCursor,1); // WORKS
		}
		
		return Tasks.findOne({_id: this._id}).content;
		
	}
	*/
})


Template.editor.onRendered(function () {	
	var editor = new MediumEditor('.text-editor', {
	    delay: 1,
	    targetBlank: true,
	    toolbar: false,
		paste: {
	        forcePlainText: true,
	        cleanPastedHTML: false,
	        cleanReplacements: [],
	        cleanAttrs: ['class', 'style', 'dir'],
	        cleanTags: ['meta']
	    },
		placeholder: false
	});
	window.addEventListener("beforeunload", function(e){
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
		}
	}, false);

	window.addEventListener("blur", function(e){
		template.$('.text-editor').blur();
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
		}
	}, false);
});

function isArray(obj) {
    return obj && !(obj.propertyIsEnumerable('length')) && 
        typeof obj === 'object' && typeof obj.length === 'number';
};        

var FOCUSNODE = {};
var FOCUSOFFSET = {};

function compare(first, second) {
	for (var key in first) {
		if (first[key] != second[key])
			return false;
	}
	return true;
}