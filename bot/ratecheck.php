<?php
include "../incl/lib/connection.php";
//that ppl cannot check without random key
function randkey(){
	$key = substr(str_shuffle(base64_decode("MWFBMmJCM2NDNGRENWVFNmZGN2dHOGhIOWtLMG9P")), 0, 8);
	file_put_contents("../data/keybot.txt", $key);
	return $key;
	}
	
function pea($pea){
	if ((int)$pea == 1){
		return "On";
		} else if ((int)$pea == 0){
			return "Off";
			}
		}
		
//if tomorrow it will be reset to empty file
if ((strtotime("tomorrow 00:00:00") - time()) > 172400){ file_put_contents("../data/cache.txt", ""); exit("cleared");}
if (empty($_GET["verify"])){
	$key = randkey();
	exit (json_encode(["key" => randkey()]));
	} else {
		$key = file_get_contents("../data/keybot.txt");
		if ($_GET["verify"] == $key){
			$cache = "";
			if (file_exists("../data/cache.txt")){
				$cache = file_get_contents("../data/cache.txt");
				if (!empty($cache)) $cache = $cache.",";
				}
			$time = time();
			$query = $db->prepare("SELECT * FROM modactions WHERE timestamp < :time ORDER BY timestamp DESC LIMIT 6");
			$query->execute([":time" => $time]);
			$fetch = $query->fetchAll();
			
			//empty variable
			$posted = "";
			$ar["rated"] = [];
			$exists = [];
			
			foreach($fetch as $res){
				$switch = $db->prepare("SELECT ID, value, value2 FROM modactions WHERE value3 = :id AND type = :type ORDER BY ID DESC LIMIT 2");
				$switch->execute([":id" => $res["value3"], ":type" => $res["type"]]);
				$latest = $switch->fetchAll();
				
				switch($res["type"]){
					case "1":
					$text = "**Stars**: ". $latest[1]["value2"]."(".$latest[1]["value"].")". " -> ".$res["value2"]."(".$res["value"].")";
					break;
					case "2":
					$text = "**Feature**: ". pea($latest[1]["value"]). " -> ".pea($res["value"]);
					break;
					case "4":
					$text = "**Epic**: ". pea($latest[1]["value"]). " -> ".pea($res["value"]);
					break;
					}
					$account = $db->prepare("SELECT userName FROM accounts WHERE accountID = ?");
					$account->execute([$res["account"]]);
					$account = $account->fetchColumn();
					
					$levelname = $db->prepare("SELECT levelName FROM levels WHERE levelID=?");
					$levelname->execute([$res["value3"]]);
					$levelname = $levelname->fetchColumn();
					
					$last = end($ar["rated"]);
					
					$exists[$res["ID"]] = false;
					if (!empty($cache)){
						foreach (explode(",", $cache) as $dat){
							if ($dat == $res["ID"]) $exists[$res["ID"]] = true;
							}
						}
					
					$posted .= $res["ID"].",";
					if (!$last || !($last["users"] == $account && $last["time"] == $res["timestamp"] && $last["text"] == $text)){
						if (!$exists[$res["ID"]] && $latest[1]["ID"] !== $res["ID"]){
							$ar["rated"][] = ["ID" => $res["value3"], "name" => $levelname, "text" => $text, "users" => $account, "time" => $res["timestamp"]];
							}
						}
				}
			file_put_contents("../data/cache.txt", $cache. substr($posted, 0, -1));
			$ar["key"] = randkey();
			echo json_encode($ar);
			} else {
				echo json_encode(["key" => randkey(), "err" => "popCat"]);
				}
	}
