(function($,ROOT){
	//video数据
	var videoData;
	
	var oBox = document.getElementById('box');
	var oPlayer = document.getElementById('player');
	
	var $_Box = $(oBox); 
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
		$('#list .cur').removeClass('cur');
		$(this).addClass('cur');
	});
	
	$('#key').on("keyup",function(){
		var key = $(this).val();
		showList(key);
	});
	
	$('#btn-search').on('touchstart',function(){
		var key = $('#key').val();
		showList(key);
	});
	
	function showList(key){
		var html = '';
		videoData.forEach(function(item){
			if(key==""){
				html += '<a target="movie" href=v.php?p='+ item.file_path + '&n=' + item.file_name +'>' + item.file_name + '<span class="size">' + item.file_size + ' MB</span></a>';
			}else{
				var re = new RegExp();
				re = new RegExp(key,"i");
				if(re.test(item.file_name)){

					html += '<a target="movie" href=v.php?p='+ item.file_path + '&n=' + item.file_name +'>' + highLight(key,item.file_name) + '<span class="size">' + item.file_size + ' MB</span></a>';
				}
			}
		});
		$("#list").empty().append(html);
	}
	
	ROOT.highLight = function(key,file){
		var p = new RegExp('.mp4','i');
		file = file.replace(p,'');
		if(key==''){
			return file;
		}else{
			var pattern = new RegExp(key,'ig');
			return file.replace(pattern,'<span style="color:red">'+ key +'</span>')
		}
	}
	
})(Zepto,this);