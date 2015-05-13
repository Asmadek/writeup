// Without this, the editableText widget will fall back to a textarea:
EditableText.wysiwyg = true;

// Events specific to this particular implementation of the bootstrap-wysiwyg editor

Template.wysiwyg.events({
  'click .wysiwyg-toolbar .span2' : function(evt) {
    evt.stopPropagation();
  }
});