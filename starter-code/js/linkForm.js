  function linkForm(formCount,def) {
   
    
     const linkFormHTML =
    

        `
        <form action="" class="link-form" novalidate >
      <div class="link-form-content">
        
        <div class="link-title-container">

          <div class="link-title-content">

            <button class="link-title-btn" data-dragging="false">
              <img src="../assets/images/icon-drag-and-drop.svg" alt="">
            </button>

            <span class="link-title">Link #${formCount}</span>
          </div>

          <button class="link-remove-btn">Remove</button>
        </div>

        <div class="link-input-container">

          <div class="input-content platform">

            <label for="platforms-list">Platform</label>
            <select  id="platforms-list">

              <button>
                <selectedcontent></selectedcontent>
              </button>

              <!--list of options-->

              <option value="GitHub">
                <span class="select-icon" aria-hidden="true"> 🐙                
                </span>
                <span class="option-label" aria-label="GitHub">GitHub</span>
              </option>

               <option value="Facebook">
                <span class="select-icon" aria-hidden="true">📘</span>
                <span class="option-label"  aria-label="Facebook">Facebook</span>
              </option>

               <option value="Twitter">
                <span class="select-icon" aria-hidden="true">🐦</span>
                <span class="option-label" aria-label="Twitter">Twitter</span>
              </option>

               <option value="Frontend Mentor">
                <span class="select-icon" aria-hidden="true">🎓</span>
                <span class="option-label" aria-label="Frontend Mentor">Frontend Mentor</span>
              </option>

              <option value="LinkedIn">
                <span class="select-icon" aria-hidden="true">💼</span>
                <span class="option-label" aria-label="LinkedIn">LinkedIn</span>
              </option>

              <option value="YouTube">
                <span class="select-icon" aria-hidden="true">▶️</span>
                <span class="option-label" aria-label="YouTube">YouTube</span>
              </option>

              <option value="Twitch">
                <span class="select-icon" aria-hidden="true">🎮</span>
                <span class="option-label" aria-label="Twitch">Twitch</span>
              </option>

              <option value="Dev.to">
                <span class="select-icon" aria-hidden="true">🛠️</span>
                <span class="option-label" aria-label="Dev.to">Dev.to</span>
              </option>

              <option value="Codewars">
                <span class="select-icon" aria-hidden="true">⚔️</span>
                <span class="option-label" aria-label="Codewars">Codewars</span>
              </option>

              <option value="CodePen">
                <span class="select-icon" aria-hidden="true">🖊️</span>
                <span class="option-label" aria-label="CodePen">CodePen</span>
              </option>

              <option value="FreeCodeCamp">
                <span class="select-icon" aria-hidden="true">⛺</span>
                <span class="option-label" aria-label="FreeCodeCamp">FreeCodeCamp</span>
              </option>

              <option value="GitLab">
                <span class="select-icon" aria-hidden="true">🦊</span>
                <span class="option-label" aria-label="GitLab">GitLab</span>
              </option>

              <option value="Hashnode">
                <span class="select-icon" aria-hidden="true">#️⃣</span>
                <span class="option-label" aria-label="Hashnode">Hashnode</span>
              </option>

              <option value="Stack Overflow">
                <span class="select-icon" aria-hidden="true">📤</span>
                <span class="option-label" aria-label="Stack Overflow">Stack Overflow</span>
              </option>


            </select>
          </div>

          <div class="input-content link">

            <label for="url">Link</label>
            
            <input class="link-field" type="url" id="url" placeholder="e.g.https://GitHub/username" pattern=${def}   required>
            <span class="error-link-message" aria-live="polite"></span>
          </div>

          
        </div>

      </div>
    </form>`
    
    
    return linkFormHTML
}



export default function addForm(elmPlatform,elmLink) {
  const changeEvent = new Event("change", {bubbles: true})
  
  
  
  
  const linksFormContainer = document.querySelector('.link-wrapper-container')
 
    let formCount = 1 // as user adds a from, each form will be numbered
    let platformSelected 
    let defualtLinkValidation = `https?:\/\/(?:www\.)?github\.com(\/[^\s]*)?`
  
  
  function createForm() {
       
        const linkWrapper = document.createElement('div')
        linkWrapper.classList.add('link-wrapper')
       
      
        
       
        //insert linkWrapper inside links-form-container

        linkWrapper.innerHTML = linkForm(formCount++,defualtLinkValidation)
        linksFormContainer.appendChild(linkWrapper)

        // each linkWrapper has a default data-value
    
        linkWrapper.setAttribute('data-value', 'GitHub')
        //abiity to delete that instance
        const removeForm = linkWrapper.querySelector('.link-remove-btn')

         removeForm.addEventListener('click', (e) => {
           e.preventDefault()
           formCount--
           linkWrapper.remove()
           const linkFormCount = document.querySelectorAll('.link-wrapper').length;
           reDisplayModal(linkFormCount)
         })
       
       /*Use mutation oberser api to check if a form component is added or removed 
         within link wrapper container */
       
       //Dynamically changes placeholder based on selected platform
       linkWrapper.querySelector('#platforms-list').addEventListener("change", (e) => {
         
         linkWrapper.setAttribute('data-value',e.target.value )
         
         
         Object.assign(linkWrapper.querySelector('.link-field'), {
           placeholder: `e.g.https://${e.target.value}/username`,
           pattern: `https?:\\/\\/(?:[Ww]{3}\\.)?${(e.target.value)
           
            
    .toLowerCase()
    .replace(
      /[a-z]/g,
      (c) => `[${c}${c.toUpperCase()}]`
    )}\\.com(\\/[^\\s]*)?`
         })
         
        //  linkWrapper.querySelector('.link-field').
        //    setAttribute("placeholder", `e.g.https://${e.target.value}/username`)
         platformSelected = `Please enter a valid ${ e.target.value} URL`

         if (e.target.value !== linkWrapper.querySelector('#platforms-list').value) {
           console.log('no match')
         }
       

         linkErrorMsg.textContent = ''
       })

       //link validation for each form. If at least one is invalid then save button becomes disabled

       const linkField = linkWrapper.querySelector('.link-field')
       const linkErrorMsg = linkWrapper.querySelector('.error-link-message')
       const saveBtn = document.querySelector('.save-btn')
       
       //disables btn if newly created form field is invalid
       if (!linkField.validity.valid) {
         saveBtn.disabled = true
       }
       
       if (elmPlatform) {
         linkWrapper.querySelector('#platforms-list').dispatchEvent(changeEvent)
         linkWrapper.querySelector('#platforms-list').value = elmPlatform
         linkWrapper.querySelector('.link-field').value = elmLink

         
         linkWrapper.setAttribute('data-value', elmPlatform)
         
          Object.assign(linkWrapper.querySelector('.link-field'), {
           placeholder: `e.g.https://${elmPlatform}/username`,
           pattern: `https?:\\/\\/(?:[Ww]{3}\\.)?${(elmPlatform)
           
            
    .toLowerCase()
    .replace(
      /[a-z]/g,
      (c) => `[${c}${c.toUpperCase()}]`
    )}\\.com(\\/[^\\s]*)?`
         })
         
       }


       //logic that disabled button on input if form field is invalid
       linkField.addEventListener('input', (e) => {
         
         //wrap keyword into a valid link

         if (e) {
           if ((linkField.value).toLowerCase() === linkWrapper.getAttribute('data-value').toLowerCase()) {
             linkField.value = `https://www.${linkWrapper.getAttribute('data-value').toLowerCase()}.com/`
           } 
           
         }
        
         
         
         
         if (linkField.validity.valid ) {
           console.log('pattern match')
           saveBtn.disabled = false
           linkErrorMsg.textContent = ""
           return
         } else {
           // display an appropriate error message
           displayError(linkErrorMsg,saveBtn,platformSelected)
           // prevent future form submission
           e.preventDefault()
         }
       })
       
        
  }
  
   
 





    function reDisplayModal(linkFormCount) {
        const getStarted = document.querySelector('.get-started')
        if (linkFormCount <= 0) {
            getStarted.style.display = 'grid'
        }
           
    }

    return {createForm,reDisplayModal}


  
  function displayError(linkErrorMsg, saveBtn, platformName) {
    if (platformName === undefined) {
      saveBtn.disabled = true
      linkErrorMsg.textContent = 'Please enter a valid GitHub URL'
    }
    else {
      saveBtn.disabled = true
      linkErrorMsg.textContent = `${platformName}`
    }
    
    
  }
} 


