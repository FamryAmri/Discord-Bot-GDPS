<?php
include "../../config/connection.php";
include "../botConfig.php";
header ("content-type: application/json");

if (!empty($_GET['ID'])) {
    $userName = preg_replace('/[^a-zA-Z0-9]/', '', $_GET['ID']);
    if (is_numeric($userName)) {
        $account = "`accountID` = '".$userName."'";
    } else {
        $account = "`userName` = '".$userName."'";
    }

$conn = mysqli_connect ($servername, $username, $password, $dbname);

$query = "SELECT * FROM `accounts` WHERE ".$account;
$sql = mysqli_query ($conn, $query);
$row = mysqli_fetch_assoc ($sql);

$queria = "SELECT * FROM `roleassign` WHERE accountID='".$row['accountID']."'";
$sqli = mysqli_query ($conn, $queria);
$riw = mysqli_fetch_assoc ($sqli);

$quary = "SELECT * FROM `roles` WHERE roleID='".$riw['roleID']."'";
$swl = mysqli_query ($conn, $quary);
$role = mysqli_fetch_assoc ($swl);

$quero = "SELECT * FROM `users` WHERE `extID` = '".$row['accountID']."'";
$sqlo = mysqli_query($conn, $quero);
$rew = mysqli_fetch_assoc ($sqlo);

	switch ($rew['isBanned']){
		case 0:
		$ban = "Not Ban";
		break;
		case 1:
		$ban = "Ban";
		break;
		}
		
		switch ($row['twitch']){
			case "":
			$twitchurl = $twitch." Not Set";
			break;
			case $row['twitch']:
			$twitchurl = $twitch."[Open Link](https://twitch.tv/".$row['twitch']."/profile)";
			break;
		}
		
		switch ($row['youtubeurl']){
			case "":
			$youtubeurl = $YT." Not Set";
			break;
			case $row['youtubeurl']:
			$youtubeurl = $YT." [Open Link](https://youtube.com/channel/".$row['youtubeurl'].")";
			break;
		}
		
		switch ($row['twitter']){
			case "":
			$twitterurl = $twitter." Not Set";
			break;
			case $row['twitter']:
			$twitterurl = $twitter." [Open Link](https://twitter.com/".$row['twitter'].")";
			break;
		}

		switch ($rew['isCreatorBanned']){
		case 0:
		$cpban = "Not Ban";
		break;
		case 1:
		$cpban = "Ban";
		break;
		}

switch ($role['modBadgeLevel']){
	case 0:
	$modlevel = "";
	$stat = "No Modded";
	break;
	case 1:
	$modlevel = ", **Normal Mod**";
	$stat = "Yes";
	break;
	case 2:
	$modlevel = ", **Elder Mod**";
	$stat = "Yes";
	break;
}

	switch ($row['isAdmin']){
		case 0:
		$admin = "No";
		break;
		case 1:
		$admin = "Yes";
		break;
		}
		
		$UC = str_replace ("UC", "", $row['youtubeurl']);
		
	$array= array (
	"id" => $row['accountID'],
	"user" => $row['userName'],
	"register" => date ('Y-m-d', $row['registerDate']),
	"ytURL" => $youtubeurl,
	"twitter" => $twitterurl,
	"twitch" => $twitchurl,
	"Admin" => $admin,
	"mod" => $modlevel,
	"stat" => $stat,
	"stars" => $stars." ".$rew['stars'],
	"demon" => $demon." ".$rew['demons'],
	"Ban" => $ban,
	"CP" => $CP." ".$rew['creatorPoints'],
	"cpBanned" => $cpban,
	"G_Coins" => $goldCoins." ".$rew['coins'],
	"S_Coins" => $coins." ".$rew['userCoins'],
	);
	
echo json_encode ($array);
} else {
	echo '{ "msg": "No data found" }';
	}