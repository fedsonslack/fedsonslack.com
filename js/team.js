var map;

var renderMemberTemplate = function(member_obj) {
  var extra_info = "";
  var title = "";
  var social = "";

  if ((member_obj.is_owner) || (member_obj.is_admin)) {
    if (member_obj.is_owner) {
      title = "Owner";
    } else if (member_obj.is_admin) {
      title = "Admin";
    }

    extra_info += '<div '+(member_obj.is_owner ? 'class="mark_alt"' : '')+'><i class="fa fa-trophy"></i> Community ' + title + '</div>';
  }

  if ((member_obj.twitter) && (member_obj.twitter != "")) {
    social = '<div class="team-member-social"><a href="https://twitter.com/'+member_obj.twitter+'"><i class="fa fa-twitter"></i> @'+member_obj.twitter+'</a></div>';
  }

  var html = '<figure class="team-image-wrapper">' +
              '<img src="' + member_obj.image_192 + '" class="team-image" alt="' + member_obj.real_name + '">' +
              '<figcaption>' +
              '<mark>' + (member_obj.real_name || "&nbsp;") + '</mark><br />' +
              extra_info +
              '<div class="team-member-title"></div>' +
              social +
              '</figcaption>' +
              '</figure>';

  $html = $(html);
  $html.find('.team-member-title').text((member_obj.title || "&nbsp;"));

  return $html;
};

$(document).ready(function() {
  L.mapbox.accessToken = 'pk.eyJ1Ijoia2luZG9mb25lIiwiYSI6IkVBYnRxeEkifQ.6VOX9JCTTCSMysIhJyqNLA';
  map = L.mapbox.map('map', 'kindofone.57c8f810', {
    zoomControl: false
  });

  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  if (map.tap) map.tap.disable();

  $.ajax({
    type: "GET",
    url: "http://fedsonslack.com/scripts/slack_api.php?method=users.list"
  })
    .done(function( data ) {
      var $admins = $("#admins");
      var $members = $("#members");
      var members_elements = [];
      var owners_elements = [];
      var admins_elements = [];

      for (var i = 0; i < data.length; i++) {
        var member_obj = data[i];

        if ((member_obj.real_name != "") && (member_obj.title != "") && (member_obj.title != null)) {
          if (!member_obj.is_admin) {
            members_elements.push(renderMemberTemplate(member_obj));
          }

          if (member_obj.is_owner) {
            owners_elements.push(renderMemberTemplate(member_obj));
          }

          if ((!member_obj.is_owner) && (member_obj.is_admin)) {
            admins_elements.push(renderMemberTemplate(member_obj));
          }
        }
      }

      $admins.append(owners_elements);
      $admins.append(admins_elements);
      $members.append(members_elements);

			skrollr.init({
				easing: 'sqrt',
				smoothScrolling: true,
				forceHeight: false
			});

      $admins.css("opacity", "1");
      $members.css("opacity", "1");
      $("#and-more").css("opacity", "1");
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