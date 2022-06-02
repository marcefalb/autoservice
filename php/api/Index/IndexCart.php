<?php

require '../../database/db.php';

$_POST = json_decode(file_get_contents('php://input'), true);
$ids = str_replace(array('[', ']', ' '), '', $_POST['services']);

$services = R::getAll( "SELECT * FROM services WHERE id IN ($ids) ORDER BY category_id" );
$categories = R::getAll( "SELECT DISTINCT id, name FROM categories ORDER BY id" );
$uniqCategories = [];

foreach($categories as $category) {
  $categoryServices = [];
  $categoryService = [];

  foreach($services as $service) {
    if ($service['category_id'] === $category['id']) {
      $service = [
        'id' => intval($service['id']),
        'name' => $service['name'],
        'price' => $service['price'],
      ];

      array_push($categoryService, $service);
    }
  }
  $category = [
    'id' => intval($category['id']),
    'name' => $category['name'],
    'services' => $categoryService,
  ];
  $categoryServices = [
    'category' => $category,
  ];

  array_push($uniqCategories, $categoryServices);
}

$response = array(
  'categories' => $uniqCategories,
);

echo json_encode($response);