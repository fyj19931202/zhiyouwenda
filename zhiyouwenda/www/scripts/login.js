$('.glyphicon-chevron-left').click(function(){
	
	history.go(-1);
	
})
$('.glyphicon-plus-sign').click(function(){
	
	location.href = 'register.html'
	
})

$('form').submit(function(e){
	e.preventDefault()
	var data = $(this).serialize();
	
	console.log(data)
	$.post('/login',data,function(resData){
		alert(resData.message)
		if(resData.code == 3){
			
			
			location.href = 'index.html'
			
		}
		
		
	})
	
})
