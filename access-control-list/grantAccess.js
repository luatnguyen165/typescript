const AccessControl = require('accesscontrol');
const ac = new AccessControl();
  ac.grant('admin')
    .updateAny('post')
    .grant('writer')
    .createOwn('post')
    .deleteOwn('post')
    .readAny('post')
    .grant('editor')
    .extend('writer')
    .updateAny('post')
    .deleteAny('post')

function AccessGranted(ROLES){
    const permissions = ac.can(ROLES);
    if(!permissions.granted){
        next();
    }
}
 
