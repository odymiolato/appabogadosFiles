<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $target_dir = $_POST['URL'];;
    $target_file = ".." . $target_dir . basename($_FILES["file"]["name"]);

    if (file_exists($target_file)) {
        echo json_encode([
            'status' => 1,
            'message' => 'The file exists.'
        ]);
        return;
    }

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode([
            'status' => 2,
            'message' => 'File Uploaded.',
            'filename' => basename($_FILES["file"]["name"])
        ]);
    } else {
        echo json_encode([
            'status' => 3,
            'message' => 'Error uploading the file.',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
}
