module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const API_KEY_VALIDA = 'FDN-ST-2026'; // Tu clave secreta de acceso

    if (!apiKey || apiKey !== API_KEY_VALIDA) {
        return res.status(401).json({
            exito: false,
            mensaje: "No autorizado. API Key ausente o inválida."
        });
    }
    next();
};