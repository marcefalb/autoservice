<?php

require '../../database/db.php';

$_DELETE = json_decode(file_get_contents('php://input'), true);

$services = R::getAll( "SELECT * FROM services WHERE category_id={$_DELETE['id']}" );

foreach($services as $service) {
  $serviceItem = R::load( 'services', $service['id'] );
  R::trash( $serviceItem );
}

$category = R::load( 'categories', $_DELETE['id'] );
$deletedCategory = R::trash($category);

if ($deletedCategory) {
  $response = array(
    'status' => 200
  );
} else {
  $response = array(
    'status' => 404
  );
}