$(document).ready( function () {
    if ($("#placeholder").length > 0) {
			var d0 = [ [-1, 5] ];
			var d1 = [ [0, 3] ];
			var d2 = [ [1, 13] ];
			$.plot($("#placeholder"), [
	        												{
													            data: d0,
													            bars: { show: true },
																	    color: 2,
							
													        },
																	{
													            data: d1,
													            bars: { show: true },
																	    color: 0,
							
													        },
																	{
													            data: d2,
													            bars: { show: true },
																	    color: 8
													        }
	    ]);
	    
		}
});
