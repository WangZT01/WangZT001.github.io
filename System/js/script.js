window.onload=function(){

	var top=document.getElementById('top');
	var tli=top.getElementsByTagName('li');
	var add=document.getElementById('add');
	var btn=document.getElementById('btn');

	for(var i=1;i<tli.length;i++){
		tli[i].index=i;
		tli[i].onmouseover=function(){
			for(var j=1;j<tli.length;j++){
				tli[j].className='';
			}
			this.className='action';
		}
		tli[i].onmouseout=function(){
			for(var j=1;j<tli.length;j++){
				tli[j].className='';
			}
			tli[2].className='action';
		}
	}

	var	fileField=document.getElementById('fileField');
	fileField.onchange=function(){
		checkType(fileField);
	}
	var	fileField2=document.getElementById('fileField2');
	fileField2.onchange=function(){
		checkType(fileField2);
	}
	var	fileField3=document.getElementById('fileField3');

	var form1=document.getElementById('forms');
	var radio=form1.getElementsByTagName("input");
	var onepic=document.getElementById('onepic');
	var morepic=document.getElementById('morepic');
	var files=document.getElementById('files');
	var fileinput=form1.choosefile;

	for (var i = 0; i < fileinput.length; i++) {
		fileinput[i].index=i;
		fileinput[i].onclick=function(){
			console.log(this.index);
			if (this.index==0) {
				fileField.removeAttribute("disabled");
				fileField2.setAttribute("disabled", true);
				fileField3.setAttribute("disabled", true);
			}else if (this.index==1) {
				fileField.setAttribute("disabled", true);
				fileField2.removeAttribute("disabled");
				fileField3.setAttribute("disabled", true);
			}else{
				fileField.setAttribute("disabled", true);
				fileField2.setAttribute("disabled", true);
				fileField3.removeAttribute("disabled");
			}
		}
	}
	var onepic=document.getElementById('onepic');
	var result=document.getElementById('result');
	var start=document.getElementById('start');
	var next=document.getElementById('next');
	var prev=document.getElementById('prev');
	var arr;
	start.onclick=function(){
		result.style.display="none";

		//获取Canvas对象(画布)
		var canvas = document.getElementById("canvas");
		canvas.style.display="block";
		
		if (fileinput[0].checked) {
			arr=test(1);
			readFile(fileField.files[0],arr[0]);
			prev.style.display="none";
			next.style.display="none";

		}else if (fileinput[1].checked) {
			arr=test(fileField2.files.length);
			var nu=0;
			readFile(fileField2.files[nu],arr[nu]);
			next.style.display="block";
			
			next.onclick=function(){
				next.style.display="block";
				prev.style.display="block";
				nu++;
				readFile(fileField2.files[nu],arr[nu]);
				if (nu==fileField2.files.length-1) {
					next.style.display="none";
				}
			}
			prev.onclick=function(){
				prev.style.display="block";
				next.style.display="block";
				nu--;
				readFile(fileField2.files[nu],arr[nu]);
				if (nu==0) {
					prev.style.display="none";
				}
			}

		}else{

		}
		

		// //单张
		// var da1 = [42.13,87.91,63.71,34.89,74.1,107.37,21.11];
		//  多张 
		// var da2 = [42.13,87.91,63.71,34.89,74.1,107.37,21.11];
		// //简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
		// if(canvas.getContext){  
		//     //获取对应的CanvasRenderingContext2D对象(画笔)
		//     var ctx = canvas.getContext("2d");
		    
		//     //创建新的图片对象
		//     var img = new Image();
		//     //指定图片的URL
		//     img.src = "../images/yundong(25).jpg";
		//     //浏览器加载图片完毕后再绘制图片
		//     img.onload = function(){
		//         //以Canvas画布上的坐标(10,10)为起始点，绘制图像
		//         ctx.drawImage(img, 10, 10);             
		//     };
		// }
	}
	function checkType(obj){
		//得到上传文件的值
		var fileName=obj.value;
		console.log(fileName);
		//返回String对象中子字符串最后出现的位置.
		var seat=fileName.lastIndexOf(".");
		//返回位于String对象中指定位置的子字符串并转换为小写.
		var extension=fileName.substring(seat).toLowerCase();
		//判断允许上传的文件格式
		//if(extension!=".jpg"&&extension!=".jpeg"&&extension!=".gif"&&extension!=".png"&&extension!=".bmp"){
		//alert("不支持"+extension+"文件的上传!");
		//return false;
		//}else{
		//return true;
		//}
		var allowed=[".jpg",".gif",".png",".jpeg"];
		for(var i=0;i<allowed.length;i++){
			if(!(allowed[i]!=extension)){
			 return true;
			}
		}
		alert("不支持"+extension+"格式");
		return false;
	}
	function test(num){
		
		var nums=[42.13,87.91,63.71,34.89,74.1,107.37,21.11,86.34,99.66,23.14];
		//可均衡获取0到9的随机整数
		var str;
		var numbers="";
		for (var i = 0; i < num ;i++) {
			var a=nums[Math.floor(Math.random()*10)];
			if (a>60) {
				str="No Blur"+a;
			}else if (a<=60) {
				str="Blur "+ a;
			}
			numbers=numbers+"|"+str;
		}
		numbers=numbers.substring(1,numbers.length-1)

    	var arry=numbers.split("|")
		return arry;
	}
	function readFile(obj,nu) {
        var file = obj; //获取上传文件列表中第一个文件
        // fileField.files[0];
        // 
        
        // if(!/image\/\w+/.test(file.type)) {
        //   //图片文件的type值为image/png或image/jpg
        //   alert("文件必须为图片！");
        //   return false;
        // }
        // 
        var text=document.getElementById("text");

        text.innerHTML=nu;
        // console.log(file);
        var reader = new FileReader(); //实例一个文件对象
        reader.readAsDataURL(file); //把上传的文件转换成url
        //当文件读取成功便可以调取上传的接口
        reader.onload = function(e) {
          var image = new Image();
          // 设置src属性 
          image.src = e.target.result;
          // image.src="../image/QQ图片20180816231406.png"
          var max = 200;
          // 绑定load事件处理器，加载完成后执行，避免同步问题
          image.onload = function() {
           
            // 获取 canvas的 2d 环境对象, 
            var ctx = canvas.getContext("2d");
            // canvas清屏 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var width = image.width;
            var height = image.height;
            ctx.clearRect(0, 0, width, height);
            //开始路径画圆,剪切处理
            ctx.save();
            ctx.beginPath();
            // ctx.arc(60, 60, 60, 0, Math.PI * 2, false);
            // ctx.clip(); //剪切路径
            ctx.drawImage(image, 0, 0);
            //恢复状态
            ctx.restore();
          };
        }
      };
}
