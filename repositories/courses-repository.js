const { database } = require('../infrastructure');

async function findCourseById(id) {
  const query = 'SELECT * FROM cursos WHERE id = ?';
  const [courses] = await database.pool.query(query, id);

  return courses && courses[0];
}

async function findCourses(nivel, precio, tutor, valoracion, valor, categoria) {
  let query = 'SELECT * FROM cursos';

  let aux = query;
  if (nivel) {
    for (let i = 0; i < nivel.length; i++) {
      if (query === aux) query += " WHERE nivel = '" + nivel[i] + "'";
      else if (i === 0) query += " AND nivel = '" + nivel[i] + "'";
      else query += " OR nivel = '" + nivel[i] + "'";
    }
  }

  if (precio) {
    for (let i = 0; i < precio.length; i++) {
      if (query === aux) query += ` WHERE precio = ${precio[i]}`;
      else if (i === 0) query += ` AND precio = ${precio[i]}`;
      else query += ` OR precio = ${precio[i]}`;
    }
  }
  if (tutor) {
    for (let i = 0; i < tutor.length; i++) {
      if (query === aux) query += ` WHERE id_tutor = ${tutor[i]}`;
      else if (i === 0) query += ` AND id_tutor = ${tutor[i]}`;
      else query += ` OR id_tutor = ${tutor[i]}`;
    }
  }
  if (valoracion) {
    for (let i = 0; i < valoracion.length; i++) {
      if (query === aux) query += ` WHERE valoracion = ${valoracion[i]}`;
      else if (i === 0) query += ` AND valoracion = ${valoracion[i]}`;
      else query += ` OR valoracion = ${valoracion[i]}`;
    }
  }
  if (valor) {
    for (let i = 0; i < valor.length; i++) {
      if (query === aux) query += ` WHERE valor = ${valor[i]}`;
      else if (i === 0) query += ` AND valor = ${valor[i]}`;
      else query += ` OR valor = ${valor[i]}`;
    }
  }
  if (categoria) {
    for (let i = 0; i < categoria.length; i++) {
      if (query === aux) query += ` WHERE ${categoria[i]} = 1`;
      else if (i === 0) query += ` AND ${categoria[i]} = 1`;
      else query += ` OR ${categoria[i]} = 1`;
    }
  }

  query += ' ORDER BY id ASC';

  const [courses] = await database.pool.query(
    query,
    nivel,
    precio,
    tutor,
    valoracion,
    valor,
    categoria
  );
  return courses;
}

async function filtersCourses(data) {
  let query = 'SELECT * from cursos';
  const params = [];

  const {
    nivel,
    precio,
    valoracion,
    valor,
    categoria_blockchain,
    categoria_bitcoin,
    categoria_crypto,
    categoria_ethereum,
    categoria_hyperledger,
    id_tutor,
  } = data;

  if (
    nivel ||
    precio ||
    valoracion ||
    valor ||
    categoria_blockchain ||
    categoria_bitcoin ||
    categoria_crypto ||
    categoria_ethereum ||
    categoria_hyperledger ||
    id_tutor
  ) {
    query = `${query} WHERE `;
    const conditions = [];

    if (nivel) {
      conditions.push('nivel=?');
      params.push(nivel);
    }

    if (precio) {
      conditions.push('precio=?');
      params.push(precio);
    }

    if (valoracion) {
      conditions.push('valoracion=?');
      params.push(valoracion);
    }
    if (valor) {
      conditions.push('valor=?');
      params.push(valor);
    }
    if (categoria_blockchain) {
      conditions.push('categoria_blockchain=?');
      params.push(categoria_blockchain);
    }
    if (categoria_bitcoin) {
      conditions.push('categoria_bitcoin=?');
      params.push(categoria_bitcoin);
    }
    if (categoria_crypto) {
      conditions.push('categoria_crypto=?');
      params.push(categoria_crypto);
    }
    if (categoria_ethereum) {
      conditions.push('categoria_ethereum=?');
      params.push(categoria_ethereum);
    }
    if (categoria_hyperledger) {
      conditions.push('categoria_hyperledger=?');
      params.push(categoria_hyperledger);
    }

    if (id_tutor) {
      conditions.push('id_tutor=?');
      params.push(id_tutor);
    }

    query = `${query} ${conditions.join(' AND ')}`;
    let firstResults = await database.pool.query(query, params);

    return firstResults[0];
  } else {
    const [courses] = await database.pool.query('SELECT * FROM cursos');

    return courses;
  }
}

module.exports = {
  findCourses,
  findCourseById,
  filtersCourses,
};
