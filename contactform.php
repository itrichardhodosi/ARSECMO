<?php



if (isset($_POST['submit'])) {
    $email = $_POST['email'];
    $title = $_POST['title'];
    $fullname = $_POST['fullname'];
    $help = $_POST['help'];



$mailTo = 'richardhodosi23@gmail.com';
$headers = "From: ".$mailFrom;
$txt = "You have received an email ".$email.".\n\n". $help;

mail ($email, $title, $fullname, $help);
header("Location: index.php?mailsend");



}