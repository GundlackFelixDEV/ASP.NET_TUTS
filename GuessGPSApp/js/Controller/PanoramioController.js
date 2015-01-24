function PanoramioController ($scope,$injector){ 
    $injector.invoke(GeophotoController, this, {$scope: $scope});
    $scope.Panoramio = {
        Photo: {},
        Settings: new PanoramioSettings(),
        Events: new PanoramioEvents(),
        GetPhotosInBounds: function(){
            if($scope.map !== "undefined"){
                console.log("Panoramio: Get photos in bounds");
                var bounds = $scope.Geolocation.map.getBounds();
                var ne = bounds.getNorthEast();
                var sw = bounds.getSouthWest();
                $scope.Panoramio.Settings.myRequest.rect = {'sw': {'lat':sw.lat(), 'lng': sw.lng()},
                                         'ne': {'lat':ne.lat(), 'lng': ne.lng()}};
                $scope.Panoramio.HanldeRequestChanged();
            }
            widget.setPosition(0);
        },
        HanldeRequestChanged: function(){
            if(widget === null){
                console.log("Error PanoramioController: widget not initialized!");
                return;
            }        
            widget.setRequest($scope.Panoramio.Settings.myRequest);
        },
        HandlePhotoChanged: function(e){
            console.log("Panoramio: HandlePhotoChanged"); 
            var img = widget.getPhoto();
            if(img !== null){
                $scope.Panoramio.Photo = img;
                $scope.Geophoto.SetPosition(img.getPosition());
            } 
        },
        NextPhoto: function(){
            var pos = widget.getPosition();
            widget.setPosition(pos+1);            
            $scope.Panoramio.DisplayWidgetTemporal();
        },
        PreviousPhoto: function(){
            var pos = widget.getPosition();
            if(pos > 0){
                widget.setPosition(pos-1);
               $scope.Panoramio.DisplayWidgetTemporal();
            }
        },
        SetOptions: function(opt){
            if(opt instanceof PanoramioOptions){
                $scope.Panoramio.opt = opt;
                $scope.Panoramio.SetAutomaticRequestOnChangeBounds(opt.AutomaticPhotoRequestOnChangBounds);
            }else{
                console.error("scope.SetPanoramioOptions unrecogniced option format!");
            }
        },
        SetAutomaticRequestOnChangeBounds: function(val){
            if(val){
                console.log("Panoramio: Enable automatic panoramio request on changing bounds.");
                $scope.Panoramio.Events.map_bounds_changed = 
                google.maps.event.addListener($scope.Geolocation.map,'bounds_changed',function(){
                        $scope.Panoramio.GetPhotosInBounds();            
                    });
            }else{
                console.log("Panoramio: Disable automatic panoramio request on changing bounds.");
                google.maps.event.removeListener($scope.Panoramio.Events.map_bounds_changed);
                $scope.Panoramio.Events.map_bounds_changed = null;
            }
        },
        DisableAutomaticRequests: function(){
            this.SetAutomaticRequestOnChangeBounds(false);
        },
        EnableAutomaticRequests: function(){
            this.SetAutomaticRequestOnChangeBounds(true);
        }
    };
    var wapiblock = null;
    var widget = null;
    var WIDGET_ANIMATION_TIME = 300;
    var WIDGET_AUTOHIDE_TIME = 3000;    
    this.initialize = function()
    {
        if(wapiblock !== null){
            return null;
        }       
        if(widget!== null){
            return null;
        }	
        console.log("Panoramio: Initialize");
        var settings = $scope.Panoramio.Settings;
        wapiblock = document.getElementById('wapiblock');	
        widget = new panoramio.PhotoWidget(wapiblock, settings.myRequest, settings.photo_options);
               
        panoramio.events.listen( widget, panoramio.events.EventType.PHOTO_CHANGED,
                                    function(e) { $scope.Panoramio.HandlePhotoChanged(e);});
                                    
        google.maps.event.addListener($scope.Geophoto.Position.Marker, 'click', function() {
           $scope.Panoramio.ToggleDisplayTemporal();
        });
        
        $scope.Panoramio.EnableAutomaticRequests();
    };
    this.initialize();
};

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
