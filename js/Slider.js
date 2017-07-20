function Slider (elementId){
	var element = document.getElementById(elementId);
  var prevButton = document.getElementById('prevButton');
  var nextButton = document.getElementById('nextButton');
  
  var firstPointer = document.getElementById('first-pointer');
  var secondPointer = document.getElementById('second-pointer');
  var thirdPointer = document.getElementById('third-pointer');
  var fourthPointer = document.getElementById('fourth-pointer');


  var that = this;
	this.marginLeft = 0;
  this.currentMargin;
  
  this.intervalId;

  this.totalSliderImageWidth = 0;

  // Calculate the Total width of the all slider images
  (this.calculate = function (){
    for(var i = 0; i < element.childElementCount; i++){
      that.totalSliderImageWidth += element.children[i].naturalWidth;
    }
  }());


  this.addEvents = function (){
    element.addEventListener('pointerenter', this.stop);
    element.addEventListener('pointerleave', this.slide);
    prevButton.addEventListener('click', this.previous);
    nextButton.addEventListener('click', this.next);
    
    firstPointer.addEventListener('click', function(){
      that.position(0);
    });
    secondPointer.addEventListener('click', function(){
      that.position(1);
    });
    thirdPointer.addEventListener('click', function(){
      that.position(2);
    });
    fourthPointer.addEventListener('click', function(){
      that.position(3);
    });
  };

	this.slide = function (){
		that.intervalId = setInterval(function(){
			element.style.marginLeft = that.marginLeft+'px';
			that.marginLeft -= 5;

      // Set Margin Left to 0 for the last image
      if(-that.marginLeft >= that.totalSliderImageWidth){
        that.marginLeft = 0;
      }

      that.currentMargin = that.marginLeft;
		}, 1000 / 60);
	};	

  this.stop = function (){
    clearInterval(that.intervalId);
  };

  this.previous = function (){
    that.marginLeft += element.firstElementChild.naturalWidth;
  };

  this.next = function (){
    that.marginLeft -= element.firstElementChild.naturalWidth;
  };

  this.position = function (position){
    that.marginLeft = -(position)*element.firstElementChild.naturalWidth;
  };

	this.init = function (){
    this.addEvents();
		this.slide();
	};
}

var slider = new Slider('slider');
slider.init();


