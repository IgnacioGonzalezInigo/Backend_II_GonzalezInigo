import jwt from 'jsonwebtoken';


export function requireLogin(req, res, next){
    if(!req.session.user){
        return res.status(401).json({error: "No Autorizado"});
    }
    next();
}

export function alreadyLogin(req, res, next){
    if(req.session.user){
        return res.status(403).json({error: "Ya estas logueado.!!"});
    }
    next();
}

// Autorizacion por Roles
export function requireRole(role) {
    return (req, res, next) => {
        const user = req.session?.user || req.user;
        if(!user) return res.status(401).json({error: "No Autorizado"});
        if (user.role !== role) return res.status(403).json({error: "Prohibido"});
        next();
    };
}

export function requireJWT(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
    return res.status(401).json({
        status: "error",
        msg: "No autorizado: token inexistente"
    });
    }

    try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = payload.user;

    next();
    } catch (error) {
    return res.status(401).json({
        status: "error",
        msg: "Token inválido o expirado"
    });
    }
}