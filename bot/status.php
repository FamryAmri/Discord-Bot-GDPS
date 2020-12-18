<?php
include "../config/connection.php";
try {
	$db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	//works fine
	exit("1");
	} catch (PDOException $e){
		//connection db error
		exit("2");
		}