import {
  auth,
  timestamp,
  months,
  live,
  serverDateToday
} from "/scripts/firebase.js"

import {
  budgetCollection,
  AddBudget
} from "./budget.js"

import signIn from '/scripts/popups/signIn.js'

auth.onAuthStateChanged(async function() {
  if (auth.currentUser) {
    const dateEnd = dateAddDay(
      serverDateToday(), -6
    )
    const dateStart = timestamp.fromDate(dateEnd)
    var labels = []

    for (let i = 0; i < 7; i++) {
      const t = new Date(dateEnd)
      t.setDate(t.getDate() + i)
      const m = t.getMonth()
      const d = t.getDate()
      labels.push(
        `${shortenString(months[m], 3)} ${d}`
      )
    }

    const typesChart = setChart(
      'typesChart', {
        'title': '7 Days',
        'type': 'bar',
        'labels': labels,
        'datasets': [
          {
            label: 'Outcome',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#e75757',
            backgroundColor: '#e75757',
          },
          {
            label: 'Savings',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#649ff0',
            backgroundColor: '#649ff0',
          }
        ]
      }
    )

    const categoriesChart = setChart(
      'categoriesChart', {
        'title': '7 Days',
        'type': 'bar',
        'labels': labels,
        'datasets': [
          {
            label: 'Commute',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#92acd5',
            backgroundColor: '#92acd5',
          },
          {
            label: 'Food',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: '#dbf8cd',
            backgroundColor: '#dbf8cd',
          },
          {
            label: 'Other',
            data: [0, 0, 0, 0, 0, 0, 0],
            borderColor: 'gray',
            backgroundColor: 'gray',
          }
        ]
      }
    )

    const ref = await budgetCollection()
      .where('timestamp', '>', dateStart)

    live(ref, {
      'added': function(data) {
        const { timestamp, value, category, type } = data
        const types = [
          'outcome', 'savings'
        ]
        const categories = [
          'commute', 'food', 'other'
        ]

        const datasetData = typesChart.data.datasets[types.indexOf(type)].data
        const datasetData2 = categoriesChart.data.datasets[categories.indexOf(category)].data
        const dateRange = Math.floor((timestamp.toDate() - dateEnd) / 1000 / 60 / 60 / 24)

        datasetData[dateRange] += Number(value)
        datasetData2[dateRange] += type == 'outcome' ? Number(value) : 0

        typesChart.update()
        categoriesChart.update()
        
        const loaders = [...document.querySelectorAll('.charts canvas + loader')]
        loaders.forEach(loader => {
          loader.remove()
        })
      }
    })

  }
  else {
    const signin = new signIn()
  }
  document.body.classList.remove('loading')
})

function setChart(chart, { type, labels, datasets, title }) {
  const c = document.getElementById(chart).getContext('2d')
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: title,
      }
    }
  }
  const config = {
    type,
    data: { labels, datasets },
    options
  }

  return new Chart(c, config)
}


document.getElementById('add').onclick = function() {
  const add = new AddBudget()
}

function shortenString(text, length) {
  var text = text.split('')
  var result = ''
  for (let i = 0; i < length; i++) {
    result += text.shift()
  }

  return result
}

function dateAddDay(targetDate, days) {
  const date = targetDate
  date.setDate(date.getDate() + days)
  date.setHours(0, 0, 0, 0)
  return date
}
