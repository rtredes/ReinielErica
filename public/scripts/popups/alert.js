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
    'class': 'alert-container gradient-border border-animated',
    'append': elementContainer
  })
  const _title = element('h3', {
    'class': 'alert-title',
    'innerText': title,
    'append': container
  })
  const _message = element('p', {
    'class': 'alert-message',
    'innerText': message,
    'append': container
  })
  
  return new Promise(resolve => {
    const _button = element('button', {
      'class': 'alert-button gradient-border',
      'event': {
        'click': () => {
          resolve()
          elementContainer.remove()
        }
      },
      'innerText': button,
      'append': container
    })
  })
  
}
