//! Importa variables de ENTORNO
import "dotenv/config";

//! Importa la APP definida en app.ts
import app from "./app";

const PORT = process.env.PORT || 4000;

//! Se inicia el servidor y queda en escucha
app.listen(PORT, () => console.log(`App corriendo en puerto: ${PORT}`));
