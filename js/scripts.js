
// растяжение содеожимого ячеек для подстраивания под высоту окна
function resizeCols() {
	var self = $('.cell-inner');
	if(self.length) {
		self.css({
			'height': $(window).height() - self.offset().top
		});
	}
}




// открытие/закрытие формы поиска
function toggleForm() {
	var form = $('.search-form');
	var btn = form.find('.form-trigger');
	var field = form.find('.text');
	btn.click(function() {
		form.toggleClass('open');
		if(form.hasClass('open')) {
			field.focus();
		} else {
			field.val(''); // очищиаем поле
		}
	});
}




/** обрезка строк
* s- входная строка
* len - количество символов, которые должны отстаться
*/
function sliceStr(s, treshold) {
	var res = (s.length > treshold) ? s.slice(0, treshold): s
	return res;
}

// обрезка названий документов в списках
function sliceDocNames() {

	var treshold = 75;

	var list = $('.ses-doc-list .text');
	list.each(function() {
		var str = sliceStr($(this).text(), treshold);
		$(this).text(str + '...');
	});
}




// отступ контента в карточке сессий
function offsetTopCard() {
	var cnt = $('.ses-card-inner');
	cnt.each(function() {
		var self = $(this);
		self
			.find('.body')
			.css({
				'top': self.find('.header').outerHeight()
			});
	});
}




// открытие/закрытие списков файлов
function toggleFileList() {
	$('.type.folder').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('close');
	});
}




// открытие/закоытие списка комитетов
function committeesToggle() {

	var btn = $('.committees-toggle');
	var cell = btn.closest('.cell');
	var list = cell.find('.committees');
	var item = list.find('.committees-item');
	
//	var w = btn.closest('.cell').outerWidth();
//	list.css('width', w + 'px');

	btn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		list.css('width', cell.outerWidth() + 'px').toggleClass('open');
	});

	$(document).click(function() {
		list.removeClass('open');
	});

	item.click(function(e) {
		e.stopPropagation();
	});

}


// открытие/закрытие описания ошибки в модальном окне
function toggleErrorReport() {

	$('.modal').each(function() {

		var self = $(this);

		self.find('.top a').click(function(e) {
			e.preventDefault();
			self
				.find('.error-report')
				.toggleClass('collapse');
		});

	})

}



// события при загрузке DOM
$(function() {
	toggleForm();
	sliceDocNames();
	toggleFileList();
	committeesToggle();
	toggleErrorReport();
});




// события при загрузке всех ресурсов
$(window).load(function() {
	resizeCols();
	offsetTopCard();
});




// события при изменении размеров окна
$(window).resize(function() {
	resizeCols();
	offsetTopCard();
//	committeesToggle();
});