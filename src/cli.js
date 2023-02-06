const {mdLinks} = require ('./index.js');
mdLinks ('/rutainexistente/').then (()=> {})
.catch((error)=> {
  console.log(error)
});
