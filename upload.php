<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_FILES['image'])) {
    $errors = [];
    $extensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4'];

    //get the number of files being uploaded
    $all_files = count($_FILES['image']['tmp_name']);
    for ($i=0; $i < $all_files; $i++) {
      //get the file details
      $file_name = $_FILES['image']['name'];
      $file_tmp = $_FILES['image']['tmp_name'];
      $file_type = $_FILES['image']['type'];
      $file_size = $_FILES['image']['size'];
      $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));

      //check to see the media type so the appropriate path can be set
      $path = 'assets/images/uploads/';
      $name = time();
      $file = $path . $name;

      //check the file if they are fit for uploading
      if (!in_array($file_ext, $extensions)) {
        $errors[] = 'Extension not allowed: ' . $file_name . ' ' . $file_type;
        http_response_code(400);
        exit('Extension not allowed: ' . $file_name . ' ' . $file_type);
      }

      if ($file_size > 5097152) {
        $errors[] = 'File size exceeds limit ' . $file_name . ' ' . $file_size;
        http_response_code(400);
        exit('File size exceeds limit ' . $file_name . ' ' . $file_size);
      }

      //upload the file if there are no errors
      if (empty($errors)) {
        if ( move_uploaded_file($file_tmp, $file) ) {
          //aray to be pushed to the json file
          http_response_code(200);
          exit($file);
        } else {
          exit('invalid file');
        }
      }

    }
  }
}

?>

