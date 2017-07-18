//加载模块块
var express = require('express')
var bodyparser = require('body-parser')

// 处理缓存cookie
var cookieParser = require('cookie-parser');

//文件对象
var fs = require('fs');
var multer = require('multer');

// 配置储存上传文件的 storage
var storage = multer.diskStorage({
    // 图片文件夹存储路径
	destination: 'www/uploads',
    // 文件名称
	filename: function(req,res,callback){
		var petname = req.cookies.petname;
		callback(null,petname + '.jpg')
	}
});
var upload = multer({storage});


// 创建服务器对象
var app = express();

// 配置静态文件夹
app.use(express.static('wwwroot'))

// 解析post请求参数
//extended:true /false 都可以编码           false编码范围比较小      true 编码范围很广可以是整个请求的数据进行编码
app.use(bodyparser.urlencoded({extended:true}))

// 解析cookie参数的中间件
app.use(cookieParser());










app.listen(3000, function() {

	console.log('世 界 之 窗   -->  -->  正 在 开 启  -->  --> ')

})

