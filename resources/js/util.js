/**
 * JAVASCRIPT UTIL FUNCTION 정의
 * 2018. 07. 31., ybh27ann@naver.com
 */


function historyBack() {
	var url = window.location.href;
	if(url.indexOf("/main") === -1){
		history.back();
	}
}
/**
 * 데이터 공백여부 체크하여 반환
 * @param obj 검사할 오브젝트 객체
 * @returns true:데이터없음
 */
function isEmpty(obj) {
	if( obj == null ) {
		return true;
	}
	if( obj.trim() === "" ) {
		return true;
	}
	return false;
}
/**
 * 이메일 패턴 검사
 * @param mail 검사할 메일 문자열
 * @returns true:이메일맞음
 */
function isEmail(mail) {
	if(!/^[\w_-]+(\.[\w_-]+)*@[\w_-]+(\.[\w_-]+)*\.\w{2,3}$/.test(mail)) {
		return false;
	}
	return true;
}
/**
 * 숫자인지 여부 검사
 * @param num 검사할 문자열
 * @returns true:숫자
 */
function isNumeric(num) {
	var numLen = num.length;
	for( var i = 0 ; i < numLen ; i++ ) {
		var chr = num.charAt(i);
		if( '0' > chr || '9' < chr ) {
			return false;
		}
	}
	return true;
}

/**
 * 비밀번호 패턴 검사
 * 영어,숫자,특수문자중 2가지를 조합하여 8자리 이상 20자리 이하
 * @param password
 * @returns {boolean}
 */
function isPassword(password) {
	return /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/.test(password);
	/*return /^((?=.*[A-Za-z])(?=.*\\d))|((?=.*[A-Za-z])(?=.*\\W))|((?=.*\\d)(?=.*\\W)).{8,20}$/.test(password);*/
}
/**
 * 문자열이 한글로 이루어져 있는지 검사
 * @param param 검사할 문자열
 * @returns true : 영문과 숫자로 이루어진 문자열
 */
function isAlphaNumeric(param) {
	var result = false;
	if (param == "" && param == null) {
		result = false;
	} else {
		if (param.search(/[\ㄱ-ㅎㅏ-ㅣ|가-힣]+$/gi) >= 0) {
			result = false;
		} else {
			result = true;
		}
	}
	return result;
}
/**
 * 사업자 등록번호를 검사한다.
 * @param 사업자 등록번호
 * @return true:유효한 등록번호
 */
function checkBizSocialNumber(strNo) {
	var sum = 0;
	var getlist = new Array(10);
	var chkvalue = new Array("1","3","7","1","3","7","1","3","5");

	for (var i=0;i<10;i++){
		getlist[i] = strNo.substring(i,i+1);
	}

	for (var i = 0; i < 9; i++){
		sum += getlist[i]*chkvalue[i];
	}
	sum = sum + parseInt((getlist[8] * 5) / 10) ;
	sidliy = sum % 10;
	sidchk = 0;

	if ( sidliy != 0 ) {
		sidchk = 10 - sidliy;
	} else {
		sidchk = 0;
	}
	if ( sidchk != getlist[9] ) {
		return false;
	}
	return true;
}
/**
 * Ajax response status check and return body
 * @param response 응답 데이터 전체 데이터
 * @returns boolean body data
 */
function ajaxResponse(res) {
	// 데이터 처리 성공
	let success = '0000';
	// 데이터 처리 실패
	let fail = '0001';
	// Login 에러
	let loginFail = '1013';
	let nonAvailable = '0104';
	// http 응답 코드
	let code = res.status.code;
	// 성공여부
	if(code == success) {
		return true;
	} else {
		if(code == loginFail || code == nonAvailable || code == fail) {
			let msg = res.status.message;
			alert(msg);
		} else {
			// http status
			let status = res.status.status;
			let code = res.status.code;
			// 예외처리 부가정보
			let moreInfo = status.moreInfo;
			// 의도된 실패 코드가 아닐 경우 에러로 판단하여 페이지 이동 처리한다.
			window.location = '/error?code='+status+'&status='+code+'&message='+moreInfo;
		}
		return false;
	}
}
/**
 * 쿠키정보 조회
 * @param id 추출할 쿠키 id
 * @returns 쿠키값
 */
function getCookie(id) {
	// userid 쿠키에서 id 값을 가져온다.
	var cook = document.cookie + ";";
	var idx = cook.indexOf(id, 0);
	var val = "";
	if(idx != -1) {
		cook = cook.substring(idx, cook.length);
		begin = cook.indexOf("=", 0) + 1;
		end = cook.indexOf(";", begin);
		val = unescape( cook.substring(begin, end) );
	}
	return val;
}
/**
 * 쿠키 정보 업데이트
 * @param id 쿠키 저장 id
 * @param value 쿠키 저장값
 * @param expiredays 저장 유효기간
 */
function updateCookie(id, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + parseInt(expiredays));
	document.cookie = id + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
}
/**
 * 쿠키 정보 삭제
 * @param id 쿠키 삭제 id
 */
function removeCookie(id) {
	var today = new Date();
	today.setDate(today.getDate() -1);
	document.cookie = id + "=; path=/; expires=" + today.toLocaleDateString() + ";";
}
/**
 * 문자열 입력 시 최대 글자수 제한
 * @param filed 제어할 필드
 * @param maxCount 최대 글자수
 */
function inputlangthChecker(filed, maxCount) {
	$(filed).on('keyup', function() {
        if($(this).val().length > maxCount) {
            $(this).val($(this).val().substring(0, maxCount));
        }
    });
}
/**
 * 날짜 yyyy-MM-dd 포맷으로 반환
 * @param date date객체
 * @return yyyy-MM-dd 포맷 날짜 객체
 */
function getDefaultDateFormat(date) {
	var year = date.getFullYear();		    	//yyyy 년도
	var month = (1 + date.getMonth());			//월
	month = month >= 10 ? month : '0' + month;  //월 두자리로 저장
	var day = date.getDate();					//일
	day = day >= 10 ? day : '0' + day;			//일 두자리로 저장
	return year + '-' + month + '-' + day;
}
/**
 * TextArea 글자 갯수제한
 * onkeyup="length_count(this, 80)" onchange="length_count(this, 80)" onfocus="length_count(this, 80)"
 * @param filed Text 필드
 * @param max_count 글자수
 */
function length_count(filed, max_count){
	var str;
	var str_count = 0;
	var str_length = filed.value.length;

	for(var k=0; k < str_length; k++){
		str = filed.value.charAt(k);
		if(escape(str).length > 4){
			str_count += 2;
		}else{
			// (\r\n은 1byte 처리)
			if(escape(str) != '%0A') {
				str_count++;
			}
		}
		if(max_count < str_count){
			alert("글자수가 "+ max_count +" byte 이상은 사용불가능합니다");
			if(escape(str).length > 4){
				str_count -= 2;
			}else{
				str_count--;
			}
			filed.value = filed.value.substring(0,k);
			break;
		}
	}
}

/**
 * 숫자 콤마 찍기
 * @param x
 * @returns {string}
 */
function numberWithCommas(price) {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 오늘 날짜 반환하기
 * @returns String yyyy-MM-dd
 */
function getRecentDate() {
	let dt = new Date();
	let recentYear = dt.getFullYear();
	let recentMonth = dt.getMonth() + 1;
	let recentDay = dt.getDate();

	if(recentMonth < 10) {
		recentMonth = "0" + recentMonth;
	}

	if(recentDay < 10) {
		recentDay = "0" + recentDay;
	}
	return recentYear + "-" + recentMonth + "-" + recentDay;
}

/**
 * 숫자 표현
 * @param section 콤마 섹션
 * @param decimal 소수점 자릿수
 */
Number.prototype.format = function (section, decimal) {
	var re = '\\d(?=(\\d{' + (section || 3) + '})+' + (decimal > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~decimal)).replace(new RegExp(re, 'g'), '$&,');
};

/**
 * 팝업
 */
function modalUi(){
	modalSizing();
	function modalSizing(){
		$('.modal').each(function(){
			var layerResize = $(window).height();
			var layerHeight = $(this).outerHeight();
			var layerWidth = $(this).outerWidth();
			$(this).css({
				// marginLeft : -layerWidth/2,
				marginTop : -layerHeight/2
			});

			// $(this).find('.modal-body').css({
			//     maxHeight : layerResize/2
			// });
		});
	}
	$('.modalLoad').on('click',function(e){
		e.preventDefault();
		var $self = $(this);
		var $target = $($(this).attr('href'));
		var $targetId = $target.attr('id');


		createDim();
		$target.fadeIn(400);

		// close and focusout
		var isVisible = $target.is(':visible');
		var modalLength = $('.modal:visible').length;

		$target.find(".ico-close").on('click',function(e){
			e.preventDefault();
			$target.fadeOut(250);
			$self.focus();
			$(this).off('click');
			if (isVisible) {
				if (modalLength > 1) {
					$target.fadeOut(250);
				} else {
					if($(".gnb-container").hasClass("active")){
						$(".dim").css("z-index", "99996");
					}else{
						removeDim();
					}
				}
			}
		});

		$target.find(".ok-hide").on('click',function(e){
			e.preventDefault();
			$target.fadeOut(250);
			$self.focus();
			if (isVisible) {
				if (modalLength > 1) {
					$target.fadeOut(250);
				} else {
					removeDim();
				}
			}
		});
	});
}

function checkUserLoadUrl(boolean, url) {
	if (boolean) {
		window.location = url;
	} else {
		alert('로그인이 필요한 서비스입니다.');
	}
}

/**
 * 로딩 팝업 노출
 */
function openLoadingPopup() {
	$.ajax({
		url: "/loadingPopup",
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		async: false,
		dataType: 'html',
		success: function(html) {
			$('body').append('<div id="mask"></div>');
			$('#mask').html(html);
		},
		error: function(e) {
		}
	});
}