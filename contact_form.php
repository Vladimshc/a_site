<?php

if($_POST) {
    $visitor_name = "visitor_name";
    $visitor_email = "visitor_email";
    $visitor_message = "visitor_message";

    $subject = "sinsworld.com contact form";

    $recipient = "vladimshc@gmail.com";

    if(isset($_POST['name'])) {
        $visitor_name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    }

    if(isset($_POST['email'])) {
        $visitor_email = str_replace(array("\r", "\n", "%0a", "%0d"), '', $_POST['email']);
        $visitor_email = filter_var($visitor_email, FILTER_VALIDATE_EMAIL);
    }

    if(isset($_POST['message'])) {
        $visitor_message =  htmlspecialchars($_POST['message']);
        $send_msg = "Visitor name: " . $visitor_name  . " <br/> " .
                    "Email: " . $visitor_email  . " <br/> " .
                    "Message: " . $visitor_message;
    }

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