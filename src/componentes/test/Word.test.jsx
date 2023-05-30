import { act } from 'react-dom/test-utils';
import { create } from 'react-test-renderer';
import WordsComponent from '../WordsComponent';

test('debería renderizar el componente correctamente', async () => {
  let oComponent;

  await act(async () => {
    oComponent = create(<WordsComponent />);
  });

  const oRoot = oComponent.root;

  expect(() => oRoot.findByType('h1')).not.toThrow();
  expect(() => oRoot.findByType('p')).not.toThrow();
});

test('debería obtener las primeras cuatro palabras correctamente', async () => {
  const aWords = ['Lorem', 'ipsum', 'dolor', 'sit'];

  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue({ fact: aWords.join(' ') }),
  });

  let oComponent;

  await act(async () => {
    oComponent = create(<WordsComponent />);
  });

  const oRoot = oComponent.root;
  const oParagraphElement = await oRoot.findByType('p');

  expect(oParagraphElement.props.children).toEqual(aWords.join(' '));
});

test('debería manejar errores al obtener las palabras', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Error al obtener las palabras'));
  const oConsoleSpy = jest.spyOn(console, 'log').mockImplementation();

  let oComponent;

  await act(async () => {
    oComponent = create(<WordsComponent />);
  });

  const oRoot = oComponent.root;

  expect(() => oRoot.findByType('p')).toThrow();
  expect(oConsoleSpy).toHaveBeenCalledWith('Error al obtener las palabras');

  oConsoleSpy.mockRestore();
});
