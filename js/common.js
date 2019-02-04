
$(function() {

	function getCoords(elem) { // кроме IE8-
		var box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

	class Vector {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		setVector(x, y) {
			this.x = x; 
			this.y = y;
		}

		getX(){
			return this.x;
		}
		getY(){
			return this.y;
		}

		findAngle(otherVector) {
			let numerator = this.x * otherVector.x + this.y * otherVector.y;
			let denominator = Math.sqrt(this.x * this.x + this.y * this.y) * Math.sqrt(otherVector.x * otherVector.x + otherVector.y * otherVector.y);
			let cosT = numerator / denominator;

			if(cosT < 0) {
				return 0;
			} 
			else if (cosT > 1) {
				return 1;
			}
			return cosT.toFixed(2);
		}
	}





	const stlite = document.querySelector('.sattelite');

	stlite.onmousedown =  function(e){
				
		let startCoords = getCoords(stlite);
		let vector = new Vector(
			startCoords.left,
			startCoords.top
		);

		// console.log(vector);
		

		function moveBack(stlite, vector) {
			let currentCoords = getCoords(stlite);
			let currentVector = new Vector(
				currentCoords.left,
				currentCoords.top,
			);
			vector.setVector(vector.getX(), vector.getY() + 200);
			let coef = currentVector.findAngle(vector);
			

			let x = currentVector.getX();
			let y = currentVector.getY();
			const dY = 9; // ускорение свободного падения
			const gObj = 15; // ускорение заданноее магнитом
			
		

			let moveInterval = setInterval( () => {
				y = Math.ceil(y + dY - gObj * coef);
				x = Math.ceil(x - gObj * Math.sqrt(1 - coef*coef));
				currentVector.setVector(x, y);
				coef = currentVector.findAngle(vector);
				// console.log(`x: ${x}, y: ${y}`);
				// console.log(currentVector);

				console.log('COEF' + coef);
				

				
				stlite.style.left = currentVector.getX() + 'px';
				stlite.style.top = currentVector.getY() + 'px';
				
				
				if(false) {clearInterval(moveInterval);}
			}, 30);
			
			
		}


		function moveAt(e){
		
			stlite.style.left = e.pageX - stlite.offsetWidth / 2 + 'px';
			stlite.style.top = e.pageY - stlite.offsetHeight / 2 + 'px';


		}

		document.onmousemove = function(e) {
			moveAt(e);
		};
		
		stlite.onmouseup = function() {
			moveBack(stlite, vector);
			document.onmousemove = null;
			stlite.onmouseup = null;
		};
	};

	stlite.ondragstart = function() {
		return false;
	};




	// const app = document.querySelector('#app');



	// class Element {
	// 	constructor(){

	// 	}

	// 	createElement(name = 'div', classOfElement){
				
	// 		let element = document.createElement(name);
	// 		if(classOfElement !== undefined && classOfElement !== ''){

	// 			if(Array.isArray(classOfElement)) {
	// 				classOfElement.forEach(eachClass => {
	// 					console.log(eachClass);
	// 					element.classList.add(eachClass);
						
						
	// 				});
	// 			} else{
	// 				element.classList.add(classOfElement);
	// 			}

			
	// 		}
	// 		return element;
	// 	}
		
	// }

	// class Post {
	// 	constructor(user, post) {
	// 		this.user = user;
	// 		this.post = post;
	// 		this.showComments = false;

	// 		this.wrapper = element.createElement('div', 'post');
	// 		this.title = element.createElement('h1');
	// 		this.author = element.createElement('div', 'post__author');
	// 		this.body = element.createElement('p');
	// 		this.btnComments = element.createElement('a');
	// 		this.comments = element.createElement('div', ['post__comments', 'hidden']);

	// 	}
	// 	renderPost(){
	// 		this.author.innerHTML = `<span>Author: </span> ${this.user.name}  <span>Email: </span> ${this.user.email}`;
	// 		this.title.innerText = this.post.title;
	// 		this.body.innerHTML = this.post.body;
	// 		this.btnComments.innerText = 'Показать комментарии';
	// 		this.wrapper.append(this.title, this.author, this.body, this.btnComments, this.comments);
		
	// 		app.appendChild(this.wrapper);
	// 	}

	// 	switchComments(){
	// 		this.showComments = !this.showComments;
	// 		if(this.showComments === true){
	// 			this.comments.classList.remove('hidden');
	// 		}
	// 	}

	// 	getComments(){
	// 		return this.comments;
	// 	}
	// }

	// class Comment {

	// 	constructor(place, comments){
	// 		this.place = place;
	// 		this.comments = comments;
	// 	}

	// 	createCommentComponent(comment){
	// 		this.wrapper = element.createElement('div', 'post__comment');
	// 		this.name = element.createElement('span');
	// 		this.body = element.createElement('p');

		
	// 		this.name.innerText = `Name: ${comment.name}`;
	// 		this.body.innerText = comment.body;
		
	// 		this.wrapper.append(this.name, this.body);
		
	// 		return this.wrapper;
		
	// 	}
	
		
	// 	renderComments(){
	// 		let commentsDiv = document.createElement('div'); 
	// 		for(let comment of this.comments){
	// 			commentsDiv.appendChild(this.createCommentComponent(comment));
	// 		}
		
	// 		this.place.appendChild(commentsDiv);
			
	// 	}
	// }


	// let element = new Element();

	// const btnShowPost = element.createElement('button', 'button-post');
	// btnShowPost.innerText = 'Показать пост';
	// app.appendChild(btnShowPost);



	
	// class DataService {
	
	// 	constructor(url){
	// 		this.url = url;
	// 	}
	
	// 	async getUser(id){

	// 		try {
	// 			let respone = await fetch(`${this.url}/users/${id}`);
	// 			let data = await respone.json();
				
	// 			return data;
	// 		} catch(error){
	// 			throw new Error('Не удалось получить данные пользователя.');
	// 		}
	// 	}
	// 	async getPosts(userId){
	// 		try {
	// 			let respone = await fetch(`${this.url}/posts?userId=${userId}`);
	// 			let data = await respone.json();  
	// 			return data;
	// 		} catch(error){
	// 			throw new Error('Не удалось получить посты.');
	// 		}
	// 	}
	// 	async getComments(postId){
	// 		try {
	// 			let respone = await fetch(`${this.url}/comments?postId=${postId}`);
	// 			let data = await respone.json();  
	// 			return data;
	// 		} catch(error){
	// 			throw new Error('Не удалось получить комментарии.');
	// 		}
	// 	}
	// };
	
	// btnShowPost.addEventListener('click', async() => {

	// 	let dataService = new DataService('https://jsonplaceholder.typicode.com');
	
	// 	try {
	// 		let user = await dataService.getUser(1);
	// 		let posts = await dataService.getPosts(user.id);
	// 		let comments = await dataService.getComments(posts[0].id);
			
	// 		console.log(user);
	// 		console.log(posts[0]);
	// 		console.log(comments);
	
	// 		let post = new Post(user, posts[0]);
	// 		post.renderPost();

	// 		let commentsPlace = post.getComments();
	// 		let comment = new Comment(commentsPlace, comments);

	// 		post.btnComments.addEventListener('click', (e)=>{
	// 			e.preventDefault();
	// 			post.switchComments();
	// 			comment.renderComments();
	// 		});
	
			
			
	// 	} catch(error){
	// 		console.log(error);
	// 	}
	// });
	
});
