//! IMPORTACION DE VARIABLES DE ENTORNO
import "dotenv/config";

const base_url = process.env.BASE_URL as string;
const whiteList = [base_url, "http://localhost:3005"];

const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization']
  }

export { corsOptions };
