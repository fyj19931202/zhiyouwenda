$('.glyphicon-chevron-left').click(function(){
	
	history.go(-1);
	
})
$('.glyphicon-home').click(function(){
	
	location.href = 'index.html'
	
})

$('form').submit(function(e){
	e.preventDefault()
	if($('#pwd').val() !== $('#tpwd').val()){
		
		alert('两次输入密码不一样')
	}
	var data = $(this).serialize()
	console.log(data)
	$.post('/register',data,function(resData){
//		alert(resData.message)
		if(resData.code == 3){
			
			location.href = 'login.html'
			
		}
		
		
	})
	
})





