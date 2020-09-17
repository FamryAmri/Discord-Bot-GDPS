<?php
include "../../incl/lib/connection.php";
include "../botConfig.php";
header ("content-type: application/json");

$query = "SELECT * FROM `songs`";
$query = $db->prepare($query);
$query->execute();

foreach ($query->fetchAll() as $row){
$url = str_replace ("%2F", "/", $row['download']);
$dlA = str_replace ("%3A", ":", $url);
$dl = $dlA;
	
	switch ($row['isDisabled']){
		case 0:
		$info = "available to use";
		break;
		case 1:
		$info = "not available to use";
		break;
	}
		
	
	$array[] = array (
	"id" => $row['ID'],
	"name" => $row['name'],
	"size" => $row['size']."MB",
	"download" => $play.' [Download Here]('.$dl.')',
	"songfile" => $dl,
	"Info" => $info,
	);
}

echo json_encode($array);
?>