import {
  auth,
  timestamp
} from "/scripts/firebase.js"

import {
  budgetCollection,
  AddBudget
} from "/scripts/firebase/budget.js"

import signIn from '/scripts/popups/signIn.js'


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
        backgroundColor: '#ff6961',
      },
      income: {
        label: 'Income',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'blue',
      },
      savings: {
        label: 'Savings',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'green',
      }
    }

    var tree2 = {
      commute: {
        label: 'Commute',
        data: [0,0,0,0,0,0,0],
        backgroundColor: '#ff6961',
      },
      food: {
        label: 'Food',
        data: [0,0,0,0,0,0,0],
        backgroundColor: 'green',
      },
      essential: {
        label: 'Essential',
        data: [0,0,0,0,0,0,0],
        backgroundColor: '#ff6961',
      },
      other: {
        label: 'Other',
        data: [0,0,0,0,0,0,0],
        backgroundColor: 'blue',
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
          tree2[category].data[dateRange] += Number(value)
        })
        
        chart.data.datasets.push(type)
        chart.update()
      }
      for(let i in tree2) {
        console.log(tree2[i])
        chart2.data.datasets.push(tree2[i])
        
        chart2.update()
      }
    } catch (e) {
      console.log(e)
    }
    

  }
  else {
    const signin = new signIn()
  }
})

const ctx = document.getElementById('pie-chart').getContext('2d')
const config = {
  type: 'bar',
  data: {
    labels: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', '1d ago', 'Today']
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Weekly Expenses'
      }
    },
  },
};
const chart = new Chart(ctx, config)

const ctx2 = document.getElementById('pie-chart2').getContext('2d')
const config2 = {
  type: 'bar',
  data: {
    labels: ['6d ago', '5d ago', '4d ago', '3d ago', '2d ago', '1d ago', 'Today']
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Today Expenses'
      }
    },
  },
};
const chart2 = new Chart(ctx2, config2)


try {
  document.getElementById('add').onclick = function() {
    const add = new AddBudget()
  }

} catch (e) {
  console.log(e)
}
