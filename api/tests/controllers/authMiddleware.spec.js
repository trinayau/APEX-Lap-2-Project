const authMiddleware = require('../../middleware/authMiddleware')
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('auth controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

   
    describe('requireAuth', () => {
        //pass a fake req, res and next
        // 3 mocks to test
        // does the req contain a cookie?
            //if not then is error handled?
            //if yes then does it redirect as intended (mock redirect as well)
        const token = 'heheh'//correct token?
        test('check if there is a token', async () => {          
            expect(token).not.toBeNull();
        })
    });

    describe('requireAuth', () => {
        test('check if there is a token', async () => { 
            const token = 1//wrong token?
            expect(token).not.toBeNull();
        })
    });
    
    describe('checkUser', () => {
        test('check if there is a token', async () => { 
            const token = 1//correct token?
            expect(token).not.toBeNull();
        })
    });

    describe('checkUser', () => {
        test('check if there is a token', async () => { 
            const token = 1//wrong token?
            expect(token).not.toBeNull();
        })
    });

    
})