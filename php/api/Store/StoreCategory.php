<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);

$category = R::dispense( 'categories' );

$category -> title = $_POST['category']['title'];
$category -> image = $_POST['category']['image'];

$newCategory = R::store($category);

if ($newCategory) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}