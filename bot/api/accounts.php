<?php
include "../../incl/lib/connection.php";
include "../botConfig.php";
header ("content-type: application/json");

if (!empty($_GET['ID'])) {
    $userName = preg_replace('/[^a-zA-Z0-9]/', '', $_GET['ID']);
    if (is_numeric($userName)) {
        $account = "`accountID` = '".$userName."'";
        $param = "accountID = :id";
    } else {
        $account = "`userName` = '".$userName."'";
        $param = "userName = :id";
    }

$query = $db->prepare("SELECT * FROM accounts WHERE ". $param);
$query->execute([":id" => $userName]);
$row = $query->fetch();
if ($query->rowCount() == 0){
	exit(json_encode(array("msg" => "No Data Found")));
	}

$query2 = $db->prepare("SELECT roleID FROM roleassign WHERE accountID = :id");
$query2->execute([":id" => $row["accountID"]]);
$roleID = $query2->fetchColumn();

$query3 = $db->prepare("SELECT modBadgeLevel FROM roles WHERE roleID = :id");
$query3->execute([":id" => $roleID]);
$level = $query->fetchColumn();

$query4 = $db->prepare("SELECT * FROM users WHERE extID = :98");
$query4->execute([":98" => $row["accountID"]]);
$userinfo = $query4->fetch();

	switch ($userinfo['isBanned']){
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

		switch ($userinfo['isCreatorBanned']){
		case 0:
		$cpban = "Not Ban";
		break;
		case 1:
		$cpban = "Ban";
		break;
		}

switch ($level){
	default:
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
	"stars" => $stars." ".$userinfo['stars'],
	"demon" => $demon." ".$userinfo['demons'],
	"Ban" => $ban,
	"CP" => $CP." ".$userinfo['creatorPoints'],
	"cpBanned" => $cpban,
	"G_Coins" => $goldCoins." ".$userinfo['coins'],
	"S_Coins" => $coins." ".$userinfo['userCoins'],
	);
	
echo json_encode ($array);
} else {
	echo json_encode(array("msg" => "No Data Found"));
	}