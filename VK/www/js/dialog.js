// Initialize your app
var myApp = new Framework7({
    swipePanel: "left"
});

// Export selectors engine
var $$ = Dom7;

// Add main view. News tab
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    fastClicks: true
});

fullHeight();
updateWidthFromData();
centerElements();

// Set avatar
// $('.view-dialog .avatar').css('background-image', 'url("img/i-f7-ios.png")');

//////////////////////////////////////////////////////////////
// Rewrite all algorithm with custom messages
// If message contains any type of media, set message container width to 100%
// Conversation flag
var conversationStarted = false;
 
// Init Messages
var myMessages = myApp.messages('.messages', {
  autoLayout:true,
  messageTemplate:
  '{{#if day}}' +
  '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
  '{{/if}}' +
  '<div class="message-wrapper">' +
    '<div class="message message-{{type}} message-with-tail">' +
        '<div class="message-text">'+
          // Text
          '{{#if text}}<div class="text-wrapper">' +
            '{{text}}' +
          '</div>{{/if}}' +
          // Any media
          '{{#if attachments}}' +
            '{{#if images}}<div class="images-wrapper">' +
              // Images
              '{{#each images}}'+
              '<div class="image"><img src="{{url}}"></div>' +
              '{{/each}}' +
            '</div>{{/if}}' +
            '{{#if videos}}<div class="videos-wrapper">' +
              // Videos
            '</div>{{/if}}' +
            '{{#if songs}}<div class="music-wrapper">' +
              // Music
              '{{#each songs}}'+
              '<div class="song">' +
                '<div class="song-icon-wrapper v-centered"></div>' +
                '<div class="song-info-wrapper v-centered">' +
                  '<span class="song-artist">{{artist}}<br></span>' +
                  '<span class="song-title">{{title}}</span>' +
                '</div>' +
              '{{/each}}' +
            '</div>{{/if}}' +
            '{{#if attachments}}<div class="attachments-wrapper">' +
              // Documents
              '{{#each attachments}}' +
              '<div class="attachment">' +
                '<div class="attachment-icon-wrapper v-centered"></div>' +
                '<div class="attachment-info-wrapper v-centered">' +
                  '<span class="attachment-title">{{title}}<br></span>' +
                  '<i class="icon f7-icons attachment-info-separator">circle_fill</i>' +
                  '<span class="attachment-size">{{size}}</span>' +
                  '<i class="icon f7-icons attachment-info-separator">circle_fill</i>' +
                  '<span class="attachment-date">{{date}}</span>' +
                '</div>' +
              '</div>' +
              '{{/each}}' +
            '</div>{{/if}}' +
            '{{#if links}}<div class="links-wrapper">' +
              // Links
              '{{#each links}}' +
              '<div class="links-wrapper">' +
                '<div class="link">' +
                  '<div class="link-icon-wrapper"></div>' +
                  '<div class="link-info-wrapper">' +
                    '<span class="link-title">{{title}}<br></span>' +
                    '<span class="link-domain">{{domain}}</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '{{/each}}' +
            '</div>{{/if}}' +
          '{{/if}}' +
        '</div>' +
    '</div>' + 
  '</div>'
});
 
// Init Messagebar
var myMessagebar = myApp.messagebar('.messagebar');
 
// Handle message
$$('.messagebar .link').on('click', function () {
  // Message text
  var messageText = myMessagebar.value().trim();
  // Exit if empy message
  if (messageText.length === 0) return;
  // Empty messagebar
  myMessagebar.clear()
 
  // Random message type
  var messageType = (['sent', 'received'])[Math.round(Math.random())];
 
  console.log(messageText);
  
  // Add message
  myMessages.addMessage({
    // Message text
    text: messageText,
    // Random message type
    type: messageType,
    // Day
    day: !conversationStarted ? 'Today' : false,
    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
  })
 
  // Update conversation flag
  conversationStarted = true;
});
//////////////////////////////////////////////////////////////




// Locates elements at the vertical center of the parent block
function centerElements() {
  var elements = $('.v-centered');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    // var parentHeight = element.parent().innerHeight();
    var parentHeight = getAbsoluteHeight(element);
    var margin = (parentHeight - element.outerHeight()) / 2;
    element.css('margin-top', '' + margin + 'px');
    element.css('margin-bottom', '' + margin + 'px');
  }
  
  elements = $('.h-centered');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var parentWidth = getAbsoluteWidth(element);
    var margin = (parentWidth - element.outerWidth()) / 2;
    element.css('margin-left', '' + margin + 'px');
    element.css('margin-right', '' + margin + 'px');
  }
  
  // Center content
  elements = $('.content-v-centered');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var children = element.children();
    var childrenHeight = 0;
    for (var i = 0; i < children.length; i++) {
      childrenHeight += $(children[i]).outerHeight();
    }
    var elementHeight = getAbsoluteHeight(element);
    var padding = (elementHeight - childrenHeight) / 2;
    element.css('padding-top', '' + padding + 'px');
    element.css('padding-bottom', '' + padding + 'px');
  }
  
  return;
}

// Returns the inner height of the parent element of @param element
function getAbsoluteHeight(element) {
  element = $(element);
  var parent = element.parent();
  return parent.innerHeight() - (
           parseInt( parent.css('padding-top') ) + parseInt( parent.css('padding-bottom') )
         );
}

// Returns the inner width of the parent element of @param element
function getAbsoluteWidth(element) {
  element = $(element);
  var parent = element.parent();
  return parent.innerWidth() - (
           parseInt( parent.css('padding-left') ) + parseInt( parent.css('padding-right') )
         );
}

function fullHeight() {
  var elements = $('.full-height');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var parent = element.parent();
    element.height(getAbsoluteHeight(element));
  }
}

function updateWidthFromData() {
  $('*[data-width]').css('width', function (index, value) {
    return $(this).data('width');
  });
}

// Applicable only to last elements
function bottom() {
  var elements = $('.bottom');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var parent = element.parent();
    var siblings = element.siblings();
    var sibHeights = 0;
    // Find outer heights of all siblings
    if (siblings.length > 0) {
      for (var i = 0; i < siblings.length; i++) {
        sibHeights += $(siblings[i]).outerHeight();
      }
    }
    
    element.css('margin-top',
      getAbsoluteHeight(parent) - sibHeights - element.outerHeight()
    );
  }
}

// Finds first rows with 1-2 cards and resizes the photos so that they have equal 
// height and fit the width of the card
// @param rows Array
// Needs fix
// Currently it just distorts the picture
// Realization should probably crop the image
function resizeFirstRow(rows) {
  // Find rows with 1-2 photos
  rows = rows || $('.one-row .row-one');
  
  for (var i = 0; i < rows.length; i++) {
    // Find block with images
    var images = $(rows[i]).find('img');
    // There could be only two possibilities
    // We need only rows with two photos
    if (images.length == 2) {
      // Find height difference
      var heightDiff = Math.abs($(images[0]).height() - $(images[1]).height());
      // Correct height
      $(images[0]).height() > $(images[1]).height() ?
        $(images[0]).height($(images[0]).height() - heightDiff) :
        $(images[1]).height($(images[1]).height() - heightDiff);
    }
  }
}

// Finds a row with two photos and resizes the photos to fit the width of the card 
function fitWidth() {
  // Find rows with 1-2 photos
  var rows = $('.one-row .row-one');
  
  for (var i = 0; i < rows.length; i++) {
    // Get parent and children
    var parentBlock = $(rows[i]);
    var parentWidth = parentBlock.width();
    var children = parentBlock.children();
    
    // Total width of children
    var childrenWidth = 0;
    for (var i = 0; i < children.length; i++) {
      childrenWidth += $(children[i]).width();
    }
    
    // Find the difference in width. Devide for number of children to find
    // needed additional length for each child block
    var additionalLength = (parentWidth - childrenWidth) / children.length - 1;
    
    // Change the width of children
    for (var i = 0; i < children.length; i++) {
      $(children[i]).width(
        $(children[i]).width() + additionalLength
      );
    }
  }
}