<?php
//copied from tools/bot/songAddBot.php but its modified
include "../../incl/lib/connection.php";
$link = $_GET["link"];
$name = $_GET["name"];
$author = $_GET["author"];
//echo "$name:$author:$link";
$size = /*round($size / 1024 / 1024, 2);*/ 0;
$hash = "";
if (!empty($link)){
	$name = str_replace("#", "", $name);
	$name = str_replace(":", "", $name);
	$name = str_replace("~", "", $name);
	$name = str_replace("|", "", $name);
	$query = $db->prepare("SELECT ID FROM songs WHERE download = :download");
	$query->execute([':download' => $link]);
	$id = $query->fetchColumn();
	$count = $query->rowCount();
	
	if($count !== 0){
		echo $id;
	}else{
		$query = $db->prepare("INSERT INTO songs (name, authorID, authorName, size, download, hash) 
											VALUES (:name, '9', :author, :size, :download, :hash)");
		$query->execute([':name' => $name, ':download' => $link, ':author' => $author, ':size' => $size, ':hash' => $hash]);
		echo $db->lastInsertId();
	}
} else {
	exit ("-1");
	}
?>
