'use strict';

describe('myApp.CountDownExample module', function() {

  beforeEach(module('myApp.CountDownExample'));

  describe('CountDownExample controller', function(){

    it('should ....', inject(function($controller,$scope) {
      //spec body
      var CountDownCtrl = $controller('CountDownExampleCtrl',$scope);
      expect(CountDownCtrl).toBeDefined();
    }));

  });
});