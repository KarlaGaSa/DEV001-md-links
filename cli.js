const { mdLinks } = require('./md-link.js');
mdLinks('/Users/karlagsanabria/Desktop/Labo/DEV001-md-links/Pruebas/Con-links.md')
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });