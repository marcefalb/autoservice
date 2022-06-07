<?php

require '../../database/db.php';

function generateRandomString($length = 10) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

$login = 'autoservice_admin';
$password = 'admin12345';

$_POST = json_decode(file_get_contents('php://input'), true);

// var_dump($_POST['login'], $_POST['password']);
if ($login === $_POST['login'] && $password === $_POST['password']) {
  $token = generateRandomString(15);
  
  $auth = R::dispense('authorization');
  $auth -> token = $token;
  R::store($auth);

  echo json_encode($response = array(
    'auth' => true,
    'token' => $token,
  ));
}
else {
  echo json_encode($response = array(
    'auth' => false,
  ));
}