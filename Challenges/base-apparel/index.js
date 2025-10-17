function validateForm(event)
{
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const isEmailValid = emailInput.value.trim() !== ''
                         && emailInput.validity.valid;
  const feedback = document.getElementById("fb");                  

  if(isEmailValid)
  {
      const formData = new FormData(event.target);
      const response = fetch('https://formspree.io/f/xleqajoy',
        {
            method: 'POST', body: formData, 
            headers:{'Accept': 'application/json'}
        }
                                ).then( response => response.json()).then( data =>
                                    {
                                        console.log(data);
                                        if(data.ok)
                                        {
                                            ///alert('Email Successfully sent'); 
                                            const sucSpan = document.createElement('span');
                                            sucSpan.innerText = 'Email Successfully sent';
                                            feedback.appendChild(sucSpan);
                                        }      
                                    })
   
  }
  else
  {
   // alert('form invalid');
        if(isEmailValid !== true)
        {        
             
            const errSpan = document.createElement('span');
            errSpan.innerText = 'Please provide a valid email';
            feedback.appendChild(errSpan);

            const errIcn = document.getElementById('err_icn');  

            const errIcnSpan = document.createElement('span');
            errIcnSpan.innerHTML='<a id="err_icn" href="#info"><img src="images/icon-error.svg"></a>';
            errIcn.appendChild(errIcnSpan);
        }      

  }
}