function PanoramioController ($scope,$injector,PhotoService){
 
    $injector.invoke(GeophotoController, this, {$scope: $scope});
   
    $scope.photo = {};
    var wapiblock = null;
    var widget = null;
    var WIDGET_ANIMATION_TIME = 300;
    var WIDGET_AUTOHIDE_TIME = 3000;
    $scope.PanoSettings = new PanoramioSettings();
    $scope.PanoEvents = new PanoramioEvents();
    this.initialize = function()
    {
        if(wapiblock !== null){
            return null;
        }       
        if(widget!== null){
            return null;
        }	
        console.log("Panoramio: Initialize");
        var settings = $scope.PanoSettings;
        wapiblock = document.getElementById('wapiblock');	
        widget = new panoramio.PhotoWidget(wapiblock, settings.myRequest, settings.photo_options);
        $(wapiblock).hide();
        $(wapiblock).mouseenter(function(){
           $scope.DisplayPhotoWidget(); 
        }).mouseleave(function(){
            $scope.HidePhotoWidget(WIDGET_AUTOHIDE_TIME);
        });
        
        panoramio.events.listen( widget, panoramio.events.EventType.PHOTO_CHANGED,
                                    function(e) { $scope.HandlePhotoChanged(e); });
        
        google.maps.event.addListener($scope.Geophoto.Position.Marker, 'click', function() {
           $scope.ToggleDisplayTemporal();
        });
        
        $scope.EnableAutomaticPanoramioRequests();
    };
    
    $scope.ToggleDisplayTemporal = function()
    {
        if($(wapiblock).is(':visible')){
            $scope.HidePhotoWidget();
        }else{
            $scope.DisplayPhotoWidgetTemporal(WIDGET_AUTOHIDE_TIME);
        }
    };
    $scope.DisplayPhotoWidget = function(delay){
        var t_delay = delay;
        if(typeof t_delay === "undefined"){
            t_delay = 0;   
        }
        $(wapiblock).stop()
                .delay(t_delay)
                .show(WIDGET_ANIMATION_TIME);
    };
    $scope.HidePhotoWidget = function(delay){
        var t_delay = delay;
        if(typeof t_delay === "undefined"){
            t_delay = 0;   
        }
        $(wapiblock).stop()
                .show()
                .delay(t_delay)
                .hide(WIDGET_ANIMATION_TIME);
    };
    $scope.DisplayPhotoWidgetTemporal = function(timeOut){
        var t_delay = timeOut;
        if(typeof t_delay === "undefined"){
            t_delay = WIDGET_AUTOHIDE_TIME;   
        }
        $(wapiblock).stop()
                .show(WIDGET_ANIMATION_TIME)
                .delay(t_delay)
                .hide(WIDGET_ANIMATION_TIME);
    };
    
    $scope.HandlePhotoChanged = function()
    {
        console.log("Panoramio: PhotoChanged"); 
        var img = widget.getPhoto();
        if(img !== null){
            $scope.photo = img;
            var pos = img.getPosition();
            $scope.Geophoto.SetPosition(pos);
            //$scope.$broadcast("PhotoPositionChanged", {coords:{latitude: pos.lat,longitude: pos.lng}});
        }      
    };
    $scope.GetPhotosInBounds = function(){
        if($scope.map !== "undefined"){
            console.log("Panoramio: Get photos in bounds");
            var bounds = $scope.Geolocation.map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();
            $scope.PanoSettings.myRequest.rect = {'sw': {'lat':sw.lat(), 'lng': sw.lng()},
                                     'ne': {'lat':ne.lat(), 'lng': ne.lng()}};
            $scope.HanldeRequestChanged();
        }
        widget.setPosition(0);
    };
    $scope.HanldeRequestChanged = function(){
        if(widget === null){
            console.log("Error PanoramioController: widget not initialized!");
            return;
        }        
        widget.setRequest($scope.PanoSettings.myRequest);
    };
    $scope.NextPhoto = function(){
        var pos = widget.getPosition();
        widget.setPosition(pos+1);
        //$scope.DisplayPhotoWidgetTemporal();
    };
    $scope.PreviousPhoto = function(){
        var pos = widget.getPosition();
        if(pos > 0){
            widget.setPosition(pos-1);
            //$scope.DisplayPhotoWidgetTemporal();
        }
    };
    $scope.SetPanoramioOptions = function(opt){
        if(opt instanceof PanoramioOptions){
            $scope.PanoSettings = opt;
            $scope.SetAutomaticRequestOnChangeBounds(opt.AutomaticPhotoRequestOnChangBounds);
        }else{
            console.error("scope.SetPanoramioOptions unrecogniced option format!");
        }
    };
    $scope.SetAutomaticRequestOnChangeBounds = function(val){
        if(val){
            console.log("Panoramio: Enable automatic panoramio request on changing bounds.");
            $scope.PanoEvents.map_bounds_changed = 
            google.maps.event.addListener($scope.Geolocation.map,'bounds_changed',function(){
                    $scope.GetPhotosInBounds();            
                });
        }else{
            console.log("Panoramio: Disable automatic panoramio request on changing bounds.");
            google.maps.event.removeListener($scope.PanoEvents.map_bounds_changed);
            $scope.PanoEvents.map_bounds_changed = null;
        }
    };    
    $scope.DisableAutomaticPanoramioRequests = function(){
        this.SetAutomaticRequestOnChangeBounds(false);
    };
    $scope.EnableAutomaticPanoramioRequests = function(){
        this.SetAutomaticRequestOnChangeBounds(true);
    };
    this.initialize();
};
PanoramioController.$inject = ['$scope','$injector','PhotoService'];

function PanoramioSettings(){
    this.AutomaticPhotoRequestOnChangBounds =  true;
    
    this.myRequest = {
        'rect': {'sw': {'lat':49.5, 'lng': 10.7},'ne': {'lat':49.7, 'lng': 11.3}}
    };	
    this.Tags = [
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
    this.photo_options = {
        'width': 300,
        'height': 256,
        'croppedPhotos':true
    };
};
function PanoramioEvents(){
    this.map_bounds_changed = null;
    this.marker_click = null;
};
