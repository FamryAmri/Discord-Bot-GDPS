<?php
include "../../config/connection.php";
include "../botConfig.php";
header ("content-type: application/json");
if (!empty ($_GET['ID'])){
$find = $_GET['ID'];
$replace = str_replace ("_", " ", $find);

if (!empty($replace)) {
    $check = preg_replace('/[^a-zA-Z0-9]/', '', $replace);
    if (is_numeric($check)) {
        $level = "`levelID` = '".$check."'";
    } else {
        $level = "`levelName` = '".$check."'";
    }
    
$conn = mysqli_connect ($servername, $username, $password, $dbname);
$query = "SELECT * FROM `levels` WHERE ".$level;
}
$sql = mysqli_query ($conn, $query);
$row = mysqli_fetch_assoc ($sql);

	switch ($row['levelDesc']){
		case "":
		$levelDesc = base64_encode ("No description set");
		break;
		case $row['levelDesc']:
		$levelDesc = $row['levelDesc'];
		break;
	}
		
	switch ($row['password']){
		case 0:
		$pass = "Cannot Copy";
		break;
		case 1:
		$pass = "Free Copy";
		break;
		case $row['password']:
		$pass = $row['password'] - 1000000;
		break;
	}
	
	switch ($row['unlisted']){
		case 0:
		$unlist = "listed";
		break;
		case 1:
		$unlist = "unlisted";
		break;
	}
	
	switch ($row['starCoins']){
		case 0:
		$ckcoin = $unverifycoin;
		break;
		case 1:
		$ckcoin = $coins;
		break;
	}
	
	switch ($row['levelLength']){
		case 0:
		$length = "Tiny";
		break;
		case 1:
		$length = "Short";
		break;
		case 2: 
		$length = "Medium";
		break;
		case 3:
		$length = "Long";
		break;
		case 4:
		$length = "XL";
		break;
		default:
		$length = "NULL";
		break;
	}
	
	$create = date ('Y-m-d', $row['uploadDate']);
	$UP = date('Y-m-d', $row['updateDate']);
	$levelVersion = $row['levelVersion'];

echo '{"id":"'.$row['levelID'].'","name":"'.$play.' '.$row['levelName'].'","creator":"'.$row['userName'].'","songId":"'.$row['songID'].'","objects":"'.$row['objects'].'","coins":"'.$ckcoin.' '.$row['coins'].'","desc":"'.$levelDesc.'","likes":"'. $like.' '.$row['likes'].'","DL":"'. $download.' '.$row['downloads'].'","diff":"'.$row['starDifficulty'].'","dmns":"'.$row['starDemonDiff'].'","dmn":"'.$row['starDemon'].'","auto":"'.$row['starAuto'].'","F":"'.$row['starFeatured'].'","E":"'.$row['starEpic'].'","stars":"'. $stars.' '.$row['starStars'].'","create":"'.$create.'","UP":"'.$UP.'","pass":"'.$pass.'","ver":"'.$levelVersion.'","length":"'. $lengthlvl.' '.$length.'","unlisted":"'.$unlist.'"}';
	} else {
		echo '{ "msg": "No data found" }';
		}
?>
	
	