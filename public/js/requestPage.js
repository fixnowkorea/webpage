$("#modelSelect").on('click', function(event){
  event.preventDefault();
  event.stopPropagation();

  $.ajax({
    url: '/modelselect',
    type: "POST",
    contentType: "application/json",
    data: { field1: 1, field2: 2},
    complete: function() {
      console.log('process complete');
    },

    success: function(data) {
      console.log(data);
      console.log('process success');
    },
    error: function() {
      console.log('process error');
    }
  });

})
