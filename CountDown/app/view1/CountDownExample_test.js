'use strict';

describe('myApp.CountDownExample module', function() {

  beforeEach(module('myApp.CountDownExample'));

  describe('CountDownExample controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('CountDownExampleCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});