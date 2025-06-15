
import { Router } from './Router';

describe('Router', () => {
  it('should be created without errors', () => {
    const router = new Router('#app');
    expect(router).toBeInstanceOf(Router);
  });
});
