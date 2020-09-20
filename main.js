console.log('halko')
const footAboveBtn = document.getElementById('footAboveImage')
const footSideBtn = document.getElementById('footSideImage')

const aboveImage = document.getElementById('aboveImage')
const sideImage = document.getElementById('sideImage')

const leftHeight = document.getElementById('leftHeight')
const rightHeight = document.getElementById('rightHeight')

const leftWidth = document.getElementById('leftWidth')
const rightWidth = document.getElementById('rightWidth')

const leftPerim = document.getElementById('leftPerim')
const rightPerim = document.getElementById('rightPerim')

const producerName = document.getElementById('producerName')

const name = document.getElementById('nameAndSurname')
const age = document.getElementById('age')
const telephone = document.getElementById('telephone')
const email = document.getElementById('email')
const rodo = document.getElementById('rodoCheck')

const sendButton = document.getElementById('send')

let footAbovePhoto = undefined
let footSidePhoto = undefined

let form = new FormData()

let data = {
  'footHeight': {
    'left': undefined,
    'right': undefined
  },
  'footWidth': {
    'left': undefined,
    'right': undefined
  },
  'footPerim': {
    'left': undefined,
    'right': undefined
  },
  'producer': undefined,
  'clientData': {
    'name': undefined,
    'age': undefined,
    'telephone': undefined,
    'email': undefined
  }
}

footAboveBtn.addEventListener('change', function(){
  form.set('aboveImage', this.files[0])
  var fr = new FileReader()
  fr.readAsDataURL(this.files[0])
  fr.onload = function(e){
    aboveImage.src = this.result
  }
})

footSideBtn.addEventListener('change', function(){
  form.set('sideImage', this.files[0])
  var fr = new FileReader()
  fr.readAsDataURL(this.files[0])
  fr.onload = function(e){
    sideImage.src = this.result
  }
})


sendButton.addEventListener('click', function(e){
  inputs = document.getElementsByTagName('input')
  for(let i = 0; i < inputs.length - 1; i++){
    if(inputs[i].value == ''){
      alert('Proszę wypełnić wszystkie pola')
      return
    }
  }
  if(!inputs[inputs.length - 1].checked){
    alert('Proszę wyrazić zgodę na przetwarzanie danych w celu doboru odpowiedniego obuwia')
    return
  }
  if(document.getElementById('email').value.indexOf('@') == -1){
    alert('Błędny adres email')
    return
  }
  if(document.getElementById('telephone').value.length !== 9){
    alert('Błędny numer telefonu')
    return
  }
  data['aboveImage'] = inputs[0].value
  data['sideImage'] = inputs[1].value
  data['footHeight']['left'] = inputs[2].value
  data['footHeight']['right'] = inputs[3].value
  data['footWidth']['left'] = inputs[4].value
  data['footWidth']['right'] = inputs[5].value
  data['footPerim']['left'] = inputs[6].value
  data['footPerim']['right'] = inputs[7].value
  data['producer'] = inputs[8].value
  data['clientData']['name'] = inputs[9].value
  data['clientData']['age'] = inputs[10].value
  data['clientData']['telephone'] = inputs[11].value
  data['clientData']['email'] = inputs[12].value
  console.log('data: ', JSON.stringify(data))
  console.log('test')
  sendData(data)
})

function sendData(data){
  for (var value of form.values()) {
     value['filename']  = value.name
     console.log('shit: ', value);
  }
  form.set('data', JSON.stringify(data))
  fetch('http://192.168.1.76:8080/upload', {
    method: 'POST',
    body: form
  }).then(response => {
      if(response.ok){
        alert('Formularz wysłany poprawnie. Dziękujemy!')
      }
      // response.json();console.log(response)
    })
    // .then(respJSON => console.log('response: ', respJSON))
    .catch(error => console.log('error from fetch: ', error))
}
