<?php
set_error_handler('error_handler',E_ALL);
function error_handler($errNo, $errStr, $errFile, $errLine)
{
    ob_clean();
    $error_message = 'ERRNO: ' . $errNo . chr(10) .
        'TEXT: ' . $errStr . chr(10) .
        'LOCATION: ' . $errFile .
        ', line ' . $errLine;
    echo $error_message;
    //prevent processing any more PHP scripts
    exit;
}
?>