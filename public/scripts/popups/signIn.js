import tredes from '../tredes.js'
import alert2 from './alert.js'
import { auth } from '../firebase.js'

const element = tredes.element
export default class {
  constructor() {
    this.fixedWrap = element('div', {
      'class': 'fixed-wrap',
      'append': document.body
    })

    this.wrap = element('div', {
      'class': 'popup-wrap login-wrap gradient-border border-animate',
      'append': this.fixedWrap
    })
    this.title = element('h3', {
      'class': 'title',
      'innerText': 'Login',
      'append': this.wrap
    })
    this.form = element('form', {
      'class': 'form',
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
      'class': 'button gradient-border',
      'innerText': 'Login',
      'append': this.form
    })
  }

  destroy() {
    this.fixedWrap.classList.add('fadingOut')
    this.fixedWrap.onanimationend = () => {
      this.fixedWrap.remove()

    }
  }

  async login(e) {
    e.preventDefault()
    const submit = this.submit
    const pw = this.passwordWrap.input
    const email = this.emailWrap.input
    submit.innerText = "Please wait."
    submit.disabled = true
    
    try {
      const user = await auth.signInWithEmailAndPassword(email.value, pw.value)

      await alert2({
        'title': 'Success',
        'message': 'Signed in successfully'
      })

      this.destroy()

    } catch (error) {
      submit.innerText = "Login"
      submit.disabled = false
      
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
      'class': 'input gradient-border bottom border-animate',
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



/* Load the Css */
const link = element('link', {
  'rel': 'stylesheet',
  'href': '/styles/custom/signIn.css',
  'append': document.head
})