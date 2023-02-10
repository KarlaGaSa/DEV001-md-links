const {
  pathExists,
  absolutePath,
  fileExt,
  getLinks,
  statusLinks,
} = require('./index.js');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  //La ruta sí existe
  if (!pathExists(path)) {
    reject(new Error('La ruta no existe'))
  }
  else {
    console.log('La ruta sí existe');
  }
  const absolute = absolutePath(path);
  // Validar archivo md
  if (!fileExt(absolute)) {
    reject(new Error('No es un archivo md'));
  } else {
    console.log('el archivo es de tipo .md');
  // Leer los links
  getLinks(absolute).then((newArray) => {
    if (newArray.length === 0) {
      reject(new Error('No tiene links'))
    }
    else if (options === { validate: false }) {
      resolve(newArray);
    } else {
      statusLinks(newArray).then((res) => {
        resolve(res);
      });
    }
  });
}
});

module.exports = {
mdLinks,
};
