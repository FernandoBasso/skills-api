import { Express } from 'express';
// import { Server } from 'http';
import request from 'supertest';
// import apiServer from 'src/index';

let app: Express;

beforeEach(async () => {
  const mod = await import('src/index');
  app = mod.app;
});

afterEach(() => {
  jest.resetModules();
});

describe('home routes', () => {
  it('should display the home welcome message', async () => {
    const { body } = await request(app).get('/');
    expect(body).toEqual({ text: 'Welcome aboard the Skills API!' });
  });
});

