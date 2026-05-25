const fs = require('fs').promises;
const path = require('path');
const jsonPath = path.join(__dirname, '../data/tickets.json');

class TicketService {
    // Algoritmo de Negocio: Calcular Prioridad Automática
    calcularPrioridad(tipoUsuario, gravedad, impacto) {
        let puntuacion = 0;

        // Criterio 1: Tipo de Usuario
        if (tipoUsuario === 'funcionario') puntuacion += 3;
        else if (tipoUsuario === 'docente') puntuacion += 2;
        else if (tipoUsuario === 'estudiante') puntuacion += 1;

        // Criterio 2: Gravedad
        if (gravedad === 'alta') puntuacion += 3;
        else if (gravedad === 'media') puntuacion += 2;
        else if (gravedad === 'baja') puntuacion += 1;

        // Criterio 3: Impacto
        if (impacto === 'institucional') puntuacion += 3;
        else if (impacto === 'grupal') puntuacion += 2;
        else if (impacto === 'individual') puntuacion += 1;

        // Determinación de prioridad final
        if (puntuacion >= 7) return 'Alta';
        if (puntuacion >= 4) return 'Media';
        return 'Baja';
    }

    async obtenerTodos() {
        try {
            const data = await fs.readFile(jsonPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardar(tickets) {
        await fs.writeFile(jsonPath, JSON.stringify(tickets, null, 2));
    }

    async crearTicket(datos) {
        const tickets = await this.obtenerTodos();
        
        const nuevoTicket = {
            id: Date.now().toString(), // ID Único
            clasi_id: datos.clasi_id || "Soporte General",
            nombreSolicitante: datos.nombreSolicitante,
            tipoUsuario: datos.tipoUsuario, // estudiante, docente, funcionario
            descripcion: datos.descripcion,
            gravedad: datos.gravedad, // alta, media, baja
            impacto: datos.impacto, // institucional, grupal, individual
            prioridad: this.calcularPrioridad(datos.tipoUsuario, datos.gravedad, datos.impacto),
            fechaCreacion: new Date().toISOString()
        };

        tickets.push(nuevoTicket);
        await this.guardar(tickets);
        return nuevoTicket;
    }

    async eliminarTicket(id) {
        let tickets = await this.obtenerTodos();
        const existe = tickets.some(t => t.id === id);
        if (!existe) return false;

        tickets = tickets.filter(t => t.id !== id);
        await this.guardar(tickets);
        return true;
    }
}

module.exports = new TicketService();