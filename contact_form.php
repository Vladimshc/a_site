<?php

if(isset($_POST['submit'])){
$to = "vladimshc@gmail.com";; // Здесь нужно написать e-mail, куда будут приходить письма
$from = $_POST['email']; // this is the sender's Email address
$first_name = $_POST['name'];
$subject = "Форма отправки сообщений с сайта";
$subject2 = "Copy of your form submission";
$message = $first_name . " оставил сообщение:" . "\r\n" . $from "\r\n" . $_POST['message'];
$message2 = "Here is a copy of your message " . $first_name . "\r\n" . $_POST['message'];

$headers = "From:" . $from;
$headers2 = "From:" . $to;

mail($to,$subject,$message,$headers);
// mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender - Отключено!
echo "Сообщение отправлено. Спасибо Вам " . $name . ", мы скоро свяжемся с Вами.";
echo "<br /><br /><a href='https://google.com.ua'>Вернуться на сайт.</a>";

}

?>