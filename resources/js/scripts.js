$(document).ready(function(){
	userAgentCheck();
	headerUi();
	layoutSystem();
	tabUi();
	btnUi();
	noticeUi();
	libDatepicker();
	tooltipUi();

	//if($('.interaction').length){
		// $('body').addClass('inherit-white');
	//}
	//if($('.verification-guide').length){
		//$('body').addClass('transparent');
	//}
	// if($('.product-list').length){
	//     $('body').addClass('sofe-white');
	// }
	// 단독 UI none common
	if($('.toggle-btn').length){
		$('.toggle-btn').on('click', function(e){
			e.preventDefault();
			$(this).toggleClass('active');
			$('.toggle-cont, .lt-min').toggleClass('active');
			$('.fixed-item').next('.app-section').toggleClass('toggle-padding');
			$(this).parents('.fixed-add').find('.app-inner').toggleClass('border');

			$('.toggle-cont').each(function(){
				if ($(this).is(':visible')) {
					$('.toggle-btn').text('열기');
				} else {
					$('.toggle-btn').text('접기');
				}
			});
		});
	}
});

$(window).on('scroll touchmove', function() {
	subHeaderInteractionUi();
	$('.tooltip-desc').fadeOut(250);
});

function libDatepicker(){
	$('.datepicker').datepicker({
		dateFormat: 'yy-mm-dd',
		showMonthAfterYear: true,
		//minDate:0, // today(0) 기준 이전 날짜 선택 불가
		changeMonth : true,
		changeYear : true,
		yearRange: 'c-100:c+100',
		onSelect: function() {
		}

	});
}

function userAgentCheck(){
	var ua = window.navigator.userAgent;
	var other = 999;
	var msie = ua.indexOf('MSIE ');

	if(ua.indexOf('Mobile') != -1){
		$('html').addClass('mobile');
	}

	if(ua.toLowerCase().indexOf('safari') != -1){
		if(ua.toLowerCase().indexOf('chrome') != -1){
			$('html').addClass('chrome');
		} else {
			$('html').addClass('safari');
		}
	} else if(ua.toLowerCase().indexOf('firefox') != -1){
		$('html').addClass('firefox');
	} else if(ua.toLowerCase().indexOf('msie 9.0') != -1){
		$('html').addClass('ie ie9');
	} else if(ua.toLowerCase().indexOf('msie 10.0') != -1){
		$('html').addClass('ie ie10');
	} else if(ua.toLowerCase().indexOf('rv:11.0') != -1){
		$('html').addClass('ie ie11');
	}

	if( ua.toLowerCase().indexOf('os x') != -1 ){
		$('html').addClass('ios');
	} else if( ua.toLowerCase().indexOf('Android') != -1 ){
		$('html').addClass('android');
	}
}
function headerUi(){
	$('header .btn-gnb').on('click', function(e){
		e.preventDefault();
		$('.gnb-container').addClass('active');
		createDim();
		/* Disable scroll */
		$('#container').on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	});
	$('header .ico-close').on('click', function(e){
		e.preventDefault();
		$('.gnb-container').removeClass('active');
		removeDim();
		/* Enable scroll */
		$('#container').off('scroll touchmove mousewheel');
	});

	if($('.gradient').length){
		$('header .app-inner').addClass('transparent');
	}
}
function noticeUi(){
	$('.notice-bar').find('.ico-close-w').on('click', function(e){
		e.preventDefault();
		$(this).parents('.notice-bar').fadeOut();
	});

	$('.notice-bar .slider-container').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		mobileFirst: false,
		autoplay: true,
		autoplaySpeed:3000,
		vertical:true,
		arrows: false,
		dots:false
	});
}

function layoutSystem(){
	// fix-button-area footer padding
	if($('.fix-button-area').length && $('footer').length){
		$('footer').addClass('active');
	}
	// center layoutSystem
	if($('.error-page').length){
		$('html').addClass('cont-center');
	}
	// 100vh content
	if($('.app-section').length === 1 && $('.app-section').hasClass('white')){
		$('#container').addClass('one-page');
	}
	// sub background
	if($('.fixed-item').length){
		$('body').addClass('white');
	}

	// column
	var countNum = $('.row'),
		classNum = countNum.length;
	for (var i = 0; i < classNum; i++) {
		var classCount = 'col-' + countNum.eq(i).find('li, .column').length;
		countNum.eq(i).addClass(classCount);
	}

	// interaction elements cont positionning
	if($('.interaction').length){
		var interEl = $('.interaction');
		var bottom = interEl.position().top + interEl.outerHeight(true);
		interEl.next('.app-section').css({paddingTop:bottom});
	}

	// fixed elements next content positionning
	if($('.fixed-item').length){
		var fixElH = $('.fixed-item').outerHeight();
		$('.fixed-item').next('.app-section').css('padding-top', fixElH + 14);
		$('.fixed-item').next('.fixed-cont').css('padding-top',fixElH);

	}

	// footer
	if($('footer').length){
		$('#container').addClass('pd-none');
	}

	// etc
	$('.side-menu').each(function(){
		if($(this).find('li').length > 1){
			$(this).addClass('centered');
		}
	});
	$('.input').each(function(){
		if($(this).find('label').length){
			$(this).parents('.form-group').addClass('margin');
			$(this).next('.button').addClass('margin');
		}
	});
	$('.type-btn').each(function(){
		var btnW = $(this).find('.btn').outerWidth()+7;
		// var btnW = $(this)[0].getBoundingClientRect();
		$(this).find('.boxInput').css('width', 'calc(100% - '+ btnW +'px)');
	});
}
function subHeaderInteractionUi(){
	var scrollTop = $(window).scrollTop();
	var headerOperationH = $('.cont-operation').outerWidth();
	var headerDeadlineH = headerOperationH + 76;

	if($('.interaction').length){
		$('.interaction').each(function(){
			var interEl = $(this);
			var elAni = interEl.find('h3,span,.info-container,.sub-main-info, .vertical-layout-inner, .txt-guide');
			var elAniMain = interEl.find('.info-container');
			var elNextEl = interEl.next('.app-section');
			var bottom = interEl.position().top + interEl.outerHeight(true); // offset bottom

			if(scrollTop === 0) {
				// default no scroll step
				elNextEl.css({paddingTop:300});
			} else {
				elNextEl.css({paddingTop:bottom});
			}

			if(scrollTop > 10){
				// down scroll last step
				elAniMain.css({
					  left : headerOperationH + 20,
					  width : 'calc(100% - ' + headerDeadlineH + 'px)',
					  height: '54px'
				});
				elAni.addClass('ani');
			}

			if(scrollTop < 70){
				// down scroll middle step
				elAniMain.css({
					  left : 'auto',
					  width : '100%',
					  height: '100px'
				});
				interEl.find('h3').addClass('it-pd-ctl');
				elAni.removeClass('ani');
			}

			if(scrollTop <= 20){
				// up scroll step
				elAniMain.css({
					height: '202px'
				});
				interEl.find('h3').removeClass('it-pd-ctl');
				elAni.removeClass('ani');
			}
		});
	}
}
function tabUi(){
	// click top animation
	$('.ofs-an').find('li').on('click',function(){
		$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
		   return false;
	});

	var tabTit = $('.txt-list-tab, .tab-indicator, .btn-card-tab'),
		tabBtn = tabTit.find('li');

	var tabCnt = $('.tab-content'),
		tabIdx = tabCnt.index();

	// load style settings
	tabCnt.not(':eq('+tabIdx+')').hide();
	tabTit.each(function(){
		var defaultTit = $(this).children('li').eq(0);
		defaultTit.addClass('on');
	});
	$('.tab-component').each(function () {
		var defaultCnt = $(this).children('.tab-content').eq(0);
		defaultCnt.addClass('on').show();
	});


	tabBtn.on('click', function(e){
		if($(this).attr('rel')){
			e.preventDefault();

			var $this = $(this),
				thisRel = $this.attr('rel');
				thisClass = $('.'+ thisRel);
				thisText = $this.text();
				target = thisClass.parent('.tab-component').attr('id');

			// content connect
			$('#' + target +  '>.tab-content').hide().removeClass('on');
			$('#' + target + ' .' + thisRel).show().addClass('on');

			// title styling and attr status
			$this.addClass('on').siblings().removeClass('on');
			thisClass.addClass('on').siblings().removeClass('on');
			$this.find('a').attr('title', thisText + 'tab active').parent().siblings().find('a').attr('title','');
		}
	});
}
function toggleListUi(){
	$('.lnb .lnb-dep2 > li > a').each(function(){
		if($(this).next('.lnb-dep3').length){
			$(this).parent().addClass('more');
			$(this).on('click',function(e){
				e.preventDefault();
				$(this).parent().toggleClass('on').siblings().removeClass('on');
			});
		}
	});
}

function tooltipUi(){
	$('.tooltip').each(function(){
		var tooltipThis = $(this);
		$(this).find('.ico-tooltip').on('click', function(e){
			e.preventDefault();
			tooltipThis.find('.tooltip-desc').fadeToggle(250);

		});
	});

	$('.tooltip.center').each(function(){
		var tooltipThis = $(this);
		var tooltipDescH = tooltipThis.find('.tooltip-desc').outerHeight() + 10;
		var tooltipDescW = tooltipThis.find('.tooltip-desc').outerWidth() / 2 - 10;
		tooltipThis.find('.tooltip-desc').offset({
			top:-tooltipDescH,
			left:-tooltipDescW
		});
	});
	$('.tooltip.left,.tooltip.right').each(function(){
		var tooltipThis = $(this);
		var tooltipDescH = tooltipThis.find('.tooltip-desc').outerHeight() + 10;
		tooltipThis.find('.tooltip-desc').offset({
			top:-tooltipDescH
		});
	});
}

function btnUi(){
	$('.btn-card-tab').each(function(){
		$(this).find('ul').append('<span class="btn-in-ui"></span>');
		$(this).find('li').on('click',function(){
			var thisBtnPosition = $(this).position().left;
			var thisInteractionUi = $('.btn-in-ui');
			if($(this).hasClass('on')){
				thisInteractionUi.css('left',thisBtnPosition);
			}
		});
	});



	$('.switch').each(function(){
		$(this).on('click', function(){
			if ($(this).hasClass('on')) {
				$(this).removeClass('on');
				$(this).find('input').attr('checked', false);
				return false;
			}else {
				$(this).addClass('on');
				$(this).find('input').attr('checked', true);
				return false;
			}
		});
	});

}

// Dim
function createDim(){
	if (!$('.dim').length) {
		$('body').append('<div class="dim"></div>');
	}
	$('.dim').fadeIn(250);
}
function removeDim(){
	$('.dim').fadeOut(250);
}


// 20200908 크몽 퍼블리셔(기발한기발자) 추가 스크립트
