import {
  auth,
  timestamp
} from "/scripts/firebase.js"

import {
  budgetCollection,
  AddBudget
} from "/scripts/firebase/budget.js"

import signIn from '/scripts/popups/signIn.js'

document.body.classList.remove('loading')


auth.onAuthStateChanged(async function() {
  if (auth.currentUser) {
    const dateStart = timestamp.now().toDate()
    dateStart.setDate(dateStart.getDate() - 6)
    dateStart.setHours(0, 0, 0, 0)
    const ts = timestamp.fromDate(dateStart)

    var tree = {
      outcome: {
        label: 'Outcome',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#e75757',
        backgroundColor: '#e75757',
      },
      savings: {
        label: 'Savings',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#649ff0',
        backgroundColor: '#649ff0',
      }
    }

    var tree2 = {
      commute: {
        label: 'Commute',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#92acd5',
        backgroundColor: '#92acd5',
      },
      food: {
        label: 'Food',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#dbf8cd',
        backgroundColor: '#dbf8cd',
      },
      essential: {
        label: 'Essential',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#b2d1cc',
        backgroundColor: '#b2d1cc',
      },
      other: {
        label: 'Other',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#edde81',
        backgrounColor: '#edde81',
      }
    }

    try {
      for (let i in tree) {
        const type = tree[i]
        const ref = await budgetCollection()
          .where('timestamp', '>', ts)
          .where('type', '==', i)
          .get()

        ref.forEach(d => {
          const { timestamp, value, category } = d.data()
          const dateRange = Math.floor((timestamp.toDate() - dateStart) / 1000 / 60 / 60 / 24)
          type.data[dateRange] += Number(value)

          if (i != 'savings')
            tree2[category].data[dateRange] += Number(value)
        })

        chart.data.datasets.push(type)
      }

      for (let i in tree2) {
        chart2.data.datasets.push(tree2[i])
      }
      
      [...document.querySelectorAll('.charts canvas + loader')].forEach(loader => {
        loader.remove()
      })
      chart.update()
      chart2.update()
    } catch (e) {
      console.log(e)
    }
  }
  else {
    const signin = new signIn()
  }
})
const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: 'Weekly Expenses',
    }
  }
}

const ctx = document.getElementById('typesChart').getContext('2d')
const config = {
  type: 'bar',
  data: {
    labels: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', '1d ago', 'Today']
  },
  options
};
const chart = new Chart(ctx, config)

const ctx2 = document.getElementById('categoriesChart').getContext('2d')
const config2 = {
  type: 'bar',
  data: {
    labels: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', '1d ago', 'Today']
  },
  options
};
const chart2 = new Chart(ctx2, config2)


try {
  document.getElementById('add').onclick = function() {
    const add = new AddBudget()
  }

} catch (e) {
  console.log(e)
}