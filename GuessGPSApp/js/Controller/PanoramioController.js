/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function PanoramioController($scope,$injector){
   console.log('$PanoramioController init');
   
   $injector.invoke(PhotolocationController, this, {$scope: $scope});
   
   $scope.myRequest = {
        'rect': {'sw': {'lat':49.5, 'lng': 10.7},'ne': {'lat':49.7, 'lng': 11.3}},
    };
	
    $scope.Tags = [
        'all',
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
    var WIDGET_ANIMATION_TIME = 300;
    var WIDGET_AUTOHIDE_TIME = 3000;
    $scope.InitPhotoWidget = function()
    {
        if(wapiblock !== null)
        {
            return null;
        }       
        if(widget!== null)
        {
            return null;
        }
		
        console.log("Initialize PanoramioWidget");

        wapiblock = document.getElementById('wapiblock');	
        widget = new panoramio.PhotoWidget(wapiblock, $scope.myRequest, $scope.photo_options);
        $(wapiblock).hide();
        $(wapiblock).mouseenter(function(){
           $scope.DisplayPhotoWidget(); 
        }).mouseleave(function(){
            $scope.HidePhotoWidget(WIDGET_AUTOHIDE_TIME);
        });
        
        panoramio.events.listen( widget, panoramio.events.EventType.PHOTO_CHANGED,
                                    function(e) { $scope.HandlePhotoChanged(e); });
        
        google.maps.event.addListener($scope.PhotoPosition.Marker, 'click', function() {
            $scope.DisplayPhotoWidgetTemporal(4000);
        });
        google.maps.event.addListener($scope.map,'bounds_changed',function(){
            $scope.HandleMapBoundsChanged();            
        });
    };
    $scope.DisplayPhotoWidget = function(delay){
        var t_delay = delay;
        if(typeof t_delay === "undefined"){
            t_delay = 0;   
        }
        $(wapiblock).finish()
                .delay(t_delay)
                .show(WIDGET_ANIMATION_TIME);
    };
    $scope.HidePhotoWidget = function(delay){
        var t_delay = delay;
        if(typeof t_delay === "undefined"){
            t_delay = 0;   
        }
        $(wapiblock).finish()
                .show()
                .delay(t_delay)
                .hide(WIDGET_ANIMATION_TIME);
    };
    $scope.DisplayPhotoWidgetTemporal = function(timeOut){
        var t_delay = timeOut;
        if(typeof t_delay === "undefined"){
            t_delay = WIDGET_AUTOHIDE_TIME;   
        }
        $(wapiblock).finish()
                .show(WIDGET_ANIMATION_TIME)
                .delay(t_delay)
                .hide(WIDGET_ANIMATION_TIME);
    };
    
    $scope.HandlePhotoChanged = function()
    {
        console.log("Panoramio PhotoChanged"); 
        var img = widget.getPhoto();
        if(img !== null){
            var pos = img.getPosition();
            $scope.$broadcast("PhotoPositionChanged", {coords:{latitude: pos.lat,longitude: pos.lng}});   
        }      
    };
    $scope.HandleMapBoundsChanged = function(){
        if($scope.map !== "undefined"){
            console.log("PanoramioController: HandleMapBoundsChanged");
            var bounds = $scope.map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            $scope.myRequest.rect = {'sw': {'lat':sw.lat(), 'lng': sw.lng()},
                                     'ne': {'lat':ne.lat(), 'lng': ne.lng()}};
            $scope.HanldeRequestChanged();
        }
    };
    $scope.HanldeRequestChanged = function(){
        if(widget === null){
            console.log("Error PanoramioController: widget not initialized!");
            return;
        }        
        widget.setRequest($scope.myRequest);
        widget.setPosition(0);
    };
    $scope.NextPhoto = function(){
        var pos = widget.getPosition();
        widget.setPosition(pos+1);
        $scope.DisplayPhotoWidgetTemporal();
    };
    $scope.PreviousPhoto = function(){
        var pos = widget.getPosition();
        widget.setPosition(pos+1);
        $scope.DisplayPhotoWidgetTemporal();
    };
    console.log("$PanoramioController init");
    $scope.InitPhotoWidget();
};
