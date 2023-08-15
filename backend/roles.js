const AccessControl = require('accesscontrol')
const ac = new AccessControl()

exports.roles = (function() {
    ac.grant("basic")
     .readOwn("profile")
     .updateOwn("profile")
     .createOwn("excuse")
     .readOwn("excuse")
     .updateOwn("excuse")
     .deleteOwn("excuse")
     .createOwn("skill")
     .readOwn("skill")
     .updateOwn("skill")
     .deleteOwn("skill")

     
    ac.grant("director")
     .extend("basic")
     .readAny("profile")
     .updateAny("profile")
     .readAny("excuse")
     .createOwn("meeting")
     .readOwn("meeting")
     .deleteOwn("meeting")
     .updateOwn("meeting")
     .createOwn("project")
     .readOwn("project")
     .deleteOwn("project")
     .updateOwn("project")
     .readAny("skill")
     
    ac.grant("saa")
     .extend("basic")
     .extend("director")
     .readAny("meeting")
     .deleteAny("meeting")
     .updateAny("meeting")
     .deleteAny("profile")

    ac.grant("sec")
     .extend("saa")
     .extend("director")
     .updateAny("project")
     .deleteAny("project")
    
     
    return ac;
    })();
    
   