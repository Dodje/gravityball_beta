
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
			let mainVector = new Vector(vector.getX(), vector.getY() + 200); // вектор для более точного вычисления угла
			let coef = currentVector.findAngle(mainVector);
			

			let x = currentVector.getX();
			let y = currentVector.getY();
			const dY = 10; // ускорение свободного падения
			const gObj = 20; // ускорение заданное магнитом
			
		

			let moveInterval = setInterval( () => {
				y = Math.ceil(y + dY - gObj * coef);
				x = Math.ceil(x - gObj * Math.sqrt(1 - coef*coef));
				if(y < vector.getY()) {
					if(coef < 1) {
						y = vector.getY();
						x = vector.getX(); //
					}
				}
				currentVector.setVector(x, y);
				coef = currentVector.findAngle(mainVector);
				// console.log(`x: ${x}, y: ${y}`);
				// console.log(currentVector);

				// console.log('COEF' + coef);
				


				
				stlite.style.left = currentVector.getX() + 'px';
				stlite.style.top = currentVector.getY() + 'px';
				
				
				if(y === vector.getY()) {
					if(coef >= 1) {				
						clearInterval(moveInterval);
					}
				}
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
			console.log(vector.getY());
			
			moveBack(stlite, vector);
			document.onmousemove = null;
			stlite.onmouseup = null;
		};
	};

	stlite.ondragstart = function() {
		return false;
	};



	
});
