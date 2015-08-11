( function( $ ) {
	
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	htmlbody = $('html,body');
	var duration = 500;
	  
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      adjustWindow();
		      initHomepageNav();
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		var s = skrollr.init({
		    forceHeight: false,
		    render: function(data) {
		    }
		});
		
	    winH = $window.height();
	    
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    s.refresh($('.homeSlide'));
	}

	function initHomepageNav(){
		
		var homeSlides = $('.homeSlide');
		var $slideContent = $('.hsContainer');
		var slidesCount = $(homeSlides).length;
		var activeSlide = 1;
		
		$('<div/>', {
		    'id' : 'slideNav'
		}).append($('<ul><li class="slideNavPrev"><a class="disabled" href="#" title="Go to previous slide"><span class="ico ico-up">↑</span></a></li><li><span id="activeSlide">'+activeSlide+'</span>/<span id="maxSlides">'+slidesCount+'</span></li><li class="slideNavNext"><a href="#" title="Go to next slide"><span class="ico ico-down">↓</span></a></li></ul>')).appendTo('body').delay(1200).fadeIn(duration);
		
		var $activeSlide = $('#activeSlide');
		var $maxSlides = $('#maxSlides');
		var $numberOfSlides = parseInt($maxSlides.text());
		var slideNavPrev = $('');
		var $slideNavNext = $('.slideNavNext');
		var $slideNavPrev = $('.slideNavPrev');	
		var $slideNavNextA = $('.slideNavNext a');
		var $slideNavPrevA = $('.slideNavPrev a');	
		
		homeSlides.waypoint(function(direction) {
		  if (direction === 'down') {
		    var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, { offset: '50%' });
		
		homeSlides.waypoint(function(direction) {
		  if (direction === 'up') {
			var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, {
		  offset: function() {
		    return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
		  }
		});
		
		function showHideNavItems(){
			var $activeSlideNumber = parseInt($activeSlide.text());
			
			if($activeSlideNumber == 1){
			
				$slideNavNextA.removeAttr('class');
				$slideNavPrev.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else if ($activeSlideNumber == $numberOfSlides) {
			
				$slideNavPrevA.removeAttr('class');
				$slideNavNext.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else {
			
				$slideNavNext.add($slideNavPrev).animate({opacity: 1});
				$slideNavNextA.add($slideNavPrevA).removeAttr('class');
				
			}
		}	
		
		$slideNavNext.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index++;
		    if(index <= $numberOfSlides){
		   		scrollToSlide(index);
		    }
		});
		
		$slideNavPrev.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index--;
		    if(index > 0){
		        scrollToSlide(index);
		    }
		});
	    
	    
		function scrollToSlide(slideId){
			
		    var customSlideOffset = $("#slide-"+slideId).attr('data-content-offset');
		   
		    if(typeof customSlideOffset === 'undefined'){
		        
		        htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top) + 'px'},'slow');
		        
		    } else {
		     
			       if(customSlideOffset.indexOf('p')!=-1) {
			       
			       var customSlideOffset = parseInt(customSlideOffset.split('p')[0]);
				   var slideHeight = $slide.height();
				   
				   customSlideOffset = Math.ceil((slideHeight/100) * customSlideOffset);
				   
				   htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        } else {
			       
			       var customSlideOffset = parseInt(customSlideOffset);
			       
			       htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        }
		    
		    }
		}
	    
	}
		
} )( jQuery );