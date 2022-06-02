<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);
$ids = implode(',', $_POST);

$services = R::getAll( "SELECT * FROM services WHERE id IN($ids) ORDER BY category_id" );
$categories = R::getAll( "SELECT DISTINCT id, name FROM categories ORDER BY id" );
$list;

foreach($category as $categories) {
  foreach($service as $services) {
    // if ($service['category_id'] == $category['id'])

  }
}

$response = array(
);

echo json_encode($response);