<?php

require '../../libs/rb.php';

$host = 'localhost';
$dbname = 'autoservices';
$login = 'root';
$password = 'root';

R::setup("mysql:host=$host;dbname=$dbname", $login, $password);