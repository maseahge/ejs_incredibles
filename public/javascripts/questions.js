
$('body').on('click', '#deleteQuestion', function(){
  var id = $(this).children().text();
  var stupid = $(this);
  console.log(id);
  $.ajax({
    url: '/questions/'+id,
    type: 'DELETE',
    success: function(){
      console.log('deleted?');
      stupid.parent().hide();
    }
  });


});

