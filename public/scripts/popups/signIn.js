import tredes from '../tredes.js'
import { signIn } from '../firebase.js'
import alert2 from './alert.js'

const element = tredes.element
export default class {
  constructor() {
    this.fixedWrap = element('div', {
      'class': 'fixed-wrap',
      'append': document.body
    })

    this.wrap = element('div', {
      'class': 'login-wrap',
      'append': this.fixedWrap
    })
    this.title = element('h3', {
      'class': 'login-title',
      'innerText': 'Login',
      'append': this.wrap
    })
    this.form = element('form', {
      'class': 'login-form',
      'event': {
        'submit': (e) => this.login(e)
      },
      'append': this.wrap
    })

    this.emailWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-envelope'
      }),
      element('input', {
        'type': 'email',
        'required': ''
      }), this.form
    )

    this.passwordWrap = new inputWrap(
      element('i', {
        'class': 'fas fa-key'
      }),
      element('input', {
        'type': 'password',
        'required': '',
      }), this.form
    )

    this.submit = element('button', {
      'type': 'submit',
      'class': 'dynamic',
      'defaultText': 'Sign In',
      'loadingText': 'Signing.',
      'append': this.form
    })
  }

  destroy() {
    this.fixedWrap.remove()
  }

  async login(e) {
    e.preventDefault()
    const submit = this.submit
    const pw = this.passwordWrap.input
    const email = this.emailWrap.input
    submit.classList.add('loading')

    try {
      const user = await signIn({
        email: email.value,
        pass: pw.value
      })
      
      await alert2({
        'title': 'Success',
        'message': 'Signed in successfully'
      })
      
      this.destroy()

    } catch (error) {
      submit.classList.remove('loading')
      if (error.code = "auth/wrong-password") {
        validation(pw, 'Incorrect Password')
      } else {
        await alert2({
          'title': 'Error',
          'message': error.message,
          'button': 'I will try again later'
        })
      }
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
    this.input.addEventListener('input', () => {
      this.input.setCustomValidity('')
    })
    
    this.wrap.append(this.icon)
    this.wrap.append(this.input)
  }
}

function validation(el, msg) {
  el.setCustomValidity(msg)
  el.reportValidity()
}