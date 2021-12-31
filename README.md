Ce projet de blog a été réalisé par Nicolas KLOC, Edouard GRANDJEAN et Sonia RENARD.

Il contient des users, des articles ainsi que des commentaires.


Pour créer un compte : 
POST /signup 
JSON: email (string) + password (string) + name (string)

Pour se connecter (obtenir un token) :
POST /signup
JSON: email (string) + password (string)
Récupérer le token

Pour vérifier que l'on existe dans la BDD: 
GET /me
Headers: (authorization: token)


Pour voir les articles :
GET /articles

Pour voir un article :
GET /articles/:id
JSON: id (UUID)

Pour créer un article : 
POST /articles/new
JSON : Title (string) + Content (string)

Pour delete un article: 
DELETE /articles/:id
JSON: id (UUID)



Pour voir les comments :
GET /comments

Pour voir un comment :
GET /comments/:id
JSON: id (UUID)

Pour créer un article : 
POST /comments/new
JSON : Content (string)

Pour delete un comment: 
DELETE /comments/:id
JSON: id (UUID)
