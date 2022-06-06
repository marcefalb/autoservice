<?php

require '../../database/db.php';

$orders = R::getAll( "SELECT * FROM orders" );
if (!isset($orders)) exit(json_encode(404));

$ordersList = [];

foreach($orders as $order) {
  $orderInfo = [];
  $orderServices = [];
  $sum = 0;

  $ids = str_replace(array('[', ']', ' '), '', $order['services']);
  $services = R::getAll( "SELECT * FROM services WHERE id IN ($ids) ORDER BY category_id" );
  $categories = R::getAll( "SELECT DISTINCT id, name FROM categories ORDER BY id" );

  foreach($categories as $category) {
    $categoryServices = [];
  
    foreach($services as $service) {
      if ($service['category_id'] === $category['id']) {
        $service = [
          'id' => intval($service['id']),
          'name' => $service['name'],
          'price' => intval($service['price']),
        ];
        $sum += intval($service['price']);
        array_push($categoryServices, $service);
      }
    }
    if (count($categoryServices) === 0) continue;
  
    $categoryInfo = [
      'id' => intval($category['id']),
      'name' => $category['name'],
      'services' => $categoryServices,
    ];
  
    array_push($orderServices, $categoryInfo);
  }

  $orderInfo = [
    'id' => intval($order['id']),
    'name' => $order['name'],
    'phone' => $order['phone'],
    'email' => $order['email'],
    'date' => $order['date'],
    'sum' => $sum,
    'categories' => $orderServices,
  ];

  array_push($ordersList, $orderInfo);
}

$response = array(
  'orders' => $ordersList,
);


echo json_encode($response);