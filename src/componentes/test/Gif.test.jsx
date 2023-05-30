import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GifComponent from '../GifComponent';

test('Renderiza un mensaje de carga cuando no se proporcionan palabras', async () => {
  const aWords = [];
  render(<GifComponent cWords={aWords} />);

  const oLoadingElement = await screen.findByText('Cargando GIF...');
  expect(oLoadingElement).toBeInTheDocument();
});

test('Renderiza un GIF basado en las palabras proporcionadas', async () => {
  const aWords = ['gato', 'divertido'];
  render(<GifComponent cWords={aWords} />);

  const oGifElement = await screen.findByAltText('GIF');
  expect(oGifElement).toBeInTheDocument();
});

test('Renderiza un mensaje de error cuando falla la solicitud de la API', async () => {
  const aWords = ['error'];
  render(<GifComponent cWords={aWords} />);

  const oErrorElement = await screen.findByText('Error');
  expect(oErrorElement).toBeInTheDocument();
});
