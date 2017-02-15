angular.module('myApp',['ionic'])
    //路由模块
    .config(function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('start',{
                url:'/myStart',
                templateUrl:'view/start.html',
                controller:'startCtrl'
            })
            .state('main',{
                url:'/myMain',
                templateUrl:'view/main.html',
                controller:'mainCtrl'
            })
            .state('detail',{
                url:'/myDetail/:id',
                templateUrl:'view/detail.html',
                controller:'detailCtrl'
            })
            .state('sorry',{
                url:'/mySorry',
                templateUrl:'view/sorry.html',
                controller:'sorryCtrl'
            });
        $urlRouterProvider.otherwise('myStart');
    })



    //开始界面模块，设置定时器
    .controller('startCtrl',['$scope','$location','$timeout',function($scope,$location,$timeout){
        $timeout(function(path){
//            console.log('aaa');
                $location.path('/myMain')
        },3000).then(function(){
            console.log('跳转成功')
        },function(){
          console.log('跳转不成功')
        });
    }])
    //主界面模块
    .controller('mainCtrl',['$scope','$http','$stateParams','$ionicActionSheet','$timeout','$ionicPopup',
        function($scope,$http,$ionicActionSheet,$stateParams,$timeout,$ionicPopup){
        $scope.start=0;
        var url = "data/getdish-bypage.php?start="+$scope.start;
        $http.get(url).success(function(data) {
            console.log(data);
            $scope.dishList = data;
        })
        $scope.head="主菜单";
        $scope.funSelect = function(num) {
            if(num==1){
                $scope.head="主菜单";
            }else{
                $scope.head="我的订单";
            }
        }
//        var id = $stateParams.id;
//        $scope.list = [];
//        $http.get("data/order.json").success(function(d){
//            for(attr in d)
//            {
//                    $scope.list.push(d[attr]);
//            }
//            console.log(list);
//        });
//        $scope.name=d.name;
//        $scope.img=d.img_l;
//        $scope.detail=d.detail;
//        ;
//            刷新功能的实现
        $scope.refresh=function(){
                $scope.start += 3;
                $http.get('data/getdish-bypage.php?start='+$scope.start).success(function(data){
                    console.log(data);
                    $scope.dishList=$scope.dishList.concat(data);
                    console.log($scope.dishList);
                })
            $scope.$broadcast('scroll.refreshComplete')
        }
        $scope.more=function(){
                    $scope.start += 3;
                    $http.get('data/getdish-bypage.php?start='+$scope.start).success(function(data){
                        console.log(data);
                        $scope.dishList=$scope.dishList.concat(data);
                        console.log($scope.dishList);
                    })
                $scope.$broadcast('scroll.infiniteScrollComplete')
        }
            //登录框的实现
        $scope.showPromptWindow=function(){
            $ionicPopup.prompt({
                title:"登录",
                template:"<input type='text' placeholder='用户名'><br/><input type='password' placeholder='密码'>",
                okText:'确认',
                cancelText:'取消'
            }).then(function(result){
                console.log(result);
            })
        }
            //注册框实现
        $scope.showPromptWindow1=function(){
            $ionicPopup.prompt({
                title:"注册",
                template:'<input type="text" placeholder="用户名"><br/>' +
                    '<input type="password" placeholder="密码"><br/>' +
                    '<input type="email" placeholder="email"><br/>' +
                    '<input type="datetime" placeholder="出生日期">',
                okText:'确认',
                cancelText:'取消'
            }).then(function(result){
                console.log(result);
            })
        }
    }])
    //detail模块
    .controller('detailCtrl',['$scope','$http','$stateParams','$ionicActionSheet','$timeout',function($scope,$http,$stateParams,$ionicActionSheet,$timeout){
//        console.log("success");
        $scope.id=$stateParams.id;
        console.log($scope.id);
        var url1 = "data/getdetail.php?id="+$scope.id;
        $http.get(url1).success(function(data){
//            $http.get( "data/getdetail.php?id="+$scope.id).success(function(data) {
//                console.log("success");
            console.log(data);
//            $scope.id=data.id;
            $scope.name = data.name;
            $scope.material = data.material;
            $scope.img_l = data.img_l;
            $scope.detail = data.detail;
        })
        //模态框的实现
        $scope.showActionSheet = function(){
            var hideSheet = $ionicActionSheet.show({
                titleText:'操作',
                buttons:[{text:'分享'},{text:'复制'},{text:'粘贴'}],
                buttonClicked:function(index){
                    console.log('点击了第'+index+'个按钮');
                    return true;
                },
                cancelText:"取消",
                cancel:function(){
                    console.log("取消");
                    return true;
                },
                destructiveText:"删除",
                destructiveButtonClicked:function(){
                    console.log("点击了删除按钮。。。");
                    return true;
                }
            });
            $timeout(function(){
                hideSheet();
            },3000);
        }
    }])
    .controller('sorryCtrl',['$scope','$location','$timeout',function($scope,location,$timeout){
        console.log("success");
    }])
    //动画效果的实现
    .animation('.view-container',function(){
        return{
            enter:function(e,fn){
                $(e).css({left:$(window).width()});
                $(e).animate({left:0},2000,fn);
            },
            leave:function(e,fn){
                $(e).css({left:0});
                $(e).animate({left:-1*$(window).width()},2000,fn);
            }
        }
    });




