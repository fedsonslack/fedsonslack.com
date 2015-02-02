$(document).ready(function() {
	'use strict';

	if ($('.no-touch').length) {
		setTimeout(function(){
			skrollr.init({
				easing: 'sqrt',
				smoothScrolling: true,
				forceHeight: false
			});
		},1000);
	}

	$('.intro').textillate({
		loop: true,
		initialDelay: 1000,
		in: {
			effect: 'flipInX'
		},
		out: {
			effect: 'fadeOutDown'
		}
	});

    $('a[href^="#"], .go-top')
		.bind('click', function(event) {
			var $anchor = $(this),
			scrollVal = $($anchor.attr('href')).offset().top +1

			if (scrollVal < 0) {
			  scrollVal = 0;
			}

			$.scrollTo(scrollVal, {
			  duration: 800
			});

			event.preventDefault();
 		});

	$('a[href="#"]').click(function() {
		return false;
	});
});

$(window).load(function() {
  $('#integrations_gif').attr('src', 'img/integrations.gif');

  $.ajax({
    type: "GET",
    url: "http://fedsonslack.com/slack_api.php?method=users.count"
  })
    .done(function( data ) {
      var $memberCountPart = $("#member-count-part");
      $memberCountPart.find("mark").text(data.count + " FEDs");
      $memberCountPart.show();
    });
});

//alex-vs-mouse
jQuery(document).ready(function ($){
	$('#inner').on('mouseenter mouseleave', function(e){
    var $faceCont = $('#face_cont');
		var $mouth = $('#mouth');
		var $face = $('#face');
		var t = 0;
		var face_offset = $face.offset();
		var mouth_offset = $mouth.position();
    switch(e.type) {
			case 'mouseenter':
				pageX = e.pageX;
				pageY = e.pageY;
				hap = {
					'left' : e.pageX - face_offset.left - mouth_offset.left - $mouth.width() - 7,
					'top'  : e.pageY - face_offset.top - mouth_offset.top - $mouth.height() + 40
				};
				if((e.pageX - face_offset.left - 16) <= $face.width()/2){
					$faceCont.addClass('flip');
					hap.left = -1 * (hap.left + 46);
					hap.top = -1 * (hap.top + 5);
				}else{
					$faceCont.css({left:0});
					$faceCont.removeClass('flip');
				}
				$('#face_inner').css({'top':hap.top,'left':hap.left});
				setTimeout(function(){
					$('#face_inner').css({'top':0,'left':-16});
					$('#inner').on('mousemove', function(e){
									window.clearTimeout(t);
									$('#face_cont').addClass('shake');
									pageY = e.pageY;
									pageX = e.pageX;
									t = window.setTimeout(function(){
										$('#face_cont').removeClass('shake');
									},100)
								})
				},250);

			break;
			case 'mouseleave':
				$faceCont.removeClass('shake');
				$('#inner').off('mousemove');
			break;
		}
	});

})
