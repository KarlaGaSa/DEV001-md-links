const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Existe path?
// const path = './index.js'
const pathExists = (route) => fs.existsSync(route);
// Validar si la ruta es absoluta o convertirla a absoluta
const absolutePath = (route) => (path.isAbsolute(route) ? route : path.resolve(route));
// Con extname devolver la extensión del archivo y determinar si es o no .md 
 const fileExt = (route) => {
  const filePath = path.extname(route);
  if (filePath === '.md') {
    return true;
  } return false;
};
// función que lee los archivos .md
// fs.readFile lee el contenido del archivo
const readFile = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf-8', (error, file) => {
    if (error) {
      reject(error);
    } else {
      resolve(file);
    }
  });
});

// función que obtiene los links del archivo .md
// .exec indica que es linksURL es una expresión regular
const getLinks = (archivo) => new Promise((resolve, reject) => {
  const linksArr = [];
  readFile(archivo)
    .then((file) => {
      const linksURL = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
      let search = linksURL.exec(file);
      while (search !== null) {
        linksArr.push({
          href: search[2],
          text: search[1],
          file: archivo,
        });
        search = linksURL.exec(file);
      }
      resolve(linksArr);
    })
    .catch((error) => reject(error));
   
});

/*Función que verifica el status de los links
const array = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: '/Users/karlagsanabria/Desktop/Labo/DEV001-md-links/Pruebas/Con-links.md',
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: '/Users/rosario/Documents/GitHub/DEV001-md-linksRHA/pruebas/pruebaConLinks.md',
  },
  {
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.pg',
    text: 'md-links',
    file: '/Users/rosario/Documents/GitHub/DEV001-md-linksRHA/pruebas/pruebaConLinks.md',
  },
];*/

const statusLinks = (urls) => Promise.all(urls.map((link) => axios.get(link.href)
  .then((response) => ({ ...link, status: response.status, message: 'ok' }))
  .catch((error) => ({ ...link, status: error.response.status, message: 'fail' }))));

module.exports = {
        pathExists,
        absolutePath,
        fileExt,
        readFile,
        getLinks,
        statusLinks,
      };
