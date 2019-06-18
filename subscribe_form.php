<?php

if($_POST) {
    $visitor_email = "visitor_email";
    $subject = "sinsworld.com subscribe form";
    $recipient = "vladimshc@gmail.com";

    if(isset($_POST['email'])) {
        $visitor_email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $visitor_email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
    }

    $send_msg = "Visitor: " . $visitor_email . " want to subscribe." ;

    $headers  = 'MIME-Version: 1.0' . "\r\n"
    .'Content-type: text/html; charset=utf-8' . "\r\n"
    .'From: ' . $visitor_email . "\r\n";

    if(mail($recipient, $subject, $send_msg, $headers)) {
        echo "<p>Thank you for contacting us, $visitor_name. You will get a reply within soon. </p> Go to home page <a href=\"http://sinsworld.com\">sinsworld.com</a> ";
        header("Location:http://sinsworld.com");
    } else {
        echo '<p>We are sorry but the email did not go through.</p>';
    }

} else {
    echo '<p>Something went wrong</p>';
}

?>