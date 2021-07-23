<?php
include '../../incl/lib/connection.php';

$key = $_GET;

function verify ($c){
    if (empty($c)) return false;
    $a = file_get_contents('./verify');
    return password_verify($c. 'lx7z', $a);
}

if (file_exists('./verify')) {
    if (!verify($key['keycard'])) exit('-2');
    if (!empty($key['gauntid'])) {
        $query2 = $db->prepare('SELECT * FROM gauntlets WHERE ID=:type');
        $query2->execute([':type' => $key['gauntid']]);
    }
    if ($key['doing'] == '2') {
        if ($query2->rowCount()=='0') exit('-5');
        $data = $query2->fetchAll();
        exit($data['ID'].'|'.$data['level1'].'|'.$data['level2'].'|'.$data['level3'].'|'.$data['level4'].'|'.$data['level5']);
    } else if ($key['doing'] == '3'){
        if ($query2->rowCount()=='1') exit('-6');
        $query = $db->prepare("INSERT INTO gauntlets (ID, level1, level2, level3, level4, level5) VALUE (?,?,?,?,?,?)");
        $query->execute([$key['gauntid'], $key['l1'], $key['l2'], $key['l3'], $key['l4'], $key['l5']]);
        exit('-3');
    } else if ($key['doing'] == '4'){
        echo $key['query'];
        // if ($query2->rowCount()=='0') exit('-5');
        // exit('-4');
    } else if ($key['doing'] == '5'){
        $keycard = password_hash($key['keycard1']. 'lx7z', PASSWORD_DEFAULT);
        file_put_contents('./verify', $keycard);
        exit('-7');
    } else {
        exit('¯\_(ツ)_/¯');
    }
} else {
    if ($key['doing'] == '1'){
        file_put_contents('./verify', password_hash($key['keycard']. 'lx7z', PASSWORD_DEFAULT));
        if (!file_exists('./verify')) exit('-7');
        exit('-8');
    }
    exit('-1');
}
?>