/**
* Utilities
*/
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}


var sectionsArray = [];

$(document).on("ready", function(){
	
	/**
	* Setup
	*/

	$(window).scrollTop(0);

	$.each($("section"), function(){
		sectionsArray.push({ "$obj": $(this), "seen" : false });
	});


	/**
	* Parallaxy
	*/

	function handleScroll(){
		
		var windowScroll = $(window).scrollTop();

		/**
		* Check if bottom of section comes into view
		*/
		$.each(sectionsArray, function(){
			
			var offset = this.$obj.offset(),
				height = this.$obj.height();

			var sectionTop = offset.top;
			var sectionBot = offset.top + height;

			if(this.seen && (windowScroll > sectionBot || windowScroll < sectionTop)){ //if seen, and either 1. scrolled past bottom, or 2. scroll up past top
				console.log("Bye Bye", this.$obj);
				this.$obj.removeClass("fixed");
				this.seen = false;
			} else if(!this.seen && windowScroll >= sectionTop && windowScroll < sectionBot){ // if unseen, 1. our scroll is either at or past our top, and 2. our scroll hasn't passed our bottom
				console.log("Hey there", this.$obj);
				this.$obj.addClass("fixed");
				this.seen = true;
			}		
		});
	}

	handleScroll();

	$(window).on("scroll", function(){
		window.requestAnimationFrame(handleScroll);
	});



});
