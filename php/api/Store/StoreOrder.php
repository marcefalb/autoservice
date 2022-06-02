<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$order = R::dispense( 'orders' );

$order -> name = $_POST['name'];
$order -> phone = $_POST['phone'];
$order -> email = $_POST['email'];
$order -> date = date('Y-m-d');
$order -> services = $_POST['services'];

$newOrder = R::store($order);

if ($newOrder) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}

echo json_encode($response);