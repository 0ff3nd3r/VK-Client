// Initialize your app
var myApp = new Framework7({
    swipePanel: "left"
});

// Export selectors engine
var $$ = Dom7;

// Add main view. News tab
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// mainView.loadPage("views/News/page-news-feed-news_release.html");

// // Make News tab active
// // mainView.onPageInit();

// $$('.news-cards-list .card.news-card-item').on('click', function() {
//   mainView.router.loadPage('views/News/page-full-post_release.html');
//   centerElements();
// });

// mainView.loadPage("inde")
var messagesSearchbar = myApp.searchbar('.searchbar', {
  overlay: ".searchbar-overlay",
});
$(".searchbar-clear").on('click', function () {
  $(".searchbar-input input").val('');
});

// Add view. Messages tab
// var messaagesView = myApp.addView('.view-messages', {
//     // Because we use fixed-through navbar we can enable dynamic navbar
//     dynamicNavbar: true,
//     name: 'messages'
// });

// Callbacks to run specific code for specific pages, for example for About page:
// myApp.onPageInit('about', function (page) {
//     // run createContentPage func after link was clicked
//     $$('.create-page').on('click', function () {
//         createContentPage();
//     });
// });

centerElements();
// resizeFirstRow();
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

// Locates elements at the vertical center of the parent block
function centerElements() {
  var elements = $('.v-centered');
  for (var i = 0; i < elements.length; i++) {
    var element = $(elements[i]);
    var parentHeight = element.parent().innerHeight();
    element.css('margin-top', '' + (parentHeight - element.outerHeight()) / 2 + 'px');
    element.css('margin-bottom', '' + (parentHeight - element.outerHeight()) / 2 + 'px');
  }
  
  // elements = $('.h-centered');
  // for (var i = 0; i < elements.length; i++) {
  //   var element = $(elements[i]);
  //   var parentWidth = element.parent().innerWidth();
  //   element.css('margin-left', '' + (parentWidth - element.outerWidth()) / 2 + 'px');
  //   element.css('margin-right', '' + (parentWidth - element.outerWidth()) / 2 + 'px');
  // }
  
  return;
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