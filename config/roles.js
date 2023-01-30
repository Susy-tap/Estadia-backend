const { AccessControl } = require('accesscontrol')

const ac = new AccessControl();

/**
 * definir roles del más inferior al superior
 *  none
 *    usuario
 *      admin
 *     
 */
exports.roles = () => {
    ac.grant('none')
   // poder leer usuarios;
    // aqui los permisos de rol: none

    ac.grant('user')
        //.readOwn('Customer')
       // .readAny(['Customer', 'category']);

    ac.grant('admin')
    .readOwn('Customer')
    .readAny(['Customer', 'category'])
        .readAny('user') // poder leer usuarios
        .createAny(['Customer', 'category', 'user'])
        .updateAny(['Customer', 'category', 'user']);

    ac.grant('super')
        .extend('admin')
        .deleteAny(['Customer', 'category', 'user']);

    return ac;
};