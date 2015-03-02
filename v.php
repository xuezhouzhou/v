<?php
$file_path = $_GET['p'];
$file_name = $_GET['n'];

if(!file_exists($file_path.'/'.$file_name)) header('Location:mobile.html');

$title = substr($file_name,15);
$title = str_replace('.mp4',"",$title);

if(preg_match('/iPhone/',$_SERVER['HTTP_USER_AGENT'])){
	$width = 320;
	$height = 180;
}else{
	$width = 640;
	$height = 360;
}
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title><?=$title?></title>
<style>
*{ margin:0; padding:0; border:none; }
html,body{height:100%;}
body{background:#333;}
#main{ width:<?=$width?>px; height:<?=$height?>px; position:absolute; left:50%; top:50%; margin-left:-<?=$width/2?>px; margin-top:-<?=$height/2?>px;}
</style>
</head>
<body>
<div id="main">
	<video id="player" src="<?=$file_path.'/'.$file_name?>"  controls width="100%" height="100%"></video>
</div>
</body>
</html>