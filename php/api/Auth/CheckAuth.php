<?php

require '../../database/db.php';

$token = $_COOKIE['token'];

$authItem = R::find( 'authorization', ' token LIKE ? ', [ $token ]);

if (!empty($authItem)) {
  echo json_encode($response = array(
    'auth' => true,
  ));
}
else {
  echo json_encode($response = array(
    'auth' => false,
  ));
}