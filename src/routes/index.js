/**
 * @type { import('fastify').FastifyPluginCallback }
 */
 export async function indexRoutes(app) {
    app.get(
      '/',
      {
        schema: {
          response: {
            200: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
      (req, reply) => {
        reply.send({ message: 'Server is running' })
      },
    )

    app.get(
      '/me',
      {
        schema: {
          response: {
            200: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                },
                data: {
                  type: 'object',
                  properties: { id: { type: 'string' } },
                  required: ['id'],
                  additionalProperties: false,
                },
              },
              required: ['success', 'data'],
              additionalProperties: false,
            },
          },
        },
        preValidation: [app.authenticate],
      },
      async (req, reply) => {
        return reply.send({ success: true, data: req.user })
      },
    )
  }
  