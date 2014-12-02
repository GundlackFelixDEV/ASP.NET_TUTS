Number.prototype.toRad = function() { return this * (Math.PI / 180); };

function Position(aMap,aPos){
	
    this.getDisstance = function(pos)
    {
        var R = 6371; // km
        var dLat = (this.GPS.lat-pos.GPS.lat).toRad();
        var dLon = (this.GPS.lng-pos.GPS.lng).toRad();
        var lat1 = this.GPS.lat.toRad();
        var lat2 = this.GPS.lat.toRad();
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 

        return R * c;
    };

    this.setPosition = function(pos)
    {
        console.log("Model:Position: set");
        if(this.isGoogleMaps(pos))
        {
            switch(typeof(pos.lat)){
                case 'function':
                    this.GPS.lat = pos.lat();
                    this.GPS.lng = pos.lng();
                    break;
                default:
                    this.GPS.lat = pos.lat;
                    this.GPS.lng = pos.lng; 
                    break;
            }
        }		
        else if(this.isGeolocation(pos))
        {
            this.GPS.lat = pos.coords.latitude;
            this.GPS.lng = pos.coords.longitude;
        }
        this.Marker.setPosition(this.GPS);
    };

    this.isGoogleMaps = function(pos)
    {
        return (typeof pos.lat !== 'undefined'
                && typeof pos.lng !== 'undefined');
    };

    this.isGeolocation = function(pos)
    {
        return(typeof pos.coords !== 'undefined'
                && typeof pos.coords.latitude !== 'undefined'
                && typeof pos.coords.longitude !== 'undefined');
    };
    this.GPS = {lat: 0,lng: 0};
    this.Marker = new google.maps.Marker({
                map: aMap,
                title: 'Position'});
    this.Map = aMap;

    var pos = aPos;
    if(!aPos){
        pos = { coords:{ latitude:0,longitude:0}};
    };
    this.setPosition(pos);
    this.showMarker = function(){
        this.Marker.setMap(this.Map);
    };
    this.hideMarker = function(){
        this.Marker.setMap(null);
    };
    return this;
};
