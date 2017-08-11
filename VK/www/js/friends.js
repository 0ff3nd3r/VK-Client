// Initialize search bar
if ($('.searchbar').length === 1) {
  var friendsSearchbar = myApp.searchbar('.searchbar', {
    overlay: ".searchbar-overlay",
  });

  $(".searchbar-clear").on('click', function () {
    $(".searchbar-input input").val('');
  });
}