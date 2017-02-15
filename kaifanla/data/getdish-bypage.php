<?php
    //查询出指定条数开始的菜品的所有数据，返回给客户端
    //以JSON格式
    $start = $_REQUEST['start'];//从哪条记录开始查询
    $count = 3;//一次最多返回五条
    //$id = $_REQUEST['id'];
    //连接数据库
    $conn = mysqli_connect('localhost','root','','kaifanla','3306');
    //设置编码格式
    mysqli_query($conn,"set names utf8");
    //连接数据库，并执行sql
    $sql = "select * from dish limit $start,$count";
    //$sql1 = "select id,name,img,img_l,material,detail from dish where id=".$id;
    $sql1 = "select * from dish where id = 'p2679'";
    $result = mysqli_query($conn,$sql);
    //$result1 = mysqli_query($conn,$sql1);
    //用于保存查询到的所有记录
    $outputArr = [];
    //MYSQL_ASSOC：当$result的数据遍历到最后一条时，返回一个false，否则一直执行循环体
    while(($row = mysqli_fetch_array($result))!== NULL){
        $outputArr[] = $row;
    }
    //$arr = mysqli_fetch_array($result1);

    echo json_encode($outputArr);
    //echo json_encode($arr);
    //var_dump($result);
?>