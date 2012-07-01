$(document).ready( function () {
    if ($("#placeholder").length > 0) {
			var d2 = [ [-1, 5], [0, 3], [1, 13] ];
			$.plot($("#placeholder"), [
	        {
	            data: d2,
	            bars: { show: true, color: 'red' },
					    color: 2,
							
	        }
	    ]);
	    
		}
});
