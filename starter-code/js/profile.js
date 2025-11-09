
function profileContent() {
    const profileHTML = 

        `
    <div class="profile-details-component">

        <div class="profile-head">
          <h1 class="profile-header">Profile Details</h1>
          <p>Add your details to create a personal touch to your profile.</p>
        </div>

        <div class="upload-component">

          <div class="upload-top">

            
            <div class="profile-text">
              <p>Profile picture</p>
            </div>
          
            <label for="file-upload" class ="upload">
             <img src="../assets/images/icon-upload-image.svg" alt="" id='icon-display' class="file-img-icon">
                <p id='icon-display'>+ Upload Image</p>

              <button class="close-icon">x</button>
            </label>

            <input class = 'upload-profile' id="file-upload" type = 'file' accept = "image/*"> 
          
            <div class="image-req">
              <p>Image must be below 1024x1024px. Use PNG or JPG format. </p>
            </div>
          </div>
          

          <div class="upload-bottom">

            <form action="" method = 'get' class="profile-form">

              <div class="input">
                <label for="first">First name*</label>
                <input class="input-field first-name profile-required" name="firstName" type="text" placeholder="e.g. John"
                 id="first" minLength = '2' maxLength = '25' required>
                
              </div>

              <div class="input">
                <label for="last">Last name*</label>
                <input class="input-field last-name profile-required" name = 'lastName' type="text"
                placeholder="e.g. Appleseed" minLength = '2' maxLength = '25' id="last" required>
                
              </div>

              <div class="input email">
                <label for="forEmail">Email</label>
                <input class="input-field email" name="email" type="email" placeholder="e.g. email@example.com"
                id="forEmail"  autocomplete="on">
                
              </div>
              

            </form>

          </div>
          
            <div class="bottom">
              <hr class="line">
              <button disabled class="btn save-btn save-btn-profile">save</button>
            </div>
        </div>
      
      </div>  
    
        `
    
    return profileHTML
}




export default function initProfileContent() {
  initProfileContent.called = true
  let storedImg 
  
  // drop event to fire, element must also cancel the dragover event
  window.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  window.addEventListener("drop", (e) => {
    e.preventDefault();
  });


  document.querySelector('.form').insertAdjacentHTML('beforeend', profileContent())  
  
  const closeIcon = document.querySelector('.close-icon')

  if (initProfileContent.called) {
    
    const uploadedImg = document.querySelector('.uploaded-img')
    const profileFile = document.querySelector('.upload-profile')
    const upload = document.querySelector('.upload')
    const uploadIcons = document.querySelectorAll('#icon-display')
    const profileBtn = document.querySelector('.save-btn-profile')
    
    //Profile data that will get stored in local storage
    const PROFILEDATA = [{
      
    }]
    
    //FileReader object created for storing images into local storage
    
   

    //Get file when user drops it within the upload area
    // const wrapped = (e) => dropHandler(upload,e,uploadedImg)
    upload.addEventListener('drop',displayDraggedFile)
    
    profileFile.addEventListener('change', displayFile) 
  
    function displayFile() {
      
     
     
      const file = profileFile.files[0] 
      

      const reader = new FileReader()
       
      if (file) {
        
        //event listener for file reader
        reader.addEventListener('load', function () {
          console.log('reader', reader.result)
          //assigns blobUrl to profileImg and sets profile data to localStorage
           localStorage.setItem("image", reader.result);
          
          

        },false)
       
        reader.readAsDataURL(file)



        //stored image that users uploads
        

        storedImg = URL.createObjectURL(file)

       console.log('StoredImg', storedImg)

       
  
        

       
      
        uploadedImg.setAttribute('src', URL.createObjectURL(file))
        /*Add and style background img uploaded to upload area*/

        upload.style.backgroundImage = `url(${URL.createObjectURL(file)})`
        upload.style.backgroundPosition = "center";
        upload.style.backgroundSize = "cover";
        upload.style.backgroundRepeat = "no-repeat";
        /*border to profile*/
        uploadedImg.style.border = '5px solid #643dff'
        

        //styling to upload label when user uploads image
        hideElm(uploadIcons)
        closeIcon.style.display = 'block'
        
      
        closeIcon.addEventListener('click', () => {
          //stored image gets removed
          storedImg = URL.revokeObjectURL(storedImg)
          console.log(storedImg)


          upload.style.backgroundImage = `url('')`
          closeIcon.style.display = 'none'
            displayElm(uploadIcons)
        })
        


       
       
      } 
    }

    function displayDraggedFile(e) {
      e.preventDefault()
      const file =  e.dataTransfer.files[0]
    
      if (file) {
        storedImg = URL.createObjectURL(file)
        console.log("storedImg" ,storedImg)

        
        //assigns blobUrl to profileImg and sets profile data to localStorage
        // PROFILEDATA[0].blobUrl = storedImg

        // localStorage.setItem('profileDetails',JSON.stringify(PROFILEDATA))

        uploadedImg.setAttribute('src', URL.createObjectURL(file))
        /*Add and style background img uploaded to upload area*/
        
        
        upload.style.backgroundImage = `url(${URL.createObjectURL(file)})`
        upload.style.backgroundPosition = "center";
        upload.style.backgroundSize = "cover";
        upload.style.backgroundRepeat = "no-repeat";
        /*border to profile*/
        uploadedImg.style.border = '5px solid #643dff'
        

        //styling to upload label when user uploads image
        hideElm(uploadIcons)
        closeIcon.style.display = 'block'
        
      
        closeIcon.addEventListener('click', () => {
          //stored image gets removed
          storedImg = URL.revokeObjectURL(storedImg)
          console.log(storedImg)


          upload.style.backgroundImage = `url('')`
          closeIcon.style.display = 'none'
            displayElm(uploadIcons)
           })
      } 
     
      
    }
    
    profileBtn.addEventListener('click', (e) => displayProfileData(storedImg,PROFILEDATA) )

    profileFormValidity(profileBtn)
  }
}

export function hideElm(eachIcon) {

  const [a,b] = eachIcon
  
  a.style.display = 'none'
  b.style.display = 'none'
}

function displayElm(eachIcon) {
  const [a, b] = eachIcon
  
  a.style.display = 'block'
  b.style.display = 'block'
}


function profileFormValidity(profileBtn) {
  const allInputFields = document.querySelectorAll('.profile-required')
  const firstName = document.querySelector('.first-name')
  const lastName  = document.querySelector('.last-name')
  
  
  allInputFields.forEach((inputElm, index) => {
    inputElm.addEventListener('input', () => {

      if (firstName.checkValidity() && lastName.checkValidity()) {
        profileBtn.removeAttribute('disabled')
      } else {
        profileBtn.disabled = true
        
      }
        
    })
    

  
 
  })

}

function displayProfileData(storedImg,PROFILEDATA) {
  
  //displays uploaded image if it hasn't been displayed already
  storedImg ? document.querySelector('.uploaded-img').src =
  storedImg : document.querySelector('.uploaded-img').src = localStorage.getItem('image')
  //get all input field data and add display it
  const getFormData = new FormData(document.querySelector('.profile-form'))
  const profileEmail = document.querySelector(".input-field.email")

  if (getFormData.get('email') === '' || getFormData.get('email').length === 0
  || profileEmail.checkValidity() === true) {
    
    profileEmail.setCustomValidity("")

    for (const [key, value] of getFormData.entries()) {

      document.querySelector(`#${key}`).textContent = value 

      //adds  profile input text to PROFILEDATA
      PROFILEDATA[0][key] = value
      
      console.log(key,value)

    }
    //sets profileDetails to store profile text details to local storage
    localStorage.setItem('profileDetails',JSON.stringify(PROFILEDATA))
    console.log(PROFILEDATA)
  } else {
    profileEmail.setCustomValidity("Please enter a valid email address");
    
  }


  
    
  //show validation message
  profileEmail.reportValidity()
}


export function displayProfileLocalStorage() {
  if (localStorage.getItem('profileDetails')) {
    const storedProfile = JSON.parse(localStorage.getItem("profileDetails"))[0]
    for (const [key, value] of Object.entries(storedProfile)) {
      document.querySelector(`#${key}`).textContent = value
    }


   
    
  }

  
  
  
  


}