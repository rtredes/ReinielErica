import {
  db,
  auth,
  months,
  timestamp
} from "/scripts/firebase.js"

import tredes from '/scripts/tredes.js'
import alert2 from '/scripts/popups/alert.js'
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
      'class': 'popup-wrap gradient-border border-animated',
      'append': this.fixedWrap
    })
    this.title = element('h3', {
      'class': 'title',
      'innerText': 'Add Data',
      'append': this.wrap
    })
    this.form = element('form', {
      'class': 'form',
      'event': {
        'submit': (e) => this.addToFirestore(e)
      },
      'append': this.wrap
    })

    this.typeWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-chart-line'
      }),
      element('select', {
        'required': '',
        'options': [
          { 'text': 'Select One', 'value': '' },
          { 'text': 'Outcome', 'value': 'outcome' },
          { 'text': 'Savings', 'value': 'savings' }
        ]
      }), this.form
    )

    this.categoryWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-chart-pie'
      }),
      element('select', {
        'required': '',
        'options': [
          { 'text': 'Select One', 'value': '' },
          { 'text': 'Commute', 'value': 'commute' },
          { 'text': 'Food', 'value': 'food' },
          { 'text': 'Other', 'value': 'other' },
        ]
      }), this.form
    )

    this.valueWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-coins'
      }),
      element('input', {
        'type': 'number',
        'min': '1',
        'required': '',
        'placeholder': 'Value'
      }), this.form
    )

    this.submit = element('button', {
      'class': 'button gradient-border border-animated',
      'type': 'submit',
      'innerText': 'Submit',
      'append': this.form
    })
  }
  destroy() {
    this.fixedWrap.classList.add('fadingOut')
    this.fixedWrap.onanimationend = () => {
      this.fixedWrap.remove()

    }
  }
  
  
  async addToFirestore(e) {
    e.preventDefault()
    const submit = this.submit
    const type = this.typeWrap.input.value
    const category = this.categoryWrap.input.value
    const value = this.valueWrap.input.value

    submit.innerText = 'Please wait.'
    submit.disabled = 'true'
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
      submit.innerText = 'Submit'
      submit.disabled = false
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
      'class': 'input gradient-border bottom',
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

/**/