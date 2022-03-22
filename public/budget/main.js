import {
  auth,
  timestamp
} from "/scripts/firebase.js"

import {
  budgetCollection,
  AddBudget
} from "/scripts/firebase/budget.js"

auth.onAuthStateChanged(async function() {
  if (auth.currentUser.uid) {
    const dateStart = timestamp.now().toDate()
    dateStart.setDate(dateStart.getDate() - 6)
    dateStart.setHours(0, 0, 0, 0)
    const ts = timestamp.fromDate(dateStart)

    var tree = {
      outcome: {
        label: 'Expenses',
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

    try {
      for (let i in tree) {
        const type = tree[i]
        const ref = await budgetCollection()
          .where('timestamp', '>', ts)
          .where('type', '==', i)
          .get()

        ref.forEach(d => {
          const { timestamp, value } = d.data()
          const dateRange = Math.floor((timestamp.toDate() - dateStart) / 1000 / 60 / 60 / 24)
          type.data[dateRange] += Number(value)
        })
        chart.data.datasets.push(type)
        chart.update()
      }

    } catch (e) {
      console.log(e.message)
    }

  }
  else {
    console.log('User Login Prompt')
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

try {
  document.getElementById('add').onclick = function() {
    const add = new AddBudget()
  }

} catch (e) {
  console.log(e)
}