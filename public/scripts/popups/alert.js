import tredes from '../tredes.js'
const {element} = tredes

export default function ({
    title = 'Alert', 
    message = 'This is an alert', 
    button = 'Okay',
    containerClass = 'fixed-wrap',
    parent = document.body
  }){
    
  const elementContainer = element('div', {
    'class': containerClass,
    'append': parent
  })
  const container = element('div', {
    'class': 'popup-wrap alert-wrap gradient-border border-animated',
    'append': elementContainer
  })
  const _title = element('h3', {
    'class': 'title',
    'innerText': title,
    'append': container
  })
  const _message = element('p', {
    'class': 'message',
    'innerText': message,
    'append': container
  })
  
  return new Promise(resolve => {
    const _button = element('button', {
      'class': 'button gradient-border',
      'event': {
        'click': () => {
          
          elementContainer.classList.add('fadingOut')
          elementContainer.onanimationend = () => {
            elementContainer.remove()
            resolve()
          }
        }
      },
      'innerText': button,
      'append': container
    })
  })
  
}
