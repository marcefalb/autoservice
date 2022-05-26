<?php

require '../libs/rb.php';

$host = 'localhost';
$dbname = 'u1026489_vokhmin';
$login = 'u1026489_vokhmin';
$password = 'O7dE3gQ0t';

R::setup("mysql:host=$host;dbname=$dbname", $login, $password);