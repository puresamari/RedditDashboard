function ToggleSidebar(){
    $('.sidebar ').toggleClass('sidebaropen');
    $('.sidebar ').toggleClass('sidebarclose');
}

$(".subred-search").submit(function(event){
  SearchSubreddit($(this).find(".search-query").val());
  event.preventDefault();
});

function SearchSubreddit(query) {
  var searchstring = "http://www.reddit.com/subreddits/search.json?q="+query;
  $(".search-icon").addClass("fa-spinner fa-spin");
  $(".search-icon").removeClass("fa-search");
  $.ajax({
    url: searchstring,
    dataType: 'json',
    success: function(response) {
      var subredListElem = $(".subred-list");
      subredListElem.find(".dropdown-menu").html("");
      $.each(response.data.children, function( index, value ) {
        var displayname = value.data.display_name;
        var appendString = $('<li><a onClick="SetActiveSubred('+"'"+displayname+"'"+')">'+displayname+"</a></li>");
        if (index === 0) { 
          subredListElem.find(".dropdown-toggle .active-subred").html(displayname);
          appendString.addClass("active");
        }
        subredListElem.find(".dropdown-menu").append(appendString);
      });
      $(".search-icon").removeClass("fa-spinner fa-spin");
      $(".search-icon").addClass("fa-search");
    }
  });
}

function SetActiveSubred(subred){
  $(".subred-list .dropdown-toggle .active-subred").html(subred);
  $(".subred-list .dropdown-menu li").each(function( index, value ) {
    console.log(value);
    $(this).removeClass("active");
    if ($(this).find("a").html() === subred) {
      $(this).addClass("active");
    }
  });
}