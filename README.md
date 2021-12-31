Ce projet de blog a été réalisé par Nicolas KLOC, Edouard GRANDJEAN et Sonia RENARD.<br><br>

Il contient des users, des articles ainsi que des commentaires.<br><br>


Pour créer un compte :  <br>
POST /signup <br>
JSON: email (string) + password (string) + name (string)<br><br>

Pour se connecter (obtenir un token) :<br>
POST /signup <br>
JSON: email (string) + password (string) <br>
**-->Récupérer le token** <br><br>

Pour vérifier que l'on existe dans la BDD (Restreint aux utilisateurs connectés):  <br>
GET /me <br>
Headers: (authorization: token) <br> <br>


Pour voir les articles : <br>
GET /articles <br> <br>

Pour voir un article : <br>
GET /articles/:id <br>
JSON: id (UUID) <br>

Pour créer un article :  <br>
POST /articles/new <br>
JSON : Title (string) + Content (string) <br> <br>

Pour delete un article:  <br>
DELETE /articles/:id <br>
JSON: id (UUID) <br> <br>



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

 <br>  <br>

Les routes new et delete sont restreintes aux users connectés.
