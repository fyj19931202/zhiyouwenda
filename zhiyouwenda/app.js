var express = require('express');
// 处理 post 请求
var bodyParser = require('body-parser');
// 处理文件
var fs = require('fs');
// 处理文件上传
var multer = require('multer');
// 处理 cookie
var cookieParser = require('cookie-parser');
// 创建服务器对象
var app = express();
// 配置静态文件
app.use(express.static('www'));
// 解析 cookie 对象
app.use(cookieParser());
// 解析 post 请求参数
app.use(bodyParser.urlencoded({
	extended: true
}));

//-------------------------------------注册-----------------------------

app.post('/register',function(req,res){
	
	fs.exists('users',function(exi){
		if(exi){
			//文件存在，写入文件
			writeFile()
		}else{
			fs.mkdir('users',function(err){
			if(err){
				//创建失败
				res.status(200).json({
					code:3,
					message:'创建文件失败'
					
				})
				
			}else{
				//创建成功，写入文件
				writeFile()
			}
				
				
			})
			
			
		}
		
		
	})
	
	  function writeFile() {
		// 判断用户是否已经注册过
		var fileName = 'users/' + req.body.account + '.txt';
		fs.exists(fileName, function(exi) {
			if(exi) {
				// 用户存在，已经被注册
				res.status(200).json({
					code: 1,
					message: '用户已经存在，请重新注册'
				})
			} else {
				// 用户不存在，进行注册
				req.body.ip = req.ip;
				req.body.time = new Date();
				// 未注册，把用户信息写入到本地
				fs.writeFile(fileName, JSON.stringify(req.body), function(err) {
					if(err) {
						// 写入失败
						res.status(200).json({
							code: 2,
							message: '系统错误，写入文件失败'
						})
					} else {
						// 保存成功
						res.status(200).json({
							code: 3,
							message: '注册成功'
						})
					}
				});
			}
		});
	}
	
	
})

//---------------------------------------登录------------------------------

app.post('/login',function(req,res){
	// 根据 req.body.petname 去 users 文件夹中匹配文件
	var fileName = 'users/' + req.body.account + '.txt';
	// 查看 users 文件夹中是否有当前用户
	fs.exists(fileName,function(exi){
		if(exi){
			// 文件存在
			// 读取 fileName 路径的文件，进行密码比较
			fs.readFile(fileName,function(err,data){
				if(err){
					// 系统读取失败
					res.status(200).json({code:1,message:'系统错误，读取文件失败'})
				}else{
					// 读取成功，进行密码比较
					var user = JSON.parse(data);
					if(req.body.pwd == user.pwd){
						// 登录成功
						// 设置应用发起的 http 请求时提交的cookie值
						// 调用此接口所有的请求都生效
						// 把 petname 设置到 cookie 里
						// 1. 有利于下次登录
						// 2. 保存用户信息
						var expires = new Date();
						expires.setMonth(expires.getMonth() + 1);
						// 第一个参数为 保存的名字
						// 第二个参数为 保存的值
						// 第三个参数为 过期时间
						res.cookie('petname',req.body.account,{expires});
						// 登录成功
						res.status(200).json({code:3,message:'登录成功'})
					}else{
						// 密码错误，登录失败
						res.status(200).json({code:2,message:'密码错误，请重新输入'})
					}
					
				}
			});
			
		}else{
			// 文件不存在
			res.status(200).json({code:0,message:'用户不存在，请先去注册'});
		}
		
	})
	
	
});






app.listen(3000, function() {

	console.log('世 界 之 窗   -->  -->  正 在 开 启  -->  --> ')

})

