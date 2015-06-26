
var bgArray = [];

$(document).on("ready", function(){
	
	/**
	* Setup
	*/

	$(window).scrollTop(0);

	$.each($(".parallax-item"), function(){
		bgArray.push({"$obj" : $(this), "speed" : $(this).attr("data-parallax-speed")});
	});


	/**
	* Parallaxy
	*/

	function handleScroll(){
		
		/**
		* apply a transform to background images
		*/

		// calc scrollTop once
		var scrollTop = $(window).scrollTop();

		// loop parallax-items and multiply their transform
		$.each(bgArray, function(){
			this.$obj.css("transform", "translateY(" + (scrollTop * this.speed * -1) + "px)")
		});

	}

	var justInCase = 0;
	while(justInCase < 1000){
		setTimeout(function(){ handleScroll(); },justInCase);
		justInCase += 200;
	}

	$(window).on("scroll", function(){
		window.requestAnimationFrame(handleScroll);
	});



});
