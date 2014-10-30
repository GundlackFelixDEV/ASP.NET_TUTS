var PanoramioSettings = function($scope){
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
		
		$scope.Request = {
			'rect': {'sw': {'lat':-90, 'lng': -180},'ne': {'lat':90, 'lng': 180}},
		};
		
		$scope.Order = {
			"panoramio.PhotoOrder.DATE_DESC"
		};
}