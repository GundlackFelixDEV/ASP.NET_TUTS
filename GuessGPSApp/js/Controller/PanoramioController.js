/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

GeoGuessApp.controller('PanoramioController',function($scope){
   console.log('$PanoramioController init');
   
   $scope.myRequest = {
        'tag': 'city',
        'rect': {'sw': {'lat':49.5, 'lng': 10.7},'ne': {'lat':49.7, 'lng': 11.3}},
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
        'height': 256,
        'croppedPhotos':true
    };
    
    var wapiblock = null;
    var widget = null;
	
    $scope.InitPhotoWidget = function()
    {
        if(wapiblock !== null)
			return null;
        
		
        
        if(widget!== null)
			return null;
		
		console.log("Initialize PanoramioWidget");
		
		wapiblock = document.getElementById('wapiblock');	
        widget = new panoramio.PhotoWidget(wapiblock, $scope.myRequest, $scope.photo_options);        
        widget.setPosition(0);
        
         panoramio.events.listen( widget, panoramio.events.EventType.PHOTO_CHANGED,
            function(e) { $scope.HandlePhotoChanged(e); });
        
    };
    $scope.HandlePhotoChanged = function()
    {
     console.log("Panoramio PhotoChanged"); 
     var img = widget.getPhoto();
     $scope.$broadcast("PositionChanged", img.getPosition());
    };
    
    $scope.HanldeRequestChanged = function()
    {
        if(widget === null){
            console.log("Error PanoramioController: widget not initialized!")
            return;
        }
        
        widget.setRequest($scope.myRequest);
    };
	
	console.log("$PanoramioController init");
	$scope.InitPhotoWidget();
});
