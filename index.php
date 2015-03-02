<?php
if(preg_match('/Mobile/i',$_SERVER['HTTP_USER_AGENT'])){
	header('Location:mobile.html');
}else{
	header('Location:pc.html');
}