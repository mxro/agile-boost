import sessionId from './sessionId';

it('Generates new sessionid', () => {
    expect(sessionId().length).toBeGreaterThan(10);
});