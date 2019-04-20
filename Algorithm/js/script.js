window.onload=function() {
	/* 导航选中状态 */
	var top=document.getElementById('top');
	var tli=top.getElementsByTagName('li');
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
			tli[5].className='action';
		}
	}
}