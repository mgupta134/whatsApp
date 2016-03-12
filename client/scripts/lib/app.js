//In lib folder because we need this file to be loaded first
//and meteor loads all the files in lib folder first
angular.module('Whatsapp', [
    'angular-meteor',
    'ionic',
    'angularMoment'
  ]);
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['Whatsapp']);
} 

