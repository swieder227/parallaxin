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
		$(this).css("height", $(window).height());

		sectionsArray.push({"$obj": $(this), "fixed": false});
	});


	/**
	* Parallaxy
	*/

	function handleScroll(){
		
		/**
		* Check if bottom of section comes into view
		*/
		$.each(sectionsArray, function(){
			var offset = "100%";
			var checkInView = this.$obj.offset().top - this.$obj.height() * (parseInt(offset) * 0.01);

			if( !this.fixed && $(window).scrollTop() > checkInView ){
				this.fixed = true;
				console.log(this.$obj);
			}
		});
	}

	handleScroll();

	var throttledScroll = throttle(handleScroll, 100);

	$(window).on("scroll", throttledScroll);



});
