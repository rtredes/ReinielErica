import tredes from '../tredes.js'
const {element} = tredes

export default function ({
    title = 'Alert', 
    message = 'This is an alert', 
    button = 'Okay',
    parent = document.body
  }){
    
  const fixedContainer = element('div', {
    'class': 'fixed-container',
    'append': parent
  })
  const container = element('div', {
    'class': 'alert-container',
    'append': fixedContainer
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
    const _button = element('p', {
      'class': 'alert-button',
      'event': {
        'click': () => {
          resolve()
          fixedContainer.remove()
        }
      },
      'innerText': button,
      'append': container
    })
  })
  
}
