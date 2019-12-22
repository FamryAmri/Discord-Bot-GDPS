<?php
include "../../config/connection.php";
include "../botConfig.php";
header ("content-type: application/json");
if (!empty ($_GET['page'])){
$find = $_GET['users'];
$num = $_GET['page'];
$rows = $num - 1;

$replace = str_replace ("_", " ", $find);
if(!empty($replace)){
	$check = preg_replace ("/[^a-zA-Z0-9]/", "", $replace);
	if (is_numeric($check)){
		$users = "`extID` = ".$check;
		} else {
			$users = "`userName` LIKE '".$check."'";
			}
    
$conn = mysqli_connect ($servername, $username, $password, $dbname);

$query = "SELECT * FROM `levels` WHERE ". $users." ORDER BY `levels`.`uploadDate` DESC LIMIT 10 OFFSET ". $rows * 10;
}
$sql = mysqli_query ($conn, $query);
$raw = mysqli_fetch_assoc ($sql);

echo '{ "users": "'.$raw['userName'].'", "levels": "';

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
	
echo $verifycoin.' `'.$row["coins"].'` | '.$stars.' `'.$star.'`\n**__'.$row["levelName"].'__** by **'.$row["userName"].'**\n**ID**: '.$row["levelID"].'\n\n';
}

echo '" } ';
} else {
	echo '{ "msg": "No data found" }';
	}