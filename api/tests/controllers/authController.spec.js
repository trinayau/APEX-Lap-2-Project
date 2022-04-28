const dogsController = require('../../controllers/authController')
const Dog = require('../../models/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('auth controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getSignup', () => {
        test('it renders the signup page with a 200 status code', async () => {
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    describe('getSignup', () => {
        test('it fails to render the signup page with a 500 status code', async () => {
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    });

    describe('addUser', () => {
        test('it adds a user with a 201 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
    });

    describe('addUser', () => {
        test('it fails to add a user with a 422 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(422);
        })
    });

    describe('getLogin', () => {
        test('it renders the login page with a 200 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(201);
        })
    });

    describe('getLogin', () => {
        test('it fails to render the login page with a 500 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(500);
        })
    });

    describe('getLogout', () => {
        test('it logs the user out by changing jwt cookie with a 200 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(204);
        })
    });

    describe('getLogin', () => {
        test('it fails to log the user out by changing jwt cookie with a 200 status code', async () => {            
            expect(mockStatus).toHaveBeenCalledWith(406);
        })
    });
    
})