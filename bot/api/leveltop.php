<?php
include "../../incl/lib/connection.php";
include "../botConfig.php";
header ("content-type: application/json");

$muka = $_GET['page'];
if (empty($muka)){
	$muka = 1;
	}
$surat = $muka - 1;
$top = $surat * 10;
$start = $top;
$end = $top + 10;
$topnum = "**".$start."**/**".$end."**";
$id = $_GET['id'];
if (empty($_GET["id"])){
	exit(json_encode(["msg" => "No Data Found"]));
	}
	
switch ($muka){
	default:
	$page = 1;
	break;
	case $muka:
	$page = $muka;
	break;
}

//for select levelname
$levename = $db->prepare("SELECT levelName FROM levels WHERE levelID = :id");
$levename->execute([":id" => $id]);
$levelname = $levename->fetchColumn();

/*if ($levename->rowCount() == 0){
	exit(json_encode(["msg" => "No Data Found"]));
	}*/
echo '{ "top": "';
//For Top
$query = $db->prepare("SELECT * FROM levelscores WHERE levelID = :id ORDER BY percent DESC LIMIT 10 OFFSET ".$surat * 10);
$query->execute([":id" => $id]);

foreach ($query->fetchAll() as $row){
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
	
	$query2 = $db->prepare("SELECT userName FROM accounts WHERE accountID = :id");
	$query2->execute([":id" => $row["accountID"]]);
	
	$top = $top + 1;
	$user = $query2->fetchColumn();
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
?>