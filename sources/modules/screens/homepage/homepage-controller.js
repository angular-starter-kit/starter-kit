'use strict';

angular
  .module('homepage')
  .controller('homeController', function($scope,
                                         logger,
                                         saidnoService) {

      logger = logger.getLogger('homepage');
      (function(){
        saidnoService.query().then(function(data){
          console.log(data);
        });
      })();
  });
