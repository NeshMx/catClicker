$('#myCat').click(function() {
    $('#clicks').html(function(i, val) {
        return val*1+1;
    });
});