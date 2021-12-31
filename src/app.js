import fastify from 'fastify'

import { jwtPlugin } from './plugins/jwt.js'
import { supabasePlugin } from './plugins/supabase.js'
import { indexRoutes } from './routes/index.js'
import { authRoutes } from './routes/auth.js'
import { articlesRoutes } from './routes/articles.js'
import { commentsRoutes } from './routes/comments.js'

const { JWT_SECRET, SUPABASE_URL, SUPABASE_KEY } = process.env

/**
 * @param { import('fastify').FastifyServerOptions } options
 */
export function build(options = {}) {
  const app = fastify(options)

  app.register(jwtPlugin, { secretKey: JWT_SECRET })
  app.register(supabasePlugin, {
    supabaseUrl: SUPABASE_URL,
    supabaseKey: SUPABASE_KEY,
  })

  app.register(indexRoutes)
  app.register(authRoutes)
  app.register(commentsRoutes)
  app.register(articlesRoutes)

  return app
}
