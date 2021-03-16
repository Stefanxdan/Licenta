# Licenta
House Price Prediction web application 
  - date de pe alte site uri + harta
	- pt harta: airbnb.com rent.com booking.com
	
### House price prediction:
	- account
		-login/register
		-pagina gestionare cont
		-pagina de favorite pentru postari
		-pagina gestionare postarile mele
	-postari
		-pagina postari
		-pagina postare
		-harta
	-ML
		-pagina price prediction
		-set de date: crawler pe api everyday
		-comparare pret postare cu predictia
		-harta zone de pret -> pt un apartament hardcodat comparat pretul in mai multe zone

### Servicii:
	-> UserController
		-> GetAllUsers
		-> GetUser{id}
		-> Post Create/RegisterUser
		-> Post Login
		-> Put UpdateUser
		-> DeleteUser
		-> Get favorite_post
	-> PostController
		-> GetAllPosts
		-> GetPost{}
		-> Post Create
		-> Put UpdatePost{id}
		-> DeletePost{id}
	-> PricePredictionController
		->
### Baza de date:
	-> Users: id, username, password, name, email, telefon, fav_post_id[]
	-> Favorite_posts: id, id_user, id_post
	-> Posts: id, isLocal, id_user, price, surface, bedrooms, bathroom, type, condition, partitioning, year, floor
	-> Posts_imgs: id, id_post, path
