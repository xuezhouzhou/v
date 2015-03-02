(function($){
	//video数据
	var videoData;

	var oBox = document.getElementById('box');
	var oDrag = document.getElementById('drag');
	var oPlayer = document.getElementById('player');
	
	var $_Box = $(oBox); 
	var $_Drag = $(oDrag); 
	var $_Player = $(oPlayer); 
	
	//获取后台数据
	function getVideoData(){
		$.ajax({
			type:'GET',
			url:'data.php',
			cache: false,
			async: false,
			dataType:'json',
			success:function(data){
				videoData = data;
			}	
		});
	}
	
	$(function(){
		getVideoData();
		showList('');
	});
	
	$("#list a").live('click',function(){
		$(this).siblings('.cur').removeClass('cur').end().addClass('cur');
		var url = $(this).attr('data-url');
		$_Box.show();
		$_Player.attr('src',url);
	});
	
	$('#key').on("keyup",function(){
		var key = $(this).val();
		showList(key);
	});
	
	$('#box .btn').on('click',function(){
		var text = $(this).text();
		$(this).siblings('.cur').removeClass('cur').end().addClass('cur');
		$_Box.css({'width':240*text,'height':135*text});
		$_Drag.css({'height':135*text-40});
	});
	
	$_Box.on('mouseover',function(){
		$('#close,#drag,#size,#light').show();
	}).on('mouseleave',function(){
		$('#close,#drag,#size,#light').hide();
	});
	
	$('#light').on('click',function(){
		$('#hover').toggle();
	})
	
	oDrag.onmousedown = function(ev){
		var ev = ev || window.event;
		
		//鼠标距离div边框的距离
		var layerX =  ev.layerX || ev.offsetX;
		var layerY=  ev.layerY || ev.offsetY;
		
		//计算box的left top 最大值
		var maxLeft = window.innerWidth - oBox.offsetWidth;
		var maxTop = window.innerHeight - oBox.offsetHeight;
		
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			var x = ev.clientX - layerX;
			var y = ev.clientY - layerY;
			
			//检查是否移除可视区域
			if(x<0) x = 0;
			if(y<0) y = 0;
			if(x>maxLeft) x = maxLeft;
			if(y>maxTop) y = maxTop;
			
			oBox.style.left = x + 'px';
			oBox.style.top = y + 'px';
		}
	}
	
	//释放
	document.onmouseup = function(){
		document.onmousedown = null;
		document.onmousemove = null;
	}
	
	$("#close").on('click',function(){
		$_Box.hide();
		$('#hover').hide();
		oPlayer.pause();
		oPlayer.src="";
	})
	
	//显示列表
	function showList(key){
		var html = '';
		videoData.forEach(function(item){
			if(key==""){
				html += '<a target="movie" data-url="'+ item.file_path + '/' + item.file_name +'">' + item.file_name + '<span class="size">' + item.file_size + ' MB</span></a>';
			}else{
				var re = new RegExp();
				re = new RegExp(key,"i");
				if(re.test(item.file_name)){
					html += '<a target="movie" data-url="'+ item.file_path + '/' + item.file_name +'">' + highLight(key,item.file_name) + '<span class="size">' + item.file_size + ' MB</span></a>';
				}
			}
		});
		$("#list").empty().append(html);
	}
	
	//搜索结果高亮处理
	function highLight (key,file){
		if($.trim(key)==""){
			return file;
		}else{
			var pattern = new RegExp(key,'ig');
			return file.replace(pattern,'<span style="color:red">'+ key +'</span>');
		}
	}
})(jQuery);