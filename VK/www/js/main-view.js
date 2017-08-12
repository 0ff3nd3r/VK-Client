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

// Add page load event on Friends button
$$('#friends').on('click', function() {
  
});