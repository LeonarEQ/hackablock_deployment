const { database } = require('../infrastructure');

async function findImageById(id) {
  const query = 'SELECT avatar FROM usuarios WHERE id = ?';
  const [avatar] = await database.pool.query(query, id);

  return avatar[0];
}
async function createImage(url, id) {
  const query = 'UPDATE usuarios SET avatar = ? WHERE id = ?';
  const [result] = await database.pool.query(query, [url, id]);

  return findImageById(result.insertId);
}
module.exports = {
  findImageById,
  createImage,
};
