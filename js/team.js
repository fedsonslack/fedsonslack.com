$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "http://fedsonslack.com/scripts/slack_api.php?method=users.list"
  })
    .done(function( data ) {
      var $members = $("#members");
      var members_html = "";

      for (var i = 0; i < data.length; i++) {
        var member_obj = data[i];

        members_html += '<figure class="team-image-wrapper">' +
                           '<img src="'+member_obj.image_192+'" class="team-image" alt="'+member_obj.real_name+'">' +
                           '<figcaption>' +
                             '<mark>'+(member_obj.real_name || "&nbsp;")+'</mark><br />' +
                             (member_obj.title || "&nbsp;") +
                           '</figcaption>' +
                         '</figure>';
      }

      $members.append(members_html);
    });

	$('#features .col-lg-6 a, #features .col-lg-8 a, a.go-top')
		.bind('click', function(event) {
			var $anchor = $(this),
			scrollVal = $($anchor.attr('href')).offset().top +1

			if (scrollVal < 0) {
			  scrollVal = 0;
			}

			$.scrollTo(scrollVal, {
			  easing: 'easeInOutExpo',
			  duration: 1500
			});

			event.preventDefault();
 		});
});