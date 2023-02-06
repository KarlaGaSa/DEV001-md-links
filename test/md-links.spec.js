const {mdLinks} = require('../src/index.js');

describe('mdLinks', () => {
  it('deberia ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it ('debería devolver una promesa', () => mdLinks().then(() => {
    expect(mdLinks()).toBe(typeof  Promise);
  }).catch(()=> {})
  );     
  it('debe rechazar cuando el path no existe', () => mdLinks('./noexiste.md').catch((error) => {
      expect(error).toBe('la ruta no existe')
    }))
  it('debe rechazar cuando el archivo no es un .md', () => 
    mdLinks('./imagen.png').catch((error) => {
      expect(error).toBe('No es un archivo .md');
    }))
  });

