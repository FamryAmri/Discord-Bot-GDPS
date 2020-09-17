<?php
include "../../config/connection.php";
include "../botConfig.php";

header ("content-type: application/json");
$check = $_GET['query'];
$num = $_GET['page'];
if (empty($num)){
	$num = 1;
}
$rows = $num - 1;
$page = $rows * 10;

$query = "SELECT * FROM `levels` WHERE `levelName` LIKE '%:query%' ORDER BY `levels`.`likes` DESC LIMIT 10 OFFSET ". $page;
$query = $db->prepare($query);
$query->execute([":query" => $check]);

echo '{ "query": "';

foreach ($query->fetchAll() as $row){
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