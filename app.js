/* ///////////////////////////////////////////////////////////////////////////////

SOURCES: 
- http://api.jquery.com/jQuery.ajax/
- http://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript

TIME TO COMPLETE: 1.5 hours 

*/ /////////////////////////////////////////////////////////////////////////////// 

$(document).ready(function() {

  var updateField = function(value) {
    $('.input-field').val(value);
  }

  var intervalId;
  var requestWaiting = function(requestType) {
    var text = 'Please wait for ' + requestType + '.';
    $('.input-field').val(text);

    intervalId = setInterval(function(){
      updateField($('.input-field').val() + '.');
    }, 1000);
  };

  $('.generate-word').click(function(){
    var currentWord = $('.input-field').val();
    requestWaiting('word');
    $.ajax({
      type: 'GET',
      url:  'http://oseberg.io/interview/word_generator.php',
      dataType: 'html',
      success: function(data, status, obj) {
        clearInterval(intervalId);
        updateField(data);
      },
      error: function(obj, err, exception) {
        clearInterval(intervalId);
        updateField(currentWord);
        alert(err + ': ' + exception);
      }
    })
  });

  $('.transform-word').click(function(){
    var currentWord = $('.input-field').val();
    var url =  'http://oseberg.io/interview/shifter.php?word=' + currentWord;
    if ( !currentWord ) {
      alert("Please generate a word to transform!");
    } else {
      requestWaiting('transformation');
      $.ajax({
        type: 'GET',
        url:  url,
        dataType: 'html',
        success: function(data, status, obj) {
          clearInterval(intervalId);
          updateField(data);
        },
        error: function(obj, err, exception) {
          clearInterval(intervalId);
          updateField(currentWord);
          alert(err + ': ' + exception);
        }
      })
    }
  })

});



