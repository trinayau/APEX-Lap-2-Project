
const authController = require('../../controllers/authController')
const User = require('../../models/User');


const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))

const mockCookie = jest.fn(c =>{});
const mockRes = { status: mockStatus, cookie: mockCookie}

describe('auth controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());


    describe('addUser', () => {
        test('it adds a user with a 201 status code', async () => {
            jest.spyOn(User, 'create')
                .mockResolvedValue({ username: 'username1', password: 'Password11', email: 'email@1.com' });
            await authController.addUser({body:{ username: 'username1', password: 'Password11', email: 'email@1.com' }},mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ user: 'username1'});

        })
    });

    describe('addUser', () => {

        test('it fails to add a user with a 422 status code', async () => {
            jest.spyOn(User, 'create')
            .mockResolvedValue({});
            await authController.addUser({body:{}},mockRes);
            expect(mockStatus).toHaveBeenCalledWith(422);
            //expect(mockJson).toHaveBeenCalledWith({ user: 'us'});
        })
    });

    describe('loginUser', () => {
        test('it logs the user in with a 200 status code', async () => {
            jest.spyOn(User, 'create')
                .mockResolvedValue({password: 'Password11', email: 'email@1.com' });
            await authController.addUser({body:{password: 'Password11', email: 'email@1.com' }},mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({ user: undefined});
        })
    });

    describe('loginUser', () => {
        test('it fails to logs the user in with a 422 status code', async () => {
            jest.spyOn(User, 'findByEmail')
                .mockResolvedValue(null, {});
            await authController.loginUser(mockRes);
            expect(mockStatus).toHaveBeenCalledWith(406);
            expect(mockJson).toHaveBeenCalledWith({});

        })
    });

    describe('getLogout', () => {

        test('it logs the user out by changing jwt cookie with a 200 status code', async () => {
            expect(mockStatus).toHaveBeenCalledWith(204);
            authController.getLogout(mockRes);
        })
    });

    describe('getLogout', () => {
        test('it fails to log the user out by changing jwt cookie with a 406 status code', async () => {
            expect(mockStatus).toHaveBeenCalledWith(406);
            authController.getLogout(mockRes);
        })
    });
})