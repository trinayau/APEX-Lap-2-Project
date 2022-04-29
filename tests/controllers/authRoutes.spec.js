describe('auth endpoints', () => {
    let api;
    // beforeEach(async () => {
    //     console.log("KEKW")
    // });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(done => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    it('should render the signup page', async () => {
        const res = await request(api).get('/signup');
        expect(res.statusCode).toEqual(200);
    })
    
    it('should render the login page', async () => {
        const res = await request(api).get('/login');
        expect(res.statusCode).toEqual(200);
    })
})