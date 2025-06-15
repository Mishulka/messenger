import { Http } from './Http';
import { describe, it, expect } from '@jest/globals';

describe('Http', () => {
    it('should be created without errors', () => {
        const http = new Http('/test');
        expect(http).toBeInstanceOf(Http);
    });
});