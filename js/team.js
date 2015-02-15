var map;

var renderMemberTemplate = function(member_obj) {
  var extra_info = "";
  var title = "";

  if ((member_obj.is_owner) || (member_obj.is_admin)) {
    if (member_obj.is_owner) {
      title = "Owner";
    } else if (member_obj.is_admin) {
      title = "Admin";
    }

    extra_info += '<div class="mark_alt"><i class="fa fa-trophy"></i> Community ' + title + '</div>';
  }

  return '<figure class="team-image-wrapper">' +
          '<img src="' + member_obj.image_192 + '" class="team-image" alt="' + member_obj.real_name + '">' +
          '<figcaption>' +
          '<mark>' + (member_obj.real_name || "&nbsp;") + '</mark><br />' +
          extra_info +
          '<div class="team-member-title">' + (member_obj.title || "&nbsp;") + '</div>' +
          '</figcaption>' +
          '</figure>';
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
      var members_html = "";
      var owners_html = "";
      var admins_html = "";

      for (var i = 0; i < data.length; i++) {
        var member_obj = data[i];

        if ((member_obj.real_name != "") && (member_obj.title != "") && (member_obj.title != null)) {
          if (!member_obj.is_admin) {
            members_html += renderMemberTemplate(member_obj);
          }

          if (member_obj.is_owner) {
            owners_html += renderMemberTemplate(member_obj);
          }

          if ((!member_obj.is_owner) && (member_obj.is_admin)) {
            admins_html += renderMemberTemplate(member_obj);
          }
        }
      }

      $admins.append(owners_html);
      $admins.append(admins_html);
      $members.append(members_html);

      $admins.css("opacity", "1");
      $members.css("opacity", "1");
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