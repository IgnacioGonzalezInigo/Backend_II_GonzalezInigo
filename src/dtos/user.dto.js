// Data Transfer Object (DTO)

export const getUserDTO = (user) => ({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
    cart: user.cart,
});
