function Position(aMap,aPos,args){
	
		
	this.setPosition = function(pos)
	{
		if(this.isGoogleMaps(pos))
		{
			this.GPS.lat = pos.lat;
			this.GPS.lng = pos.lng;
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
			&& typeof pos.coords.longitude !== 'undefined')
	};
	
	this.GPS = {lat: 0,lng: 0};
	this.Marker = new google.maps.Marker({
		map: aMap,
		title: 'Position'
	});
	this.setPosition(aPos);

};