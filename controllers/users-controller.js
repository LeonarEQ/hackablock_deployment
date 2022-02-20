const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersRepository } = require('../repositories');
const { imagesRepository } = require('../repositories');

async function register(req, res, next) {
  try {
    const { nombre, email, password, apellido, tutor, role, avatar } = req.body;

    const schema = Joi.object({
      nombre: Joi.string().required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.min': `"Nombre" debe tener un mínimo de 3 caracteres`,
        'string.empty': `Los campos no pueden ir vacíos.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
      email: Joi.string().email().required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.empty': `Los campos no pueden ir vacíos.`,
        'string.email': `Por favor ingresa un email válido`,
        'string.pattern.base': `"Email" no puede tener caracteres numéricos.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
      apellido: Joi.string().allow(null, ''),
      avatar: Joi.string().allow(null, ''),
      tutor: Joi.number(),
      role: Joi.string(),
      password: Joi.string().min(5).max(50).required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.empty': `Los campos no pueden ir vacíos.`,
        'string.min': `La contraseña debe ser de mínimo 5 caracteres.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
    });

    await schema.validateAsync({
      nombre,
      email,
      password,
      apellido,
      avatar,
      tutor,
      role,
    });

    const user = await usersRepository.findUserByEmail(email);

    if (user) {
      const err = new Error(`Ya existe un usuario con email: ${email}`);
      err.status = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await usersRepository.createUser({
      nombre,
      email,
      password: passwordHash,
      apellido,
      tutor,
      role,
      avatar,
    });

    res.status(201);
    res.send(createdUser);
  } catch (err) {
    next(err);
  }
} //

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.empty': `Los campos no pueden ir vacíos.`,
        'string.email': `Por favor ingresa un email válido`,
        'string.pattern.base': `"Email" no puede tener caracteres numéricos.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
      password: Joi.string().min(5).max(50).required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.empty': `Los campos no pueden ir vacíos.`,
        'string.min': `La contraseña debe ser de mínimo 5 caracteres.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
    });

    await schema.validateAsync({ email, password });

    const user = await usersRepository.findUserByEmail(email);

    if (!user) {
      const error = new Error('No existe el usuario');
      error.code = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }

    const tokenPayload = { id: user.id, role: user.role };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.send({
      id: user.id,
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await usersRepository.getUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
} //
async function getTeachers(req, res, next) {
  try {
    const teachers = await usersRepository.getTeachers();
    res.send(teachers);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const { userId } = req.params;
    if (Number(userId) !== req.auth.id) {
      const err = new Error('El usuario no tiene permisos');
      err.status = 403;
      throw err;
    }

    const user = await usersRepository.findUserById(userId);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getTeacherById(req, res, next) {
  try {
    const { teacherId } = req.params;
    const user = await usersRepository.findTeacherById(teacherId);
    res.send(user);
  } catch (error) {
    next(error);
  }
} //
async function getUserByEmail(req, res, next) {
  try {
    const { userEmail } = req.params;
    const user = await usersRepository.findUserByEmail(userEmail);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function updatePassword(req, res, next) {
  try {
    const { id } = req.params;
    let { password } = req.body;
    const { admin } = req.auth;

    if (id !== req.auth.id && admin !== 1) {
      const err = new Error('El usuario no tiene permisos');
      err.status = 403;
      throw err;
    }
    const userSchema = Joi.object({
      password: Joi.string().min(5).max(20).required(),
    });
    await userSchema.validateAsync({ password });
    password = await bcrypt.hash(password, 10);
    const updatedPassword = await usersRepository.updatePassword({
      password,
      id,
    });

    res.send(updatedPassword);
  } catch (err) {
    next(err);
  }
} //
async function createTeacher(req, res, next) {
  try {
    const { id } = req.params;
    const {
      userId,
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
    } = req.body;

    if (id !== req.auth.id) {
      const err = new Error('El usuario no tiene Peermisos');
      err.status = 403;
      throw err;
    }
    const schema = Joi.object({
      userId: Joi.number(),
      nombre: Joi.string(),
      avatar: Joi.string(),
      tutor: Joi.number(),
      tutor_direccion: Joi.string(),
      tutor_titulo: Joi.string(),
      tutor_telefono: Joi.string(),
      tutor_precio: Joi.number(),
      tutor_valoracion: Joi.number(),
      tutor_paypal: Joi.string(),
      categoria_blockchain: Joi.number(),
      categoria_bitcoin: Joi.number(),
      categoria_cripto: Joi.number(),
      categoria_ethereum: Joi.number(),
      categoria_hyperledger: Joi.number(),
    });
    await schema.validateAsync({
      userId,
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
    });

    const newTeacher = await usersRepository.updateTeacher(
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
      userId
    );

    res.send(newTeacher);
  } catch (err) {
    next(err);
  }
} //

async function updateUser(req, res, next) {
  try {
    const { userId } = req.params;
    const {
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
    } = req.body;

    const schema = Joi.object({
      nombre: Joi.string().allow(null, ''),
      email: Joi.string().email().required().messages({
        'string.base': `Lo sentimos, un error ha sucedido, intentalo más tarde`,
        'string.empty': `Email no puede ir vacío.`,
        'string.email': `Hay un error en el email`,
        'string.pattern.base': `"Email" no puede tener caracteres numéricos.`,
        'any.required': `Los campos no pueden ir vacíos`,
      }),
      apellido: Joi.string().allow(null, ''),
      biografia: Joi.string().allow(null, ''),
      sitio_web: Joi.string().allow(null, ''),
      twitter: Joi.string().allow(null, ''),
      facebok: Joi.string().allow(null, ''),
      linkedin: Joi.string().allow(null, ''),
      youtube: Joi.string().allow(null, ''),
      role: Joi.string().allow(null, ''),
      tutor: Joi.number().allow(null, ''),
    });
    await schema.validateAsync({
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
    });
    const updatedUser = await usersRepository.updateUser(
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
      userId
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function getPassword(req, res, next) {
  try {
    const { id } = req.params;
    const { admin } = req.auth;

    if (id !== req.auth.id && admin !== 1) {
      const err = new Error('El usuario no tiene permisos');
      err.status = 403;
      throw err;
    }
    const oldPassword = await usersRepository.findPassword(id);
    res.send(oldPassword);
  } catch (err) {
    next(err);
  }
} //
async function addAvatar(req, res, next) {
  try {
    const { file } = req;
    const { id } = req.params;
    const url = `${id}/${file.filename}`;
    const image = await imagesRepository.createImage(url, id);

    res.status(201);
    res.send(image);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    await usersRepository.deleteUser(id);
    res.status(204);
    res.send();
  } catch (err) {
    next(err);
  }
}
module.exports = {
  /*createUser,*/
  getUserById,
  login,
  register,
  updatePassword,
  createTeacher,
  getTeachers,
  updateUser,
  getUserByEmail,
  getUsers,
  getTeacherById,
  getPassword,
  addAvatar,
  deleteUser,
};
