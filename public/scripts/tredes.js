const tredes = {
  'element': function (tagName, attributes){
    var el = document.createElement(tagName)
    
    for(let attr in attributes){
      var value = attributes[attr]
      switch (attr){
        case 'event':
          const events = value
          for (let event in events) {
            el.addEventListener(event, events[event])
          }
        break;
        case 'innerHTML': el.innerHTML = value
        break;
        case 'innerText': el.innerText = value
        break;
        case 'append': value.append(el) 
        break;
        case 'insertAt': 
          value.target.insertBefore(
            el,
            value.target.childNodes[value.index]
          )
        break;
        case 'options':
        value.forEach(val => {
          tredes.element('option', {
            'value': val.value,
            'innerText': val.text,
            'append': el
          })
        })
        break;
        default: el.setAttribute(attr, value)
        break;
      }
    }
    
    return el
  },
  'textNode': function (text, parent){
    return parent.append(document.createTextNode(text))
  }
}

export default tredes