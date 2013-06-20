$(document).ready(function () {
	var tables = $('table.stickyHeader');
	tables.each(function(i){
		var table = tables[i];
		var tableClone = $(table).clone(true).empty().removeClass('stickyHeader');
		var theadClone = $(table).find('thead').clone(true);
		var stickyHeader =  $('<div></div>').addClass('stickyHeader hide').attr('aria-hidden', 'true');
		stickyHeader.append(tableClone).find('table').append(theadClone);
		$(table).after(stickyHeader);
		
		var tableHeight = $(table).height();
		var tableWidth = $(table).width() + Number($(table).css('padding-left').replace(/px/ig,"")) + Number($(table).css('padding-right').replace(/px/ig,"")) + Number($(table).css('border-left-width').replace(/px/ig,"")) + Number($(table).css('border-right-width').replace(/px/ig,""));
		
		var headerCells = $(table).find('thead th');
		var headerCellHeight = $(headerCells[0]).height();
		
		var no_fixed_support = false;
		if (stickyHeader.css('position') == "absolute") {
			no_fixed_support = true;
		}
		
		var stickyHeaderCells = stickyHeader.find('th');
		stickyHeader.css('width', tableWidth);
		
		for (i=0; i<headerCells.length; i++) {
			var headerCell = $(headerCells[i]);
			var cellWidth = headerCell.width();
			$(stickyHeaderCells[i]).css('width', cellWidth);
		}
		
		var cutoffTop = $(table).offset().top;
		var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
		
		$(window).scroll(function() { 
		var currentPosition = $(window).scrollTop();
			if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
				stickyHeader.removeClass('hide');
				if (no_fixed_support) {
					stickyHeader.css('top', currentPosition + 'px');
				}
			}
			else {
				stickyHeader.addClass('hide');
			}
		});
	});
});
