/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

GeoGuessApp.controller('PanoramioController',function($scope){
   $scope.myRequest = {
        'tag': 'sunset',
        'rect': {'sw': {'lat': -30, 'lng': 10.5}, 'ne': {'lat': 50.5, 'lng': 30}},
    };
    $scope.Tags = [
        'sunset',
        'beaches',
        'panorama',
        'mountains',
        'church',
        'urban',
        'mountain',
        'playas',
        'best',
        'castle'
    ];
    
    $scope.photo_options = {
        'width': 300,
        'height': 200,
        'croppedPhotos':true,
    };
    
    var wapiblock = null;
    var widget = null;
    $scope.InitPhotoWidget = function()
    {
        if(wapiblock === null)
            wapiblock = document.getElementById('wapiblock');
        
        
        widget = new panoramio.PhotoWidget(wapiblock, $scope.myRequest, $scope.photo_options);
        widget.setPosition(0);
        widget.enableNextArrow();
        widget.enalbePreviousArrow();
    };
    
    $scope.HanldeRequestChanged = function()
    {
        if(widget === null){
            console.log("Error PanoramioController: widget not initialized!")
            return;
        }
        
        widget.setRequest($scope.myRequest);
    };
    
});
