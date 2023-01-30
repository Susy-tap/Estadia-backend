const { roles } = require('../config/roles')


exports.grantAccess = (accion, recurso) =>

    async (request, response, next) => {

        try {
            // permiso
            const permiso = roles().can(request.user.role)[accion](recurso);
            
            if (!permiso.granted) {
                return response.status(403).json({
                    message: 'No Autorizado para acceder',
                });
            }

            return next(); 
        } catch (error) {
            console.log(error);
            return next(error);
        }
    };
    