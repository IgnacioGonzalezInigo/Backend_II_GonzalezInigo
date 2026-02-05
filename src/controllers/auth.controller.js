// Auth Controller 
import authService from '../services/auth.service.js';
import { getUserDTO }   from '../dtos/user.dto.js';


// Registro
const register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);

        res.status(201).json({
            status: "success",
            msg: "Usuario creado con éxito",
            user: {
                _id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age,
                role: newUser.role,
                cart: newUser.cart
            }
        });
    } catch (error) {
        console.error({ error });

        if (error.message === "FALTA COMPLETAR CAMPOS") {
            return res.status(400).json({
                status: "error",
                msg: "Todos los campos son obligatorios"
            });
        }

        if (error.message === "YA EXISTE UN USUARIO CON ESTE EMAIL") {
            return res.status(400).json({
                status: "error",
                msg: `El email ya está en uso`
            });
        }

        res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { token, user } = await authService.login(email, password);

        res.status(200).json({
            status: "success",
            token,
            user
        });
    } catch (error) {
        console.error({ error });

        if (error.message === "FALTA COMPLETAR CAMPOS") {
            return res.status(400).json({
                status: "error",
                msg: "Todos los campos son obligatorios"
            });
        }

        if (error.message === "CREDENCIALES INVALIDAS") {
            return res.status(401).json({
                status: "error",
                msg: "Credenciales inválidas"
            });
        }

        res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

// Current - Obtener usuario actual
const current = (req, res) => {
    const userEnLimpio = getUserDTO(req.user);
    return res.status(200).json({
        status: "success",
        user: userEnLimpio,
    })
}

export default { 
    register, 
    login, 
    current 
};