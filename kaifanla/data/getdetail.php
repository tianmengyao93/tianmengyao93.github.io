<?php
    header("Content-Type:application/json");
    //获取前台数据
    $id = $_REQUEST['id'];
    //echo $id;
    //连接数据库
    $conn1 = mysqli_connect('localhost','root','','kaifanla','3306');
    //var_dump($conn1);
    //设置编码格式
    mysqli_query($conn1,"set names utf8");
    //连接数据库，并执行sql
    //$id = $_REQUEST['id'];
    $sql1 = "select * from dish where id='$id'";
    //$sql1 = "select * from dish where id = 'p2679'";

    $result1 = mysqli_query($conn1,$sql1);

    //用于保存查询到的所有记录
    $arr = mysqli_fetch_array($result1);
    echo json_encode($arr);
    //echo ($arr.id);
    //var_dump($arr);
?>