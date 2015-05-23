var VK = Meteor.npmRequire('vkapi');
var vk = new VK({
   'appId'     : 3711036,
   'appSecret' : 'FAgdQuI1xziGqoyFGhFv',
   'language'  : 'ru',
   'mode'      : 'sig'
});

/**
 * Request server methods
 */

// Setup server access token for server API methods
vk.on('serverTokenReady', function(result) {
    // Here will be server access token
    vk.setToken(result.access_token);
});

vk.request('wall.post', {
    owner_id:-75420207,
    from_group: 1,
    message: "WriteUp"
});
vk.on('done:wall.post', function(_o) {
    console.log(_o);
});
