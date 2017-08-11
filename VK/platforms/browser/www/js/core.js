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