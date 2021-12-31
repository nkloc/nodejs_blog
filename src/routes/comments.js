export async function commentsRoutes(app) {
  
    app.get('/comments',  async (request, reply) => {
      const { supabase } = app
        const { data, error } = await supabase
          .from('comments')
          .select()
        
        if (error) {
          return reply.code(500).send(error)
        }
  
        return reply.send({ comments: data })
    })
    
    app.get('/comments/:id', async (request, reply) => {
      const { supabase } = app
      const { id } = request.params
      const { data, error } = await supabase
      .from('comments')
      .select()
      
      if (error) {
        return reply.code(500).send(error)
      }
  
      return reply.send({ comment: data.find(comment => comment.id === id) })
    })
  
    app.post(
      '/comments/new',
      {
        schema: {
          body: {
            type: 'object',
            properties: {
              content: { type: 'string' },
            },
            required: ['content'],
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
          .from('comments')
          .select('id')
          .eq('content', body.content)
          .single()
  
        if (found.data) {
          return reply.code(400).send(new Error('Comment already exists'))
        }
  
        const { error } = await supabase
          .from('comments')
          .insert({
            user_id: req.user.id,
            content: body.content,
          })
          .single()
  
        if (error) {
          return reply.code(500).send(new Error(error.message))
        }
  
        return reply.send({ message: 'Comment created' })
      },
    )
  
    app.delete(
      '/comments/:id',
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
          .from('comments')
          .delete()
          .eq('id', id)
          .single()
  
        if (error) {
          return reply.code(500).send(new Error(error.message))
        }
  
        return reply.send({ message: 'Comment deleted' })
      }
    )
  }