<?php
 $to = "nadir.jafri@hotmail.com";
 $subject = $_POST['subject'];
 $body = "From, ".$_POST['name']."\n\n"."Email, ".$_POST['email']."\n\n".$_POST['message'];
 if (mail($to, $subject, $body)) {
  $responseArray = array('class' => 'alert alert-success br-0 bg-gradient-2', 'message' => 'Message sent successfully. Thank you, will get back to you soon!');
  } else {
$responseArray = array('class' => 'alert alert-danger br-0 bg-gradient-5', 'message' => 'There was an error while submitting the form. Please try again later.');
     
  }

    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;

 ?>