const jwt = require('jsonwebtoken');



/**
 * generador de jwt
 * 
 * recibe los datos a tokenizar
 */
exports.jwtGenetator = (datos) => jwt.sign(
  {
    usuario: datos,
  },
  process.env.TOKEN_SECRET,
  { expiresIn: process.env.EXPIRE_TOKEN || '24h' },
);

/**
 * jwt decode token
 */
 exports.jwtDecode = (token) => jwt.verify(
  token,
  process.env.TOKEN_SECRET,
  (err, decoded) => {
    if (decoded) {
      return decoded;
    }
    if (err) {
      return null;
    }
    return null;
  },
);