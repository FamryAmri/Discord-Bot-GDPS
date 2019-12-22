<?php
include "../../config/connection.php";
include "../botConfig.php";

header ("content-type: application/json");
if (!empty ($_GET['page'])){
$find = $_GET['query'];
$num = $_GET['page'];
$rows = $num - 1;
$page = $rows * 10;

$replace = str_replace ("_", " ", $find);
if(!empty($find)){
	$check = preg_replace ("/[^a-zA-Z0-9]/", "", $replace);
    
$conn = mysqli_connect ($servername, $username, $password, $dbname);

$query = "SELECT * FROM `levels` WHERE `levelName` LIKE '%".$check."%' ORDER BY `levels`.`likes` DESC LIMIT 10 OFFSET ". $page;
}
echo '{ "query": "';
$sql = mysqli_query ($conn, $query);
while ($row = mysqli_fetch_assoc ($sql)){
	
	switch ($row['starCoins']){
		case 0:
		$verifycoin = $uncoins;
		break;
		case 1:
		$verifycoin = $coins;
		break;
	}
	
	switch ($row['starStars']){
		case 0:
		$star = "No Rated Stars";
		break;
		case $row['starStars']:
		$star = $row['starStars'];
		break;
	}
	
	$rows = $rows + 1;
$queria = "SELECT * FROM `songs` WHERE `ID` = '".$row['songID']."'";
$sqli = mysqli_query ($conn, $queria);
$song = mysqli_fetch_assoc ($sqli);

echo '`# '.$rows.'` | '.$verifycoin.' `'.$row["coins"].'` | '.$stars.' `'.$star.'`\n**__'.$row["levelName"].'__** by **'.$row["userName"].'**\n**ID**: '.$row["levelID"].'\n\n';
}

echo '" } ';
} else {
	echo '{ "msg": "No data found" }';
	}