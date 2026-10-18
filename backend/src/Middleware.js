class Middleware
{
    apiKeyNameInHeaders = 'x-api-key';

    constructor(apiKey)
    {
        this.apiKey = apiKey;
    }

    run = (request, response, next) => {
        const apiKey = request.headers[this.apiKeyNameInHeaders];

        if (!apiKey || apiKey !== this.apiKey) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        next();
    }
}

module.exports = Middleware;
