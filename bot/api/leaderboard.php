<?php
include "../../config/connection.php";
include "../botConfig.php";
header ("content-type: application/json");
if (!empty($_GET['page'])){
$muka = $_GET['page'];
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

switch ($in){
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
	case "CP":
	$type = "creatorPoints";
	$emoji = $CP;
	break;
}

echo '{ "top": "';

$conn = mysqli_connect($servername, $username, $password, $dbname);
$query = "SELECT `userName`, `".$type."` FROM `users` WHERE `isRegistered`= '1' ORDER BY `users`.`".$type."` DESC LIMIT 10 OFFSET " . $surat * 10;
$sql = mysqli_query ($conn, $query);
while ($row = mysqli_fetch_assoc ($sql)){
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
} else {
	echo '{ "msg": "No data found" }';
	}
?>