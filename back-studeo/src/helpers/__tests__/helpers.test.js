import { jest } from '@jest/globals';
import { hasOwnProperty, buildResponse } from '../index';
describe('helpers', () => {
    describe('hasOwnProperty', () => {
        it('should return true if object property exists', () => {
            const person = {
                firstName: 'Gael',
                lastName: 'Cadoret'
            };

            expect(hasOwnProperty(person, 'firstName')).toBe(true);
            expect(hasOwnProperty(person, 'lastName')).toBe(true);
        });

        it('should return false if object property doesn\'t exists', () => {
            const person = {
                firstName: 'Gael',
                lastName: 'Cadoret'
            };

            expect(hasOwnProperty(person, 'age')).toBe(false);

        });

        it('hasOwnProperty function should works even if prototype method has been overriden', () => {
            const person = {
                firstName: 'Gael',
                lastName: 'Cadoret',
                hasOwnProperty: () => "Hey dude, don't use prototype methods of an object! It's overridable!"
            };

            expect(hasOwnProperty(person, 'firstName')).toBe(true);
            expect(hasOwnProperty(person, 'age')).toBe(false);

        });
    });

    describe('buildResponse', () => {

        beforeEach(() => {
            Date.now = jest.fn(() => 1684702214556);
        })


        it('should return well formated success response', () => {
            const person = {
                firstName: 'Gael',
                lastName: 'Cadoret'
            };

            expect(buildResponse(true, person)).toEqual({
                success: true,
                data: person,
                timestamp: 1684702214556
            });

        });

        it('should return well formated error response', () => {
            const error = {
                message: 'Something wrong happened!',
            };

            expect(buildResponse(false, {}, error)).toEqual({
                success: false,
                error: error,
                timestamp: 1684702214556
            });

        });
    });
});