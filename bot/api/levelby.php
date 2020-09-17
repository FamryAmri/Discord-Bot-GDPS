<?php
include "../../incl/lib/connection.php";
include "../botConfig.php";
header ("content-type: application/json");
if (!empty ($_GET['users'])){
	$check = $_GET['users'];
	$num = $_GET['page'];
	if (empty($num)){
		$num = 1;
		}
	$rows = $num - 1;
	} else {
		exit(json_encode(["msg" => "No Data Found"]));
		}
		
	if (is_numeric($check)){
		$users = "`extID` = ".$check;
		} else {
			$users = "`userName` LIKE '".$check."'";
			}
    
$query = "SELECT * FROM `levels` WHERE ". $users." ORDER BY `levels`.`uploadDate` DESC LIMIT 10 OFFSET ". $rows * 10;
$query = $db->prepare($query);
$query->execute();

if ($query->rowCount() == 0){
	exit(json_encode(["msg" => "No Data Found"]));
	}

echo '{ "users": "'.$raw['userName'].'", "levels": "';

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
	
echo $verifycoin.' `'.$row["coins"].'` | '.$stars.' `'.$star.'`\n**__'.$row["levelName"].'__** by **'.$row["userName"].'**\n**ID**: '.$row["levelID"].'\n\n';
}

echo '" } ';