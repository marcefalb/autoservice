<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$ids = str_replace(array('[', ']', ' '), '', $_POST['services']);

$employee = R::getAll( "SELECT DISTINCT name, position, rank FROM employee WHERE employee.id IN (SELECT employer_id FROM categories JOIN services on categories.id = services.category_id WHERE services.id IN ($ids))" );

$order = R::dispense( 'orders' );

$order -> name = $_POST['name'];
$order -> phone = $_POST['phone'];
$order -> email = $_POST['email'];
$order -> date = date('Y-m-d');
$order -> services = $_POST['services'];

$newOrder = R::store($order);

if ($newOrder) {
  $response = array(
    'status' => 200,
    'employee' => $employee,
  );
} else {
  $response = array(
    'status' => 404
  );
}

echo json_encode($response);