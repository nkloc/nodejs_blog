export async function articlesRoutes(app) {
  
  app.get('/articles',  async (request, reply) => {
    const { supabase } = app
      const { data, error } = await supabase
        .from('articles')
        .select()
      
      if (error) {
        return reply.code(500).send(error)
      }

      return reply.send({ articles: data })
  })

  app.get('/articles/:id', async (request, reply) => {
    const { supabase } = app
    const { id } = request.params
    const { data, error } = await supabase
    .from('articles')
    .select()
    
    if (error) {
      return reply.code(500).send(error)
    }

    return reply.send({ article: data.find(article => article.id === id) })
  })

  app.post(
    '/articles/new',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
          },
          required: ['content', 'title'],
          additionalProperties: false,
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: [app.authenticate],
    },
    async (req, reply) => {
      const { body } = req
      const { supabase } = app
      const found = await supabase
        .from('articles')
        .select('id')
        .eq('title', body.title)
        .single()

      if (found.data) {
        return reply.code(400).send(new Error('Article already exists'))
      }

      const { error } = await supabase
        .from('articles')
        .insert({
          user_id: req.user.id,
          title: body.title,
          content: body.content,
        })
        .single()

      if (error) {
        return reply.code(500).send(new Error(error.message))
      }

      return reply.send({ message: 'Article created' })
    },
  )

  app.delete(
    '/articles/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
          additionalProperties: false,
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: [app.authenticate],
    },
    async (req, reply) => {
      const { id } = req.params
      const { supabase } = app

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)
        .single()

      if (error) {
        return reply.code(500).send(new Error(error.message))
      }

      return reply.send({ message: 'Article deleted' })
    }
  )
}