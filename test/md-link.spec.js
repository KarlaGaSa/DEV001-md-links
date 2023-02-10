const { mdLinks } = require('../md-link.js');

describe('mdLinks', () => {
  it('debe ser una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('debe devolver una promesa', () => mdLinks()
    .then(() => {
      expect(mdLinks).toBe(typeof 'promise');
    })
    .catch((error) => error));
  it('debe rechazar la promesa si no encuentra un path', () => mdLinks('noexiste/path.md').catch((error) => {
    expect(error).toStrictEqual(new Error('La ruta no existe'));
  }));
  it('debe rechazar la promesa si el archivo no es .md', () => mdLinks('./Pruebas/Sin-links.txt').catch((error) => {
    expect(error).toStrictEqual(new Error('El archivo no es .md'));
  }));
  it('debe rechazar la promesa si el archivo no contiene links', () => mdLinks('./Pruebas/Sin-links.txt').catch((error) => {
    expect(error).toStrictEqual(new Error('El archivo no contiene links'));
  }));
});