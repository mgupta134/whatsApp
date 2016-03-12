//***We will use the controller with conrollerAs syntax, 
//which means we won't put our variables on the 
//$scope - we will use this context instead.
angular
    .module('Whatsapp')
    .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl($scope, $reactive, NewChat) {
    //$reactive service is part of Angular-Meteor
    //we used our this context and attached in to our $scope.
    //$reactive will extend our controller with new functionality 
    //like creating Meteor helpers, subscription and use 
    //Autorun - all of these from our AngularJS controller context.
    $reactive(this).attach($scope);

    this.showNewChatModal = showNewChatModal;
    this.remove = remove;

    this.helpers({
        data() {
            return Chats.find();
        }
    });

    function showNewChatModal() {
        NewChat.showModal();
    }

    function remove(chat) {
        Meteor.call('removeChat', chat._id);
    }

}
