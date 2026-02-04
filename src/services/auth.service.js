// Logica de auth
import userRepository from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/crypto.js';
import { signJwt } from '../utils/jwt.js';

// Registrar usuario
const register = async (data) => {
    const { first_name, last_name, email, age, password } = data;

    if (!first_name || !last_name || !email || !age || !password) {
        throw new Error("FALTA COMPLETAR CAMPOS");
    }

    const emailNormalizado = email.trim().toLowerCase();

    
    const existeUser = await userRepository.getByEmail(emailNormalizado);
    if (existeUser) {
        throw new Error("YA EXISTE ESTE MAIL EN OTRO USUARIO");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.create({
        first_name,
        last_name,
        email: emailNormalizado,
        age,
        password: hashedPassword,
        role: "user",
        cart: null
    });

    return newUser;
};

// Login
const login = async (email, password) => {
    if (!email || !password) {
        throw new Error("FALTA COMPLETAR CAMPOS");
    }

    const emailNormalizado = email.trim().toLowerCase();

    const user = await userRepository.getByEmail(emailNormalizado);
    if (!user) {
        throw new Error("NO EXISTE USUARIO CON ESE MAIL");
    }

    // Verificar password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
        throw new Error("CREDENCIALES INVALIDAS");
    }

    // Generar token JWT
    const tokenPayload = {
        user: {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age
        }
    };

    const token = signJwt(tokenPayload, process.env.JWT_SECRET, "1h");

    return { token, user: tokenPayload.user };
};

export default { 
    register, 
    login 
};