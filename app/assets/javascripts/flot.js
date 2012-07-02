var plot;


// assumes at least 3 options
function generateFlot(scoreArr) {
    
	if ($("#placeholder").length > 0) {
		var d0 = [ [-1, scoreArr[0]] ];
		var d1 = [ [0, scoreArr[2]] ];
		var d2 = [ [1, scoreArr[1]] ];
		var dataSet = [
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
    ];
		$.plot($("#placeholder"), dataSet);

	}
}