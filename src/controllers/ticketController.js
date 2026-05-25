const ticketService = require('../services/ticketService');

class TicketController {
    async listar(req, res) {
        try {
            const tickets = await ticketService.obtenerTodos();
            res.status(200).json({ exito: true, datos: tickets });
        } catch (error) {
            res.status(500).json({ exito: false, mensaje: "Error interno del servidor." });
        }
    }

    async crear(req, res) {
        try {
            const { nombreSolicitante, tipoUsuario, descripcion, gravedad, impacto } = req.body;

            // Validación exhaustiva de campos requeridos (Regla de negocio)
            if (!nombreSolicitante || !tipoUsuario || !descripcion || !gravedad || !impacto) {
                return res.status(400).json({ 
                    exito: false, 
                    mensaje: "Todos los campos del ticket son obligatorios." 
                });
            }

            const nuevoTicket = await ticketService.crearTicket(req.body);
            res.status(201).json({ exito: true, datos: nuevoTicket });
        } catch (error) {
            res.status(500).json({ exito: false, mensaje: "Error al guardar el ticket." });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await ticketService.eliminarTicket(id);

            if (!eliminado) {
                return res.status(404).json({ exito: false, mensaje: "Ticket no encontrado." });
            }

            res.status(200).json({ exito: true, mensaje: "Ticket resuelto/eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ exito: false, mensaje: "Error al procesar la solicitud." });
        }
    }
}

module.exports = new TicketController();