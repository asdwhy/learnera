const UserType = require("../enums/UserType");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports.createPersonalUser = function(user, req) {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    
    return user;
}

module.exports.createCompanyUser = function(user, req, ownerUser) {

    user.address = req.body.address;
    user.type = UserType.company;
    user.website = req.body.website;
    user.phone = req.body.phone;
    user.ownerId = ownerUser.uid;
    user.companyName = req.body.companyName;
    return user;
}

module.exports.imageExists = function(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status == 200;
}