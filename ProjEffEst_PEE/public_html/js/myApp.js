var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when("/Home",{
            templateUrl: "Views/PEEView.html"
        })
        .otherwise({redirectTo:'/Home'});
}]);

myApp.factory("ItemService",function($rootScope){
    var ItemService = {};
    ItemService.CurrentItem = {};
    ItemService.PreviousItem = {};
   
    ItemService.SelectItem = function(item){
        this.SetItem(item);
        $rootScope.$broadcast("ItemSelcted");
    };
    ItemService.ChangeItem = function(item){
         this.SetItem(item);
         $rootScope.$broadcast("ItemChanged");
    };
    ItemService.DeleteItem = function(item){
         this.SetItem(item);
         $rootScope.$broadcast('ItemDelete');
    };
    ItemService.NewItem = function(item){
         this.SetItem(item);
         $rootScope.$broadcast('ItemNew');
    };
    this.SetItem = function (item){
        ItemService.PreviousItem = ItemService.CurrentItem;
        ItemService.CurrentItem = item;
    };
    return ItemService;
});

PEEController.$inject = ['$scope','ItemService'];