$(document).ready(function(){
	$(document.body).on('click', '#sidebarTogggle' ,function(){ // not .click because of dynamic list items
		$('.sidebar ').toggleClass('sidebaropen');
		$('.sidebar ').toggleClass('sidebarclose');
	});

	$(".subred-search").submit(function(event){
		SearchSubreddit($(this).find(".search-query").val());
		event.preventDefault();
	});

	$(document.body).on('click', '.subred-list ul li' ,function(){ // not .click because of dynamic list items
		console.log($(this).text())
		SetActiveSubred($(this).text());
	});

	function SearchSubreddit(query) {
		var searchstring = "http://www.reddit.com/subreddits/search.json?q="+query;
		$(".search-icon").addClass("glyphicon-spin glyphicon-cog");
		$(".search-icon").removeClass("glyphicon-search");
		$.ajax({
			url: searchstring,
			dataType: 'json',
			success: function(response) {
				var subredListElem = $(".subred-list");
				subredListElem.find(".dropdown-menu").html("");
				$.each(response.data.children, function( index, value ) {
					var displayname = value.data.display_name;
					var appendString = $('<li><a class="subredname">'+displayname+"</a></li>");
					if (index === 0) { 
						subredListElem.find(".dropdown-toggle .active-subred").html(displayname);
						appendString.addClass("active");
					}
					subredListElem.find(".dropdown-menu").append(appendString);
				});
				$(".search-icon").removeClass("glyphicon-spin glyphicon-cog");
				$(".search-icon").addClass("glyphicon-search");
			}
		});
	}

	function SetActiveSubred(subred){
		$(".subred-list .dropdown-toggle .active-subred").html(subred);
		$(".subred-list .dropdown-menu li").each(function( index, value ) {
			$(this).removeClass("active");
			if ($(this).find("a").html() === subred) {
				$(this).addClass("active");
			}
		});
		loadPosts(subred);
	}

	function loadPosts(subred) {
		$.ajax({
			url: "http://www.reddit.com/r/" + subred + "/.json",
			dataType: "html",
			success: function (data) {
				$(".content .reddit-posts .heading").html(subred);
				$("#accordion").html("");
				var json = $.parseJSON(data);
				var children = json.data.children;
				$.each(children, function (i, item) {

					var redpostid = 'redpost' + i;

					var redpost = $('<div class="panel"></div>');
					var collapsedclass="collapsed";
					var redhead = $('<div class="panel-heading"><h3 class="panel-title"><a data-parent="#accordion" class="'+collapsedclass+'" href="#' + redpostid +'" data-toggle="collapse" data-parent="#accordion2" >' + item.data.title + ' by: ' + item.data.author + '</a></h3></div>');
					var redcont = $('<div class="panel-collapse collapse"  id="'+redpostid+'"><div class="panel-body"></div></div>');

					var contentstring = $("<div/>").html(item.data.selftext_html).children();
				
					if (typeof item.data.media !== 'undefined' && item.data.media !== null) {
						if (typeof item.data.media.oembed !== 'undefined' && item.data.media.oembed !== null) {
							
							var iframeString = item.data.media.oembed.html;
							var iframe = $("<div/>").html("<div>"+$("<div/>").html(iframeString).text() + "</div>").contents();
							
							iframe.children().attr("src", function(index, src) {
								return 'https:' + src;
							});
							
							contentstring = iframe.html();
						}
					}
					
					redcont.children(".panel-body").html(contentstring).contents();

					redpost.append(redhead);
					redpost.append(redcont);

					$("#accordion").append(redpost);

				});
			}
		});
	}
});