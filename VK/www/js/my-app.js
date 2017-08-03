// Initialize your app
var myApp = new Framework7({
    swipePanel: "left"
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
// myApp.onPageInit('about', function (page) {
//     // run createContentPage func after link was clicked
//     $$('.create-page').on('click', function () {
//         createContentPage();
//     });
// });

centerElements();
// fitWidth();

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

function centerElements() {
  var elements = $('.v-centered');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var parentHeight = element.parent().height();
    element.css('margin', '' + (parentHeight - element.outerHeight()) / 2 + 'px 0');
  }
  return;
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

// // Functions to correct the size of the cards and photos
// function resizeCards() {
//   var HEIGHT = "438px";
//   var cards = $$('.news-card-item-photo');
  
//   // Iterate over cards
//   // Temp solution. Height property should be in css
//   for (i = 0; i < cards.length; i++) {
//     cards[i].style.height = HEIGHT;
//   }
  
  
// }
