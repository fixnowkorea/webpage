$(document).ready(function(){
  $('#issue-description').hide();

  // if $(window).size < 992px 이면 '뗌빵'을 없애는 것으로 해야하는데, 어떻게 하는지 모르겠다.

  }
)

var request = {
  device_id : null,
  device_name: null,
  device_color: null,
  device_issue: [],
  device_description: null,
  request_date: null,
  request_hour: null,
  request_name: null,
  request_number: null,
  request_address1: null,
  request_address2: null
}

// var request = {
//   device_id : 1,
//   device_name: 'iPhone 7',
//   device_color: 'red',
//   device_issue: ['디스플레이 교체', '기타'],
//   device_description: '폰이 안 켜집니다.',
//   request_date: '08/22/2017',
//   request_hour: '14',
//   request_name: 'testname',
//   request_number: '01012341234',
//   request_address1: '서울시 강남구 선릉로 551',
//   request_address2: '5층'
// }

function step1(id, name) {
  request.device_id = id;
  request.device_name = name;

  $('#request3').hide();
  if (id == 1){
    $('#request4_5').show();
  }
  else if (id == 2 || id == 4 || id == 5) {
    $('#request4_6').show();
  }
  else if (id == 3 || id == 6 || id == 7) {
    $('#request4_6s').show();
  }
  else if (id == 8 || id == 9) {
    $('#request4_7').show();
  }

  // Process bar에 Device이름 넣기
  $('#selectedDevice').html(request.device_name + '<br />');
}


function step2(color, colorkr) {
  request.device_color = color;

  $('#request4_5').hide();
  $('#request4_6').hide();
  $('#request4_6s').hide();
  $('#request4_7').hide();

  // process bar 바꾸는 키워드들
  $('#process1').attr('class', 'process-completed');
  $('#process2').attr('class', 'process-active');
  $('#selectedColor ').html(request.device_color);

  $('#request5').show();
}



function setIssutType(me) {
  var me = $(me);

  if (me.attr("data-selected") == "false") {

    // 선택이 되어있지 않으면 -> 선택
    me.attr('data-selected', 'true');
    me.css('border', '3px solid #1ab49c');

  } else if (me.attr('data-selected') == 'true') {

    me.attr('data-selected', 'false');
    me.css('border', '');

  }
}

$('#issue-etc').click(function(){
  var status = $(this).attr('data-selected');
  if (status == 'true') {
    $('#issue-description').show();
  }  else {
    $('#issue-description').hide();
  }
})


// 'Next" button safter 'issue selector'
function step3() {

  //each를 사용해서 Array에 val()저장
  $(".issue-name[data-selected='true']").each(
    function() {
      request.device_issue.push($(this).attr('value'))
    }
  )


  //etc를 선택했는데 설명이 비어있는 경우 설명을 채우도록
  if ($('#issue-etc').attr('data-selected') === 'true') {
    // 만약 textarea에 아무것도 없으면 입력하라고 alert
    if ($('#issue-description').find('textarea').val().length == 0) {
      return alert('증상을 입력해주세요')
    } else {
      //설명 저장
      request.device_description = $('#issue-description').find('textarea').val();
    }

  }

  $('#request5').hide();

  // process-bar 바꾸기
  $('#process2').attr('class', 'process-completed');
  $('#process3').attr('class', 'process-active');

  for (i=0; i < request.device_issue.length; i++) {
    $('#selectedIssue').append('<span>' + request.device_issue[i] + '</span><br />')
  }

  $('#request6').show();


}


$('.day').click(function(){
  //만약 일요일이라면 alert
  var day = $(this).find('.dayName').text();
  if (day == 'Sun') {
    alert('일요일은 쉽니다~~');

    $('.day').css('border', '').css('background-color', '').css('color', 'black').parent().parent().attr('data-selected', 'false');
    $('#timePicker').find('li').css('border-color', '#CACCCD').css('background-color', 'white').css('color', 'black').attr('data-selected', 'false');

    request.request_date = null;
    request.request_hour = null;
  } else {
    $('.day').css('border', '').css('background-color', 'white').css('color', 'black').parent().parent().attr('data-selected', 'false');
    $(this).css('border', '1px solid #1ab49c').css('background-color', '#1ab49c').css('color', 'white').parent().parent().attr('data-selected', 'true');
    $('#timePicker').find('li').css('border-color', '#CACCCD').css('background-color', 'white').css('color', 'black').attr('data-selected', 'false');

    request.request_date = $(this).parent().parent().attr('name');
    request.request_hour = null;

    $('#selectedDate').html(request.request_date + '<br />')
  }

})

$('#timePicker').find('li').click(function() {

  //.day중에 하나도 선택이 안 되어 있을 경우
  if (request.request_date == null) {
    alert('날짜를 지정해주세요')
  } else {
      // 시간이 선택되어있지 않았다면
    if ($(this).attr('data-selected') == 'false') {
      $('#timePicker').find('li').css('border-color', '#CACCCD').css('background-color', 'white').css('color', 'black').attr('data-selected', 'false');
      $(this).css('border-color', '#1AB49C').css('background-color', '#1ab49c').css('color', 'white').attr('data-selected', 'true');

      request.request_hour = $(this).attr('value');
      selectedHour =$(this).text();
      $('#selectedHour').html(selectedHour);
    } else {
      // 이미 선택되어있는걸 해제할 때
      $(this).css('border-color', '#CACCCD').css('background-color', '#FFF').css('color', 'black').attr('data-selected', 'false');

      request.request_hour = null;
    }

  }
});

function step4() {
  $('#process3').attr('class', 'process-completed');

  $('#request6').hide();
  $('#request7').show();


}

// request7 정보입력


// request7에 보완해야할 점

// 1. 주소기(address1) 직접 입력하려고 하면 주소찾기 버튼을 클릭해주세요 띄우기


//request7 끝나고 완료버튼 step5
function send() {
  request.request_name = $('#customerName').val();
  request.request_number = $('#customerNumber').val();
  request.request_address1 = $('#address1').val();
  request.request_address2 = $('#address2').val();
  var name = $('#customerName').val();
  var number = $('#customerNumber').val();
  var address1 = $('#address1').val();
  var address2 = $('#address2').val();

  if(name.trim().length == 0) {
    if(number.trim().length < 9) {
      if(address1.trim().length == 0) {
        if(address2.trim().length == 0) {
          alert('상세주소를 입력해 주세요')
        }
        alert('주소를 입력해 주세요')
      }
      alert('번호를 입력해 주세요')
    }
    alert('이름을 입력해 주세요')
  } else {
    // 전부 확인 했으면 ajax로 POST 넘기기
    $.ajax({
      method: "POST",
      url: "/request",
      data: request,
      success: function(result) {
        console.log('done')
      }
    })
  }
}
  // var name = $('#customerName').val();
  // var number = $('#customerNumber').val();
  // var address1 = $('#address1').val();
  // var address2 = $('#address2').val();
  //
  // //만약 이름이 빈칸이거나 띄어쓰기일(trim()) 경우에 경고창 띄우기
  //
  // // 전화번호가 특정 자릿 수 이하일 경우 경고창 띄우기 or 전화번호 검증 코드 갖다 쓰기
  //
  // // 주소지가 빈칸이거나 띄어쓰기일 경우에 경고창 띄우기
  //
  // // 상세주소가 빈칸이거나 띄어쓰기일 경우에 경고창 띄우기
  //
  //
  //
  //
  // // 모든 if문을 통과하게 되면
  // request.request_name = name;
  // request.request_number = number;
  // request.request_address1 = address1;
  // request.request_address2 = address2;


  // 하고 그 다음에 complete 페이지로 넘어가면서 form에 바인딩 하거나 AJAX방식으로 전송하기


//.day중에 하나도 선택이 안 되어 있을 경우
//moment.js -> utc 9000 변경 ( timezone )
//li 값은 disabled시킬 수 있는지


//request7 전화번호 (-) 코드 시작

// 전화번호 (-) 코드 끝










// function send() {
//
//   //여기서 request를 form에 바인딩 하거나 AJAX 방식으로 전송하면 됨.
//
// }
//
// // datePicker아래 모든 li들에 대해서 시간보다 작은 id는 다 안 보이거나 disabled돼라
// $(document).ready(function() {
//   // alert($('#issue-etc').attr('data-selected'))
//
//
//
//   $('#timePicker li').each(function() {
//     var i = $(this).attr('value').val();
//
//     alert(i)
//
//     if (request.repair_date = available_days[0].format('L') && i < available_days[0].format('H')){
//       $(this).css('color','#CACCCD');
//     }
//   })
// })



//빈캄
