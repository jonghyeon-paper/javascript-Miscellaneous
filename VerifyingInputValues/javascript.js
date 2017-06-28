/**
 * 2017.06.28 등록
 * 숫자형식의 input의 값 입력을 확인
 * - html5에서는 한글이외의 값 입력불가능
 * - 단, 한글은 1글자가 입력됨. 입력되기는 하나 해당 필드의 값 자체가 유효하지 못함. 실재 값은 빈 값으로 나타남.
 */
VerifyingInputValues = {};

VerifyingInputValues.onlyNumbersPassed = function() {
	
	if (detectIE() === -1) {
		var previousValue = '';
		$('body').on('keydown', 'input[type=number]', function(event){
			// 1
			previousValue = $(this).val();
		}).on('keypress', 'input[type=number]', function(event){
			// 2
			return (event.keyCode >= 48 && event.keyCode <= 57);
		}).on('input', 'input[type=number]', function(){
			// 3
			var $inputObject = $(this);
			var textValue = $inputObject.val();
			
			// case of explorer
//			var numberRegexp = /\D/ig;
//			if (numberRegexp.test(textValue)) {
//				$inputObject.val(textValue.replace(numberRegexp,''));
//				alert('숫자만 입력 가능합니다.');
//			}
		}).on('keyup', 'input[type=number]', function(event) {
			// 4
			var $inputObject = $(this);
			
			/*
			 * case of chrome
			 * - 숫자형식의 경우 한글이 한글자는 입력됨. 그 상태로 포커스가 없어지면 한글이 남아있게 됨. 하지만 해당영역의 값은 없음.(빈 공간)
			 * - 비어있는 상태에서 처음으로 한글을 입력하고 포커스를 없에면 한글 한글자는 유지되지만 해당 값은 없음.
			 * - 이전 값도 빈 값인 상태에서 삭제 키(backspace, delete)가 아닌 키값 입력 시, 변경 된 값도 빈 값이면 해당영역에 빈 값을 할당.
			 */
			if (previousValue === '' &&
					(event.keyCode !== 8 && event.keyCode !== 46) && // 8:backspace, 46:delete
					$inputObject.val() === '') {
				
				$inputObject.val('');
			}
			
			/*
			 * case of chrome
			 * - 이전 값이 있는 상태에서 삭제 키(backspace, delete)가 아닌 키값 입력 시, 변경 된 값이 빈 값이면 해당영역에 이전값을 할당. 
			 */
			if (previousValue !== '' &&
					(event.keyCode !== 8 && event.keyCode !== 46) && // 8:backspace, 46:delete
					$inputObject.val() === '') {
				
				// 키입력 시 이전값을 가지고 있다가 숫자 이외의 값이 입력 시 이전값으로 설정
				$inputObject.val(previousValue);
				alert('숫자만 입력 가능합니다.');
			}
		}).on('change', 'input[type=number]', function(){
			// down and change
			//console.log('change > ' + ' / ' + $(this).val());
		});
	} else {
		$('body').on('keydown', 'input[type=number]', function(event){
			// 1
		}).on('keypress', 'input[type=number]', function(event){
			// 2
			return (event.keyCode >= 48 && event.keyCode <= 57);
		}).on('input', 'input[type=number]', function(){
			// 3
			var $inputObject = $(this);
			var textValue = $inputObject.val();
			
			/*
			 * case of internet explorer
			 * 비어있는 상태에서 한글을 입력하면 입력 됨. 단, 포커스가 없어지면 삭제 됨. 입력 자체가 되지 않도록 처리.
			 */
			if (textValue === '' &&
					(event.keyCode !== 8 && event.keyCode !== 46) && // 8:backspace, 46:delete
					textValue === '') {
				
				$inputObject.val('');
			}
			
			/*
			 * case of explorer
			 * 값이 있는 상태에서 한글이 입력 됨. 포커스가 없어져도 값이 유지 됨.
			 */
			var numberRegexp = /\D/ig;
			if (numberRegexp.test(textValue)) {
				$inputObject.val(textValue.replace(numberRegexp,''));
				alert('숫자만 입력 가능합니다.');
			}
		}).on('keyup', 'input[type=number]', function(event) {
			// 4
		}).on('change', 'input[type=number]', function(){
			// change
			//console.log('change > ' + ' / ' + $(this).val());
		});
	}
};

detectIE = function() {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return -1;
}