<?php
include "../../config/connection.php";
include "../botConfig.php";
header ("content-type: application/json");
if (!empty ($_GET['page'])){
$muka = $_GET['page'];
$surat = $muka - 1;
$top = $surat * 10;
$start = $top;
$end = $top + 10;
$topnum = "**".$start."**/**".$end."**";
$id = $_GET['id'];

switch ($muka){
	default:
	$page = 1;
	break;
	case $muka:
	$page = $muka;
	break;
}

echo '{ "top": "';

//connect to db
$conn = mysqli_connect($servername, $username, $password, $dbname);

//for select levelname
$queria = "SELECT * FROM `levels` WHERE `levelID`='".$id."'";
$sqli = mysqli_query ($conn, $queria);
$raw = mysqli_fetch_assoc ($sqli);
$levelname = $raw['levelName'];

//For Top
$query = "SELECT * FROM `levelscores` WHERE `levelID`= ".$id." ORDER BY `levelscores`.`percent` DESC LIMIT 10 OFFSET " . $surat * 10;
$sql = mysqli_query ($conn, $query);
while ($row = mysqli_fetch_assoc ($sql)){
	
	switch ($row['coins']){
		case 0:
		$coin = "No Coin";
		break;
		case 1:
		$coin = "".$coins."";
		break;
		case 2:
		$coin = "".$coins."".$coins."";
		break;
		case 3:
		$coin = "".$coins."".$coins."".$coins."";
		break;
	}
	
	$querio = "SELECT * FROM `accounts` WHERE `accountID` = '".$row['accountID']."'";
	$np = mysqli_query ($conn, $querio);
	$account = mysqli_fetch_assoc ($np);
	
	$top = $top + 1;
	$user = $account['userName'];
	$percent = $row['percent'];
	
$leader = '`# '.$top.'`| `'.$percent.'%` | '.$coin.' \nUser: '.$user.'\n';

switch ($leader){
	default:
	$echo = "\nBruh\n";
	break;
	case $leader:
	$echo = $leader;
	break;
	}
	
	echo $echo;
	
}

echo '", "levelname": "'.$levelname.'", "page": '.$page.' ,"topTo": "'.$topnum.'" }';
} else {
	echo '{ "msg": "No data found" }';
	}
?>