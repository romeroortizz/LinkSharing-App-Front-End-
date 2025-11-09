


//link form that appears when user clicks add new link
function linkContent() {
    
    const formHTML = `
    <div class="links-form-container">
        <div class="add-links">
          <h1 class="form-header">Customize your links</h1>
          <p>Add/edit/remove links below and then share
            all your profiles with the world!</p>
      
          <button class="btn add-link-btn">+ Add new link</button>
        </div>
      
      
        <div class="get-started">
          <div class="get-started-content">
            <img src="../assets/images/illustration-empty.svg" alt="">
            <h3 class="get-started-header">Let's get you started</h3>
            <p>Use the "Add new link" button to get started. Once you have more
              than one link, you can reorder and edit them. We're here to
              help you share your profiles with everyone!
            </p>
          
      
         
          </div>
        </div>

        <div class = "link-wrapper-container">

        </div>
        <div class="bottom">
              <hr class="line">
              <button class="btn save-btn save-btn-links" disabled>save</button>
            </div>
      </div>
    `

    return formHTML
}





export default function initLinkContent() {
  initLinkContent.called = true
  document.querySelector('.form').innerHTML += linkContent()

   
}



export function linkComponentContent(linkName, linkIcon,link,styles) {
   
  return `
    <a target = "_blank" href = "${link}"  class="link-component display"  style = "background:${styles[0]}; color: ${styles[1]}">
      <div class="link-info display">
        <div class="link-logo display">
          ${linkIcon}
        </div>
        <div class="link-name display">${linkName}</div>
      </div>

      <div class="arrow-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path fill="white" d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
        </svg>
      </div>
    </a>
  `
 
}