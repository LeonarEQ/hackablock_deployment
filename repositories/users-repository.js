const { database } = require('../infrastructure');

async function getUsers() {
  const [users] = await database.pool.query('SELECT * FROM usuarios');
  return users;
}
async function findPassword(id) {
  const query = 'SELECT password FROM usuarios WHERE id = ?';
  const [password] = await database.pool.query(query, id);
  return password[0];
}

async function updateUser(
  nombre,
  email,
  apellido,
  biografia,
  sitio_web,
  twitter,
  facebok,
  linkedin,
  youtube,
  role,
  tutor,
  id
) {
  const query =
    'UPDATE usuarios SET nombre = ?, email = ?, apellido = ?, biografia = ?, sitio_web = ?, twitter = ?, facebok = ?, linkedin = ?, youtube = ?, role = ?, tutor = ? WHERE id = ?';
  await database.pool.query(query, [
    nombre,
    email,
    apellido,
    biografia,
    sitio_web,
    twitter,
    facebok,
    linkedin,
    youtube,
    role,
    tutor,
    id,
  ]);
  return getUserById(id);
}

async function updatePassword(data) {
  const { password, id } = data;
  const query = 'UPDATE usuarios SET password = ? WHERE id = ?';
  await database.pool.query(query, [password, id]);

  return getUserById(id);
}


async function createUser(data) {
  const query =
    'INSERT INTO usuarios (nombre, email, password, apellido, avatar, tutor, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
  await database.pool.query(query, [
    data.nombre,
    data.email,
    data.password,
    data.apellido,
    data.avatar,
    data.tutor,
    data.role,
  ]);

  return findUserByEmail(data.email);
}


async function updateTeacher(
  nombre,
  avatar,
  tutor,
  tutor_direccion,
  tutor_titulo,
  tutor_telefono,
  tutor_precio,
  tutor_valoracion,
  tutor_paypal,
  categoria_blockchain,
  categoria_bitcoin,
  categoria_cripto,
  categoria_ethereum,
  categoria_hyperledger,
  id
) {
  const query =
    'UPDATE usuarios SET nombre = ?, avatar = ?, tutor = ?,tutor_direccion=?, tutor_titulo = ?, tutor_telefono = ?, tutor_precio = ?, tutor_valoracion = ?, tutor_paypal = ?,categoria_blockchain=?, categoria_bitcoin = ?, categoria_cripto = ?, categoria_ethereum = ?, categoria_hyperledger = ? WHERE id = ?';
  await database.pool.query(query, [
    nombre,
    avatar,
    tutor,
    tutor_direccion,
    tutor_titulo,
    tutor_telefono,
    tutor_precio,
    tutor_valoracion,
    tutor_paypal,
    categoria_blockchain,
    categoria_bitcoin,
    categoria_cripto,
    categoria_ethereum,
    categoria_hyperledger,
    id,
  ]);

  return getUserById(id);
}
async function getUserById(id) {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  const [users] = await database.pool.query(query, id);

  return users[0];
}
async function getTeachers() {
  const [users] = await database.pool.query(
    'SELECT * FROM usuarios WHERE tutor = 1'
  );
  return users;
}

async function findUserById(id) {
  const query = 'SELECT * FROM usuarios WHERE id = ?';
  const [users] = await database.pool.query(query, id);

  return users[0];
}
async function findUserByEmail(email) {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  const [users] = await database.pool.query(query, email);

  return users[0];
}
async function findTeacherById(id) {
  const query = 'SELECT * FROM usuarios WHERE tutor = 1 AND id = ?';
  const [users] = await database.pool.query(query, id);

  return users[0];
}

async function deleteUser(id) {
  const query = 'DELETE FROM usuarios WHERE id = ?';

  return database.pool.query(query, id);
}

module.exports = {
  getUsers,
  findUserByEmail,
  createUser,
  updatePassword,
  getUserById,
  getTeachers,
  updateUser,
  updateTeacher,
  findTeacherById,
  findPassword,
  deleteUser,
  findUserById,
};
