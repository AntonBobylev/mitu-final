class Middleware
{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
    }

    run = (request, response, next) =>
    {
        const apiKey = request.headers['x-api-key'];

        if (!apiKey || apiKey !== this.apiKey) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        next();
    }
}

module.exports = Middleware;
