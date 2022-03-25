import {
  db,
  auth,
  months,
  timestamp
} from "../firebase.js"

import tredes from '../tredes.js'
import alert2 from '../popups/alert.js'
const element = tredes.element

export function budgetCollection(
  date = timestamp.now().toDate()
) {
  const uid = auth.currentUser.uid
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()
  const path = `users/${uid}/budget/${year}/months/${month}/records`

  return db.collection(path)
}


export class AddBudget {
  constructor() {
    this.fixedWrap = element('div', {
      'class': 'fixed-wrap',
      'append': document.body
    })

    this.wrap = element('div', {
      'class': 'popup-wrap',
      'append': this.fixedWrap
    })
    this.title = element('h3', {
      'class': 'popup-title',
      'innerText': 'Add Data',
      'append': this.wrap
    })
    this.form = element('form', {
      'class': 'popup-form',
      'event': {
        'submit': (e) => this.addToFirestore(e)
      },
      'append': this.wrap
    })

    this.typeWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-envelope'
      }),
      element('select', {
        'required': '',
        'options': [
          { 'text': 'Select One', 'value': '' },
          { 'text': 'Income', 'value': 'income' },
          { 'text': 'Outcome', 'value': 'outcome' },
          { 'text': 'Savings', 'value': 'savings' }
        ]
      }), this.form
    )

    this.categoryWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-key'
      }),
      element('select', {
        'required': '',
        'options': [
          { 'text': 'Select One', 'value': '' },
          { 'text': 'Commute', 'value': 'commute' },
          { 'text': 'Food', 'value': 'food' },
          { 'text': 'Essential', 'value': 'essential' },
          { 'text': 'Other', 'value': 'other' },
        ]
      }), this.form
    )

    this.valueWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-key'
      }),
      element('input', {
        'type': 'number',
        'min': '1',
        'required': '',
        'placeholder': 'Value'
      }), this.form
    )

    this.submit = element('button', {
      'type': 'submit',
      'class': 'dynamic',
      'defaultText': 'Submit',
      'loadingText': 'Loading.',
      'append': this.form
    })
  }
  destroy() {
    this.fixedWrap.remove()
  }

  async addToFirestore(e) {
    e.preventDefault()
    const submit = this.submit
    const type = this.typeWrap.input.value
    const category = this.categoryWrap.input.value
    const value = this.valueWrap.input.value

    submit.classList.add('loading')

    try {
      const toFireStore = await budgetCollection()
      .doc().set({
        type, category, value,
        timestamp: timestamp.now()
      })
      
      await alert2({
        'title': 'Success',
        'message': 'The Record Has Been Added'
      })

      this.destroy()

    } catch (error) {
      submit.classList.remove('loading')
      
        await alert2({
          'title': 'Error',
          'message': error.message,
          'button': 'I will try again later'
        })
      
    }

    return false
  }
}

class inputWrap {
  constructor(icon, input, parent) {
    this.wrap = element('div', {
      'class': 'input-wrap',
      'append': parent
    })
    this.icon = icon
    this.input = input
    this.input.addEventListener('input', function() {
      this.setCustomValidity('')
    })

    this.wrap.append(this.icon)
    this.wrap.append(this.input)
  }
}

function validation(el, msg) {
  el.setCustomValidity(msg)
  el.reportValidity()
}
