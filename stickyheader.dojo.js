dojo.addOnLoad(window, function(){
	var tables = dojo.query('table.stickyHeader');
	dojo.forEach(tables, function(table){
		var theadClone = dojo.clone(dojo.query(table).query('thead')[0]);
		var stickyHeader = dojo.query(dojo.create('div'))
    		.addClass('hide stickyHeader')
			.addContent('<table></table>')
    		.place(table,'after');
		dojo.place(theadClone,dojo.query(stickyHeader).query('table')[0]);
		
		var tableHeight = dojo.style(table, 'height');
		var tableWidth = dojo.style(table, 'width');
		
		var headerCells = dojo.query(table).query('th');
		var headerCellHeight = dojo.style(headerCells[0], 'height');
		
		var no_fixed_support = false;
		if (dojo.style(stickyHeader[0],'position') == "absolute") {
			no_fixed_support = true;
		}
		
		var stickyHeaderCells = dojo.query(stickyHeader).query('th');
		dojo.style(stickyHeader[0],'width', tableWidth + 'px');

		var cellWidths = [];
		for (var i = 0, l = headerCells.length; i < l; i++) {
			var headerCell = headerCells[i];
			var paddingLeft = dojo.style(headerCell,'padding-left');
			var paddingRight = dojo.style(headerCell,'padding-right');
			var borderLeft = dojo.style(headerCell,'border-left-width');
			if (isNaN(borderLeft)) { borderLeft = 0; }
			var borderRight = dojo.style(headerCell,'border-right-width');
			if (isNaN(borderRight)) { borderRight = 0; }
			var width = dojo.style(headerCell,'width');
			var cellWidth = width - paddingLeft - paddingRight - borderLeft - borderRight;
			cellWidth = cellWidth + "px";
			document.title = "cellwidth: " + cellWidth + "; width: " + width + "; paddingLeft: " + paddingLeft + "; paddingRight: " + paddingRight + "; borderLeft: " + borderLeft + "; borderRight: " + borderRight;
			cellWidths[i] = cellWidth;
		}

		for (var i = 0, l = headerCells.length; i < l; i++) {
			dojo.style(stickyHeaderCells[i],'width', cellWidths[i]);
		}
		
		var cutoffTop = dojo.coords(table, 'includeScroll').t
		var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
		
		dojo.connect(window, 'scroll', function() {
			var currentPosition = dojo.coords(document, 'includeScroll').y;
			if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
				dojo.removeClass(stickyHeader[0], 'hide');
				if (no_fixed_support) {
					dojo.style(stickyHeader[0],'top', currentPosition + 'px');
				}
			}
			else {
				dojo.addClass(stickyHeader[0], 'hide');
			}
		});
	});
});