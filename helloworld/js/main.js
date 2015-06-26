
var bgArray = [];

$(document).on("ready", function(){
	
	/**
	* Setup
	*/

	$(window).scrollTop(0);

	$.each($("section"), function(){
		$(this).css("height", $(window).height());
	});

	$.each($("section .bg"), function(){
		bgArray.push({"$obj" : $(this)});
	});


	/**
	* Parallaxy
	*/

	function handleScroll(){
		
		/**
		* apply a transform to background images
		*/

		var scrollTop = $(window).scrollTop();

		$.each(bgArray, function(){
			var scrolly = (this.$obj.offset().top - scrollTop) * -0.5;
			scrolly = Math.round(scrolly * 100) / 100;
			this.$obj.css("transform", "translateY("+scrolly+"px)");
		});

	}

	var justInCase = 0;
	while(justInCase < 1000){
		setTimeout(function(){ handleScroll(); },justInCase);
		justInCase += 200;
	}


	// var throttledScroll = throttle(handleScroll, 100);

	$(window).on("scroll", function(){
		window.requestAnimationFrame(handleScroll);
	});



});
