import tickerService from "../services/ticker.service";

// Obtener todos los tickets
const getAll = async (req, res) => {
    try {
        const tickets = await ticketService.getAll();
        res.json({
            status: 'success',
            payload: tickets
        });
    } catch (error) {
        console.error({ error });
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Obtener ticket por ID
const getById = async (req, res) => {
    try {
        const { tid } = req.params;
        const ticket = await ticketService.getById(tid);
        
        res.json({
            status: 'success',
            payload: ticket
        });
    } catch (error) {
        console.error({ error });
        
        if (error.message === 'TICKET_NOT_FOUND') {
            return res.status(404).json({
                status: 'error',
                error: 'Ticket no encontrado'
            });
        }
        
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

// Obtener tickets del usuario actual
const getMyTickets = async (req, res) => {
    try {
        const userId = req.user.id;
        const tickets = await ticketService.getByUserId(userId);
        
        res.json({
            status: 'success',
            payload: tickets
        });
    } catch (error) {
        console.error({ error });
        res.status(500).json({
            status: 'error',
            error: 'Error del servidor'
        });
    }
};

export default {
    getAll,
    getById,
    getMyTickets
};
