<?php
include "../../incl/lib/connection.php";
include "../botConfig.php";
header ("content-type: application/json");

$muka = $_GET['page'];
if (empty($_GET['page'])){
	$muka = 1;
	}
$surat = $muka - 1;
$top = $surat * 10;
$start = $top;
$end = $top + 10;
$topTo = "**".$start."** / **".$end."**";
$in = $_GET['in'];

switch ($muka){
	case "":
	$page = 1;
	break;
	case $muka:
	$page = $muka;
	break;
}

switch (strtolower($in)){
	default:
	exit(json_encode(["msg" => "Not Included"]));
	break;
	case "stars":
	$type = "stars";
	$emoji = $stars;
	break;
	case "creator":
	$type = "creatorPoints";
	$emoji = $CP;
	break;
	case "gold.coins":
	$type = "coins";
	$emoji = $goldCoins;
	break;
	case "coins":
	$type = "userCoins";
	$emoji = $coins;
	break;
	case "demon":
	$type = "demons";
	$emoji = $demon;
	break;
	case "cp":
	$type = "creatorPoints";
	$emoji = $CP;
	break;
}
$query = $db->prepare("SELECT `userName`, ".$type." FROM users WHERE isRegistered =1  ORDER BY ".$type." DESC LIMIT 10 OFFSET ". $surat * 10);
$query->execute();
if ($query->rowCount() == 0){
	exit(json_encode(["msg" => "No Data Found"]));
	}
	
echo '{ "top": "';
	
foreach ($query->fetchAll() as $row){
	switch ($row[$type]){
		case "":
		$val = "";
		break;
		case $row[$type];
		$val = $row[$type];
		break;
	}
	
	$top = $top + 1;
	$user = $row['userName'];
	$value = $val;
	$new = "\n";
echo '`# '.$top.'`|'.$emoji.' `'.$val.'` \nUser: '.$user.'\n';
}
echo '", "type": "'.$type.'", "page": '.$page.', "topTo": "'.$topTo.'" }';
?>