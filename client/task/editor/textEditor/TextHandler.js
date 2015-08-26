var TextHandler;                                                                                                      // 3952
                                                                                                                       // 3953
(function () {                                                                                                         // 3954
    'use strict';                                                                                                      // 3955
    /*jslint regexp: true*/                                                                                            // 3956
    /*                                                                                                                 // 3957
        jslint does not allow character negation, because the negation                                                 // 3958
        will not match any unicode characters. In the regexes in this                                                  // 3959
        block, negation is used specifically to match the end of an html                                               // 3960
        tag, and in fact unicode characters *should* be allowed.                                                       // 3961
    */                                                                                                                 // 3962
    function createReplacements() {                                                                                    // 3963
        return [                                                                                                       // 3964
                                                                                                                       // 3965
            // replace two bogus tags that begin pastes from google docs                                               // 3966
            [new RegExp(/<[^>]*docs-internal-guid[^>]*>/gi), ''],                                                      // 3967
            [new RegExp(/<\/b>(<br[^>]*>)?$/gi), ''],                                                                  // 3968
                                                                                                                       // 3969
             // un-html spaces and newlines inserted by OS X                                                           // 3970
            [new RegExp(/<span class="Apple-converted-space">\s+<\/span>/g), ' '],                                     // 3971
            [new RegExp(/<br class="Apple-interchange-newline">/g), '<br>'],                                           // 3972
                                                                                                                       // 3973
            // replace google docs italics+bold with a span to be replaced once the html is inserted                   // 3974
            [new RegExp(/<span[^>]*(font-style:italic;font-weight:bold|font-weight:bold;font-style:italic)[^>]*>/gi), '<span class="replace-with italic bold">'],
                                                                                                                       // 3976
            // replace google docs italics with a span to be replaced once the html is inserted                        // 3977
            [new RegExp(/<span[^>]*font-style:italic[^>]*>/gi), '<span class="replace-with italic">'],                 // 3978
                                                                                                                       // 3979
            //[replace google docs bolds with a span to be replaced once the html is inserted                          // 3980
            [new RegExp(/<span[^>]*font-weight:bold[^>]*>/gi), '<span class="replace-with bold">'],                    // 3981
                                                                                                                       // 3982
             // replace manually entered b/i/a tags with real ones                                                     // 3983
            [new RegExp(/&lt;(\/?)(i|b|a)&gt;/gi), '<$1$2>'],                                                          // 3984
                                                                                                                       // 3985
             // replace manually a tags with real ones, converting smart-quotes from google docs                       // 3986
            [new RegExp(/&lt;a(?:(?!href).)+href=(?:&quot;|&rdquo;|&ldquo;|"|“|”)(((?!&quot;|&rdquo;|&ldquo;|"|“|”).)*)(?:&quot;|&rdquo;|&ldquo;|"|“|”)(?:(?!&gt;).)*&gt;/gi), '<a href="$1">'],
                                                                                                                       // 3988
            // Newlines between paragraphs in html have no syntactic value,                                            // 3989
            // but then have a tendency to accidentally become additional paragraphs down the line                     // 3990
            [new RegExp(/<\/p>\n+/gi), '</p>'],                                                                        // 3991
            [new RegExp(/\n+<p/gi), '<p'],                                                                             // 3992
                                                                                                                       // 3993
            // Microsoft Word makes these odd tags, like <o:p></o:p>                                                   // 3994
            [new RegExp(/<\/?o:[a-z]*>/gi), '']                                                                        // 3995
        ];                                                                                                             // 3996
    }                                                                                                                  // 3997
    /*jslint regexp: false*/                                                                                           // 3998
                                                                                                                       // 3999
    TextHandler = {                                                                                  // 4000
        /* Paste Options */                                                                                            // 4001
                                                                                                                       // 4002
        /* forcePlainText: [boolean]                                                                                   // 4003
         * Forces pasting as plain text.                                                                               // 4004
         */                                                                                                            // 4005
        forcePlainText: true,                                                                                          // 4006
                                                                                                                       // 4007
        /* cleanPastedHTML: [boolean]                                                                                  // 4008
         * cleans pasted content from different sources, like google docs etc.                                         // 4009
         */                                                                                                            // 4010
        cleanPastedHTML: true,                                                                                        // 4011
                                                                                                                       // 4012
        /* cleanReplacements: [Array]                                                                                  // 4013
         * custom pairs (2 element arrays) of RegExp and replacement text to use during paste when                     // 4014
         * __forcePlainText__ or __cleanPastedHTML__ are `true` OR when calling `cleanPaste(text)` helper method.      // 4015
         */                                                                                                            // 4016
        cleanReplacements: [],                                                                                         // 4017
                                                                                                                       // 4018
        /* cleanAttrs:: [Array]                                                                                        // 4019
         * list of element attributes to remove during paste when __cleanPastedHTML__ is `true` or when                // 4020
         * calling `cleanPaste(text)` or `pasteHTML(html, options)` helper methods.                                    // 4021
         */                                                                                                            // 4022
        cleanAttrs: ['class', 'style', 'dir'],                                                                         // 4023
                                                                                                                       // 4024
        /* cleanTags: [Array]                                                                                          // 4025
         * list of element tag names to remove during paste when __cleanPastedHTML__ is `true` or when                 // 4026
         * calling `cleanPaste(text)` or `pasteHTML(html, options)` helper methods.                                    // 4027
         */                                                                                                            // 4028
        cleanTags: ['meta'],                                                                                           // 4029
                                                                                                                       // 4030
        init: function () {                                                                                            // 4031
                                                                                                                     // 4036
        },                                                                                                             // 4037
                                                                                                                       // 4038
        handlePaste: function (event, element) {                                                                       // 4039
            var paragraphs,                                                                                            // 4040
                html = '',                                                                                             // 4041
                p,                                                                                                     // 4042
                dataFormatHTML = 'text/html',                                                                          // 4043
                dataFormatPlain = 'text/plain',                                                                        // 4044
                pastedHTML,                                                                                            // 4045
                pastedPlain;                                                                                           // 4046
                                                                                                                       // 4047
            if (this.window.clipboardData && event.clipboardData === undefined) {                                      // 4048
                event.clipboardData = this.window.clipboardData;                                                       // 4049
                // If window.clipboardData exists, but event.clipboardData doesn't exist,                              // 4050
                // we're probably in IE. IE only has two possibilities for clipboard                                   // 4051
                // data format: 'Text' and 'URL'.                                                                      // 4052
                //                                                                                                     // 4053
                // Of the two, we want 'Text':                                                                         // 4054
                dataFormatHTML = 'Text';                                                                               // 4055
                dataFormatPlain = 'Text';                                                                              // 4056
            }                                                                                                          // 4057
                                                                                                                       // 4058
            if (event.clipboardData &&                                                                                 // 4059
                    event.clipboardData.getData &&                                                                     // 4060
                    !event.defaultPrevented) {                                                                         // 4061
                event.preventDefault();                                                                                // 4062
                                                                                                                       // 4063
                pastedHTML = event.clipboardData.getData(dataFormatHTML);                                              // 4064
                pastedPlain = event.clipboardData.getData(dataFormatPlain);                                            // 4065
                                                                                                                       // 4066
                if (this.cleanPastedHTML && pastedHTML) {                                                              // 4067
                    return this.cleanPaste(pastedHTML);                                                                // 4068
                }                                                                                                      // 4069
                                                                                                                       // 4070
                if (!(this.getEditorOption('disableReturn') || element.getAttribute('data-disable-return'))) {         // 4071
                    paragraphs = pastedPlain.split(/[\r\n]+/g);                                                        // 4072
                    // If there are no \r\n in data, don't wrap in <p>                                                 // 4073
                    if (paragraphs.length > 1) {                                                                       // 4074
                        for (p = 0; p < paragraphs.length; p += 1) {                                                   // 4075
                            if (paragraphs[p] !== '') {                                                                // 4076
                                html += '<p>' + Util.htmlEntities(paragraphs[p]) + '</p>';                             // 4077
                            }                                                                                          // 4078
                        }                                                                                              // 4079
                    } else {                                                                                           // 4080
                        html = Util.htmlEntities(paragraphs[0]);                                                       // 4081
                    }                                                                                                  // 4082
                } else {                                                                                               // 4083
                    html = Util.htmlEntities(pastedPlain);                                                             // 4084
                }                                                                                                      // 4085
                Util.insertHTMLCommand(this.document, html);                                                           // 4086
            }                                                                                                          // 4087
        },                                                                                                             // 4088
                                                                                                                       // 4089
        cleanPaste: function (text) {                                                                                  // 4090
            var i, elList, workEl,                                                                                     // 4091
                el = Selection.getSelectionElement(this.window),                                                       // 4092
                multiline = /<p|<br|<div/.test(text),                                                                  // 4093
                replacements = createReplacements().concat(this.cleanReplacements || []);                              // 4094
                                                                                                                       // 4095
            for (i = 0; i < replacements.length; i += 1) {                                                             // 4096
                text = text.replace(replacements[i][0], replacements[i][1]);                                           // 4097
            }                                                                                                          // 4098
                                                                                                                       // 4099
            if (!multiline) {                                                                                          // 4100
                return this.pasteHTML(text);                                                                           // 4101
            }                                                                                                          // 4102
                                                                                                                       // 4103
            // double br's aren't converted to p tags, but we want paragraphs.                                         // 4104
            elList = text.split('<br><br>');                                                                           // 4105
                                                                                                                       // 4106
            this.pasteHTML('<p>' + elList.join('</p><p>') + '</p>');                                                   // 4107
                                                                                                                       // 4108
            try {                                                                                                      // 4109
                this.document.execCommand('insertText', false, '\n');                                                  // 4110
            } catch (ignore) { }                                                                                       // 4111
                                                                                                                       // 4112
            // block element cleanup                                                                                   // 4113
            elList = el.querySelectorAll('a,p,div,br');                                                                // 4114
            for (i = 0; i < elList.length; i += 1) {                                                                   // 4115
                workEl = elList[i];                                                                                    // 4116
                                                                                                                       // 4117
                // Microsoft Word replaces some spaces with newlines.                                                  // 4118
                // While newlines between block elements are meaningless, newlines within                              // 4119
                // elements are sometimes actually spaces.                                                             // 4120
                workEl.innerHTML = workEl.innerHTML.replace(/\n/gi, ' ');                                              // 4121
                                                                                                                       // 4122
                switch (workEl.nodeName.toLowerCase()) {                                                               // 4123
                    case 'p':                                                                                          // 4124
                    case 'div':                                                                                        // 4125
                        this.filterCommonBlocks(workEl);                                                               // 4126
                        break;                                                                                         // 4127
                    case 'br':                                                                                         // 4128
                        this.filterLineBreak(workEl);                                                                  // 4129
                        break;                                                                                         // 4130
                }                                                                                                      // 4131
            }                                                                                                          // 4132
        },                                                                                                             // 4133
                                                                                                                       // 4134
        pasteHTML: function (html, options) {                                                                          // 4135
            options = Util.defaults({}, options, {                                                                     // 4136
                cleanAttrs: this.cleanAttrs,                                                                           // 4137
                cleanTags: this.cleanTags                                                                              // 4138
            });                                                                                                        // 4139
                                                                                                                       // 4140
            var elList, workEl, i, fragmentBody, pasteBlock = this.document.createDocumentFragment();                  // 4141
                                                                                                                       // 4142
            pasteBlock.appendChild(this.document.createElement('body'));                                               // 4143
                                                                                                                       // 4144
            fragmentBody = pasteBlock.querySelector('body');                                                           // 4145
            fragmentBody.innerHTML = html;                                                                             // 4146
                                                                                                                       // 4147
            this.cleanupSpans(fragmentBody);                                                                           // 4148
                                                                                                                       // 4149
            elList = fragmentBody.querySelectorAll('*');                                                               // 4150
                                                                                                                       // 4151
            for (i = 0; i < elList.length; i += 1) {                                                                   // 4152
                workEl = elList[i];                                                                                    // 4153
                                                                                                                       // 4154
                if ('a' === workEl.nodeName.toLowerCase() && this.getEditorOption('targetBlank')) {                    // 4155
                    Util.setTargetBlank(workEl);                                                                       // 4156
                }                                                                                                      // 4157
                                                                                                                       // 4158
                Util.cleanupAttrs(workEl, options.cleanAttrs);                                                         // 4159
                Util.cleanupTags(workEl, options.cleanTags);                                                           // 4160
            }                                                                                                          // 4161
                                                                                                                       // 4162
            Util.insertHTMLCommand(this.document, fragmentBody.innerHTML.replace(/&nbsp;/g, ' '));                     // 4163
        },                                                                                                             // 4164
                                                                                                                       // 4165
        isCommonBlock: function (el) {                                                                                 // 4166
            return (el && (el.nodeName.toLowerCase() === 'p' || el.nodeName.toLowerCase() === 'div'));                 // 4167
        },                                                                                                             // 4168
                                                                                                                       // 4169
        filterCommonBlocks: function (el) {                                                                            // 4170
            if (/^\s*$/.test(el.textContent) && el.parentNode) {                                                       // 4171
                el.parentNode.removeChild(el);                                                                         // 4172
            }                                                                                                          // 4173
        },                                                                                                             // 4174
                                                                                                                       // 4175
        filterLineBreak: function (el) {                                                                               // 4176
            if (this.isCommonBlock(el.previousElementSibling)) {                                                       // 4177
                // remove stray br's following common block elements                                                   // 4178
                this.removeWithParent(el);                                                                             // 4179
            } else if (this.isCommonBlock(el.parentNode) && (el.parentNode.firstChild === el || el.parentNode.lastChild === el)) {
                // remove br's just inside open or close tags of a div/p                                               // 4181
                this.removeWithParent(el);                                                                             // 4182
            } else if (el.parentNode && el.parentNode.childElementCount === 1 && el.parentNode.textContent === '') {   // 4183
                // and br's that are the only child of elements other than div/p                                       // 4184
                this.removeWithParent(el);                                                                             // 4185
            }                                                                                                          // 4186
        },                                                                                                             // 4187
                                                                                                                       // 4188
        // remove an element, including its parent, if it is the only element within its parent                        // 4189
        removeWithParent: function (el) {                                                                              // 4190
            if (el && el.parentNode) {                                                                                 // 4191
                if (el.parentNode.parentNode && el.parentNode.childElementCount === 1) {                               // 4192
                    el.parentNode.parentNode.removeChild(el.parentNode);                                               // 4193
                } else {                                                                                               // 4194
                    el.parentNode.removeChild(el);                                                                     // 4195
                }                                                                                                      // 4196
            }                                                                                                          // 4197
        },                                                                                                             // 4198
                                                                                                                       // 4199
        cleanupSpans: function (containerEl) {                                                                         // 4200
            var i,                                                                                                     // 4201
                el,                                                                                                    // 4202
                newEl,                                                                                                 // 4203
                spans = containerEl.querySelectorAll('.replace-with'),                                                 // 4204
                isCEF = function (el) {                                                                                // 4205
                    return (el && el.nodeName !== '#text' && el.getAttribute('contenteditable') === 'false');          // 4206
                };                                                                                                     // 4207
                                                                                                                       // 4208
            for (i = 0; i < spans.length; i += 1) {                                                                    // 4209
                el = spans[i];                                                                                         // 4210
                newEl = this.document.createElement(el.classList.contains('bold') ? 'b' : 'i');                        // 4211
                                                                                                                       // 4212
                if (el.classList.contains('bold') && el.classList.contains('italic')) {                                // 4213
                    // add an i tag as well if this has both italics and bold                                          // 4214
                    newEl.innerHTML = '<i>' + el.innerHTML + '</i>';                                                   // 4215
                } else {                                                                                               // 4216
                    newEl.innerHTML = el.innerHTML;                                                                    // 4217
                }                                                                                                      // 4218
                el.parentNode.replaceChild(newEl, el);                                                                 // 4219
            }                                                                                                          // 4220
                                                                                                                       // 4221
            spans = containerEl.querySelectorAll('span');                                                              // 4222
            for (i = 0; i < spans.length; i += 1) {                                                                    // 4223
                el = spans[i];                                                                                         // 4224
                                                                                                                       // 4225
                // bail if span is in contenteditable = false                                                          // 4226
                if (Util.traverseUp(el, isCEF)) {                                                                      // 4227
                    return false;                                                                                      // 4228
                }                                                                                                      // 4229
                                                                                                                       // 4230
                // remove empty spans, replace others with their contents                                              // 4231
                Util.unwrap(el, this.document);                                                                        // 4232
            }                                                                                                          // 4233
        }                                                                                                              // 4234
    };                                                                                                                // 4235
}());                                                                                                                  // 4236