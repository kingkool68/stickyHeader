Event.observe(window,'load',function() {
	var tables = $$('table.stickyHeader');
	tables.each(function(table){
		var theadClone = table.select('thead')[0].cloneNode(true);
		var stickyHeader =  new Element('div', {'class':'hide stickyHeader'}).update('<table></table>');
		$(table).insert({'after':stickyHeader});
		stickyHeader.select('table')[0].appendChild(theadClone);
		
		var tableHeight = table.getHeight();
		var tableWidth = table.getWidth();
		
		var headerCells = table.select('thead th');
		var headerCellHeight = headerCells[0].getHeight();
		var no_fixed_support = false;
		if (stickyHeader.getStyle('position') == "absolute") {
			no_fixed_support = true;
		}
		var stickyHeaderCells = stickyHeader.select('th')
		stickyHeader.style.width = tableWidth + 'px';

		var cellWidths = [];
		for (var i = 0, l = headerCells.length; i < l; i++) {
			var paddingLeft = headerCells[i].getStyle('padding-left').replace(/px/ig,"");
			var paddingRight = headerCells[i].getStyle('padding-right').replace(/px/ig,"");
			var borderLeft = headerCells[i].getStyle('border-left-width').replace(/px/ig,"");
			if (isNaN(borderLeft)) { borderLeft = 0; }
			var borderRight = headerCells[i].getStyle('border-right-width').replace(/px/ig,"");
			if (isNaN(borderRight)) { borderRight = 0; }
			var width = headerCells[i].getWidth();
			var cellWidth = width - paddingLeft - paddingRight - borderLeft - borderRight;
			document.title = "cellwidth: " + cellWidth + "; width: " + width + "; paddingLeft: " + paddingLeft + "; paddingRight: " + paddingRight + "; borderLeft: " + borderLeft + "; borderRight: " + borderRight;
			cellWidth = cellWidth + "px";
			cellWidths[i] = cellWidth;
		}

		for (var i = 0, l = headerCells.length; i < l; i++) {
			stickyHeaderCells[i].setStyle({ 'width': cellWidths[i] });
		}

		var cutoffTop = table.cumulativeOffset()[1];
		var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
		
		Event.observe(window,'scroll',function() {
		var currentPosition = document.viewport.getScrollOffsets()[1];
		if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
			stickyHeader.removeClassName('hide');
			if (no_fixed_support) {
					stickyHeader.style.top = currentPosition + "px";
			}
		}
		else {
			stickyHeader.addClassName('hide');
		}						   
		});
	});
});