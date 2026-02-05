// Autorizacion por Roles

export const authorization = (rolesAutorizados) => {
    return (req,res,next) => {
        // Verifico que este autenticado
        if (!req.user) {
            return res.status(401).json({
                status:'error',
                error: 'No autenticado'
            })
        }
        // Verifico que tenga uno de los roles permitidos
        const rolUsuario = req.user.role;
        if (!rolesAutorizados.includes(rolUsuario)){
            return res.status(403).json({
                status: 'error',
                error: 'Usuario no autorizado',
            })
        }

        next();
    }
}