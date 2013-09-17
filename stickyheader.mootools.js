window.addEvent('domready', function() {
	var tables = $$('table.stickyHeader');
	tables.each(function(table){
		var theadClone = table.getElement('thead').clone(true);
		var stickyHeader =  new Element('div', {'class':'hide stickyHeader'})
		stickyHeader.set('html', '<table></table>');
		theadClone.inject(stickyHeader.getElement('table'));
		stickyHeader.inject(table, 'after');
		
		var tableHeight = table.getStyle('height').toInt();
		var tableWidth = table.getStyle('width').toInt();
		var tableWidth = table.getStyle('width').toInt(); + table.getStyle('padding-left').toInt(); + table.getStyle('padding-right').toInt();
		
		var headerCells = table.getElements('th');
		var headerCellHeight = headerCells[0].getStyle('height').toInt();
		
		var no_fixed_support = false;
		if (stickyHeader.getStyle('position') == "absolute") {
			no_fixed_support = true;
		}
		
		var stickyHeaderCells = stickyHeader.getElements('th');
		stickyHeader.setStyle('width', tableWidth);

		var cellWidths = [];
		for (var i = 0, l = headerCells.length; i < l; i++) {
			var headerCell = headerCells[i]
			var paddingLeft = headerCell.getStyle('padding-left').toInt();
			var paddingRight = headerCell.getStyle('padding-right').toInt();
			var borderLeft = headerCell.getStyle('border-left-width').toInt();
			if (isNaN(borderLeft)) { borderLeft = 0; }
			var borderRight = headerCell.getStyle('border-right-width').toInt();
			if (isNaN(borderRight)) { borderRight = 0; }
			var width = headerCell.getStyle('width').toInt();
			var cellWidth = width + paddingLeft + paddingRight + borderLeft + borderRight;
			cellWidth = cellWidth + "px";
			document.title = "cellwidth: " + cellWidth + "; width: " + width + "; paddingLeft: " + paddingLeft + "; paddingRight: " + paddingRight + "; borderLeft: " + borderLeft + "; borderRight: " + borderRight;
			cellWidths[i] = cellWidth;
		}
		
		for (var i = 0, l = headerCells.length; i < l; i++) {
			stickyHeaderCells[i].setStyle('width', cellWidths[i]);
		}

		var cutoffTop = table.getCoordinates().top;
		var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
		
		window.addEvent('scroll',function() { 
			var currentPosition = document.getScroll().y;
			if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
				stickyHeader.removeClass('hide');
				if (no_fixed_support) {
					stickyHeader.setStyle('top', currentPosition + 'px');
				}
			}
			else {
				stickyHeader.addClass('hide');
			}
		});
	});
});