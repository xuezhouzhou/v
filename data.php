<?php
error_reporting(E_ALL^E_NOTICE);

$arr = array();				

function traverse($path = ''){
	global $arr;
	
	//opendir()返回一个目录句柄,失败返回false
	$current_dir = opendir($path); 
	
	while(($file = readdir($current_dir))!==false){
		$sub_dir = $path . '/' . $file;
		if($file=='.' || $file=='..'){
			continue;
		}else if(is_dir($sub_dir)){
			//如果是目录,进行递归
			traverse($sub_dir);
		}else{
			$temp['file_path'] = iconv('GB2312','UTF-8',$path);
			$temp['file_name'] = iconv('GB2312','UTF-8',$file);
			$temp['file_size'] = round(filesize($temp['file_path'].'/'.$temp['file_name'])/(1024*1024),1);
			//$temp['file_path'] = $path;
			//$temp['file_name'] = $file;
			array_push($arr,$temp);
		}
	}
}

traverse('min');

echo json_encode($arr);	 


// echo '<pre>';
// var_dump($arr);
// echo '</pre>';