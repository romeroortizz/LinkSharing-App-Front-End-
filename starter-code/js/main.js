
import initLinkContent, { linkComponentContent } from "../js/links.js"
import getColor, { PLATFORM_STYLES } from "../js/colors.js"
import  initProfileContent,{displayProfileLocalStorage}  from "../js/profile.js"
import addForm from "../js/linkForm.js"

import  hideElm  from "../js/profile.js"
    

//Display localstorage from profile Details or links

const loadDoc = (function () {
    
    
    
  
    
        initLinkContent()
    
        toggleLinksManager()
        initForm()

        setUpDragToReorder()
  

        

   
    
})();
    
(function () {
    //create a function called localStorageDataInit that contains both functions below
    //if statements will determine how functions  below get called
    
    displayProfileLocalStorage()

    displayLinksLocalStorage()

    if (localStorage.getItem('image')) {
      const uploadedImg = document.querySelector('.uploaded-img')
      const profileFile = document.querySelector('.upload-profile')
      const upload = document.querySelector('.upload')
      const uploadIcons = document.querySelectorAll('#icon-display')
      const closeIcon = document.querySelector('.close-icon') 
      
        uploadedImg.src = localStorage.getItem('image')
        upload.style.backgroundImage = `url(${localStorage.getItem('image')})`
        upload.style.backgroundPosition = "center";
        upload.style.backgroundSize = "cover";
        upload.style.backgroundRepeat = "no-repeat"

        closeIcon.style.display = 'block'

        const [a,b] = uploadIcons
  
        a.style.display = 'none'
        b.style.display = 'none'
        
       
   
        
      
  }
   
    // const x = [1, 2, 3]
    
    // x.forEach(elm => {
    //     console.log(addForm().createForm())
    // })
    
    
})()




function toggleLinksManager() {
    // tab state
    let linkTab = (localStorage.getItem("linkTab")) ? localStorage.getItem("linkTab") : true
    
    
    // display either link or profile tab based on local storage
    if (localStorage.getItem('linkTab')) {
        if (localStorage.getItem("linkTab") === "true") {

            console.log('link tab automatically displayed')

        } else if (localStorage.getItem("linkTab") === "false") {

            document.querySelector('.links-form-container').style.display = 'none'
            initProfileContent()
            formDetailsLocalStorage ()
        }
        
        

    } else {
        localStorage.setItem('linkTab',linkTab)
    }

    //link tabs 
    const links = document.querySelector('.links');
    const profileDetails = document.querySelector('.profile-details-nav');

    profileDetails.addEventListener('click', () => {
        if (initProfileContent.called) {
            localStorage.setItem('linkTab', false)
            
            console.log(localStorage.getItem('profileDetails'))
            
            
            document.querySelector('.links-form-container').style.display = 'none'
            document.querySelector('.profile-details-component').style.display = 'flex'

            formDetailsLocalStorage ()
        } else {
            localStorage.setItem('linkTab',false)
            
            document.querySelector('.links-form-container').style.display = 'none'
            initProfileContent()

            formDetailsLocalStorage()
        }

        
    });

    links.addEventListener('click', () => {

        if (initLinkContent.called) {
            localStorage.setItem('linkTab',true)
            
            document.querySelector('.profile-details-component').style.display = 'none'
            document.querySelector('.links-form-container').style.display = 'flex'
            console.log('already called links')
           

           
         
        } else {
            localStorage.setItem('linkTab',true)
            
            
            document.querySelector('.profile-details-component').style.display = 'none'
            initLinkContent()
           
            
        }
        
        
    });
}

function initForm() {
    const linkDataCollection  = []
    const linkBtn = document.querySelector('.add-link-btn')
    const getStarted = document.querySelector('.get-started')
    const formManager = addForm()
    const linkSaveBtn = document.querySelector('.save-btn-links');

    linkSaveBtn.addEventListener('click',displayLinkData)

    linkBtn.addEventListener('click', () => {
       
       const linkFormCount = document.querySelectorAll('.link-wrapper').length;
        
        if (getFormCount() < 5) {
            
            getStarted.style.display = 'none'
            formManager.createForm()
           
        } 
        // Enable or disables save button based on if there is or is not a form to fill
        enableLinkBtn()
        
    })

    
    
    let parentEl = document.querySelector('.link-wrapper-container')

    // prevent form submisson on enter on every form inside parentEl

    parentEl.addEventListener('keypress',(e) => {
        if(e.key === 'Enter'){
        e.preventDefault()
        }
    })


    const mutationObserver = new MutationObserver(entries => {
        console.log(entries)
        for (let entry of entries) {
            if (entry.type !== 'childList') {
                continue
                
            }


            //checks to see if there is at least 1 link form 
            const hasElementsLeft = entry.target.childElementCount > 0;
            
            
            
            //added nodes
            entry.addedNodes.forEach(n => {
                console.log('added')
                resetFormOrder()
                
                
            })

            //removed nodes
            entry.removedNodes.forEach(n => {
                // const getNodeOrder = n.querySelector('.link-form').dataset.order
                // console.log(linkDataCollection)
                
                
                if (getFormCount() < 1 ) {
                    clearLinkComponents()
                    localStorage.removeItem("link-data")
                } 

                resetFormOrder()
                // enables or disables link save button
                
                displayLinkData()
                enableLinkBtn()
                
                
                
            })
        }
        
       })

    mutationObserver.observe(parentEl, { childList: true })

    function displayLinkData() {
        
        
        const linkForms = document.querySelectorAll('.link-form');
        const linkComponents = document.querySelector('.links-content').children
        const arrOfLinkFields = Array.from(document.querySelectorAll('.link-field'))
        const allValid = (currentValue) => currentValue.validity.valid
        let platform
        let link
        let icon
        let numOrder
        let textColor
        let bgColor

        //additional validationn: go through each form and check to see if valid
        
            console.log('adding links when valid')
             if (parentEl.hasChildNodes()) {

            // check to see if at least one field is not valid
            linkForms.forEach((elm, index) => {
                if (!elm.querySelector(".link-field").validity.valid) {
                    elm.querySelector('.error-link-message').textContent = 'Please enter valid link ';
                    return;
                }
            })
        
            //if all fields are valid then add links
            if (arrOfLinkFields.every(allValid)) {
                linkDataCollection.length = 0
                linkForms.forEach((elm, index) => {
                    icon = elm.querySelector('.select-icon').textContent.trim()
                    platform = elm.querySelector('#platforms-list').value
                    link = elm.querySelector('.link-field').value
                    numOrder = elm.dataset.order

                    linkDataCollection.push({ platform, link, numOrder, icon, styles: getColor(platform) })
                    console.log(linkDataCollection)

                    //store linkDataCollection into local storage as link-data
                    localStorage.setItem('link-data',JSON.stringify(linkDataCollection))

                })

                //reset all link components
                clearLinkComponents()

                /*iterate through each obj to find order number and use that order number
                to match and create a link component*/
                linkDataCollection.forEach((elm, index) => {
                    const getOrder = elm.numOrder

                    for (let eachLink of linkComponents) {

                        if (getOrder === eachLink.dataset.linkOrder) {

                            eachLink.innerHTML = linkComponentContent(elm.platform, elm.icon, elm.link, elm.styles)

                        }

                    }

                })
            }

            

            
        } else {
            console.log('has not children')
            return
        }
        
       



        
    
    }
}

  
function resetFormOrder() {
    let parentEl = document.querySelector('.link-wrapper-container')
    const allLinkWrappers =document.querySelectorAll('.link-wrapper')
    
    allLinkWrappers.forEach((elm,i) => {
     
        const linkTitle = elm.querySelector('.link-title')
        const linkForm = elm.querySelector('.link-form')
        linkTitle.innerHTML = `Link #${i + 1}`
        linkForm.dataset.order = `${i + 1}`
    })

    

}


function setUpDragToReorder() {
    let listContainer

    listContainer = document.querySelector('.link-wrapper-container')

    if (!listContainer) { return }
    
    if (listContainer) {
        Sortable.create(listContainer)
    }
    // listContainer.addEventListener('mousedown', dragStart)
    // document.addEventListener('mouseup',dragEnd)
}



// Drag and reorder involves 3 steps: click, drag and release click
// This is the code for the 3 steps of involved in dragging and reordering

function enableLinkBtn() {
    const linkSaveBtn = document.querySelector('.save-btn-links')
    if (document.querySelector('.link-wrapper-container').childElementCount >= 1) {
        return
    
    }
    if (document.querySelector('.link-wrapper-container').childElementCount < 1) {
        linkSaveBtn.disabled = true
    }

    
}

function getFormCount() {
    const linkFormCount = document.querySelectorAll('.link-wrapper').length;
    return linkFormCount
}

function clearLinkComponents() {
    const linkComponents = document.querySelector('.links-content').children

    
for (let eachLink of linkComponents) {
            eachLink.innerHTML = ``
        }
}
function displayLinksLocalStorage() {
    
   
    if (localStorage.getItem('link-data')) {

        document.querySelector('.get-started').style.display = 'none'

        const storedLinkData = JSON.parse(localStorage.getItem("link-data"))
        const linksContent = document.querySelector('.links-content').children

        
        storedLinkData.forEach((elm, index) => {
            //adds the number of forms from based on  how many elms there are in local storage
            
            console.log(elm)
            addForm(elm.platform,elm.link).createForm()
           
            for (let eachLink of linksContent) {
            if (elm.numOrder === eachLink.dataset.linkOrder) {
                console.log('matches')
                eachLink.innerHTML = linkComponentContent(elm.platform,elm.icon,elm.link,elm.styles)
            }
        }
        })
        
    } else {
        return
    }
    

}

function formDetailsLocalStorage() {
    const storedProfile = JSON.parse(localStorage.getItem("profileDetails"))[0]

    for (const [key, value] of Object.entries(storedProfile)) {
         
        if (key !== 'blobUrl') {
          document.querySelector(`input[name='${key}']`).value = value
      }
      
    }
    
}



