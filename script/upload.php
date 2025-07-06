<?php
$uploadDir = "../uploads/".$_POST['eventYear']." ".$_POST['eventMonth'].'/'.$_POST['eventReason'].'/'.$_POST['eventName'];
$uploadDir = str_replace(' ','-',$uploadDir);

// ======= Handle Upload =======
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "<script src='security.js'></script>";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    else{
        echo "The directory is already exists.<br>";
    }

    foreach ($_FILES['mediaFiles']['name'] as $index => $filename) {
        $tmpPath = $_FILES['mediaFiles']['tmp_name'][$index];
        $error = $_FILES['mediaFiles']['error'][$index];

        echo "<strong>File:</strong> $filename<br>";

        if ($error !== UPLOAD_ERR_OK) {
            echo "❌ Upload error code: $error<br><br>";
            continue;
        }
        $uploadFile = $uploadDir.'/'.$_FILES['mediaFiles']['name'][$index];
        if (file_exists($uploadFile)) {
            echo "Error: The file '" . basename($_FILES['mediaFiles']['name'][$index]) . "' already exists.<br>";
        }
        else {
            if (move_uploaded_file($_FILES['mediaFiles']['tmp_name'][$index], $uploadFile)) {
                echo "Success: File uploaded successfully.<br>";
            }
            else {
                echo "Error: File upload failed.<br>";
            }
        }
    }
}

echo "<script >
        setTimeout(() => { location.href = '../upload.html'; },3000);  
     </script> 
    <p><b>The page will Redirect within 3 sec ...</b></p>";
?>