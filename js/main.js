(function($) {

	
carModels = {'Volkswagen':["GTI", "Bug", "Tiguan"], 'Audi':["S Class", "A Class", "RS Class"]}

$('#make-selector').on('change', function(element) {
  
  $('#model-selector').empty()
  chosenMake = this.value;
  
  
  for (makeIndex in carModels[chosenMake]) {
      
      model = carModels[chosenMake][makeIndex];
      model_option = '<option>{0} {2}<option>'.replace('{0}', chosenMake).replace('{1}', makeIndex + 1).replace('{2}', model);
      
      $('#model-selector').append(model_option)
  }
})

engineModels = {'GTI': ["1.8 T","2.0 T","3.0"], 'Bug':["1.5 T", "1.8 T", "3.0"]}

$('#model-selector').on('change', function(element) {
	$('#engine-selector').empty()
	chosenModel = this.value;

	for (modelIndex in engineModels[chosenModel]){

		engine = engineModels[chosenModel][modelIndex];
		engine_option ='<option>{0} {2}<option>'.replace('{0}', chosenModel).replace('{1}',modelIndex + 1).replace('{2}', engine);

		$('#engine-selector').append(engine_option)
	}
})



	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				
				/* submit via ajax */
					
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
				      type: "POST",
				      url: "php/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeIn();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	setTimeout(function(){
				               $('#form-message-success').fadeOut();   
		               	}, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		               	setTimeout(function(){
		               		$( '#contactForm' ).each(function(){
											    this.reset();
											});
		               	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
