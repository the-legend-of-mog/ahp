var  a = 1
var ttt =''
function render(i) {

  switch (i[1]) {
    case 'mc':
      console.log('multiple choice')
      let y = i[2].push(i[3])
    console.log(i[2])
    i[2] = shuffle(i[2])
    console.log(i[2])
      $('#quiz').append(`<p class='q frqq f bb${a}'> ${i[0]}</p><div  class='bb${a}' id='bb${a}'></div>`)
      for (let pp = 0; pp < y; pp++) {
          $('#bb'+a).append(`<div class="q cb bb${a}">
    <input type="radio" class="form-check-input mco q bb${a}" id="bb${a}" name="t/f_${a}" value="${i[2][pp]} " name ='${i[4]}'>${i[2][pp]}</input>
    </div>`)
        }
      console.log(a)
       a +=1
      break;
    case 't/f':
      console.log('true or false')
      $('#quiz').append(`<p class='q frq bb${a}'>${i[0]}</p><div class='q ff bb${a} f'>
    <div class="q tt bb${a}">
    <input type="radio" class="form-check-input q bb${a}" id="radio1" name="t/f_${a}" value="True"  name ='t${i[3]}' checked>True
    <label class=" q bb${a} form-check-label" for="radio1"></label>
    </div>
    <div class="q tt form-check bb${a}" id='2'>
    <label class="q bb${a} form-check-label" for="radio2"></label>
    <input type="radio" class="q  t bb${a} form-check-input" id="radio2" name="t${i[3]}" value="False">False</input>
    </div>`)
      console.log(a)
       a +=1
      break;
    case 'fr':
      console.log('free response')
      $('#quiz').append(`<p class='q f frq bb${a}'>${i[0]}</p><label for="bb${a}" class="form-label q bb${a}">Answer:</label>
    <input style='display:none;width:80vw;' class="form-control q bb${a}" type='text' autosubmit='false' id="bb${a}" required></input>`)
      console.log(a)
       a +=1
      break;
  }
}
var b = 1
var type = 1
function increment() {
  $('#p').fadeIn(300)

  const gh = document.getElementsByClassName('f').length
  console.log(gh)
  if (type == 0){
    b++
  }
  gg = String(Math.round(b/gh*100))+'%'
  type = 1
  if (b == gh){
    $('#i').css('display','none')
  }else{
    $('#i').fadeIn(300)
  }
  if (b> 1){
    $('#d').fadeIn(300)
  }else{
    $('#d').fadeOut(300)
  }
  g = '.bb'+b
  $('#bar').fadeIn(300)
  $('#bar').animate({'width':gg})
  $('#p').text(gg)
  $('#h').fadeOut(300)
  $('.q').fadeOut(300)
  $(g).fadeIn(300)
  b++
}
function decrement() {
  $('#p').fadeIn(300)
  const gh = document.getElementsByClassName('f').length
  b--
  if (type == 1){
    b--
  }
  type = 0

  if (b == gh){
    $('#i').css('display','none')
  }else{
    $('#i').fadeIn(300)
  }
  gg = String(Math.round(b/gh*100))+'%'
  if (b == gh){
    b--
  }
  if (b == 0 ){
    b = gh
  }
  if (b> 1){
    $('#d').fadeIn(300)
  }else{
    $('#d').css('display','none')
  }
  console.log(b)
  $('#p').text(gg)
  console.log(b)
  $('#bar').fadeIn(300)
  $('#bar').animate({'width':gg})
  $('#h').fadeOut(300)
  g = '.bb'+b
  $('.q').fadeOut(300)
  $(g).fadeIn(300)

}
function onstart() {
  $('#d').fadeOut(300)
  $('#p').fadeOut(300)
  questionno = 1
  let questions = [['what is 1+1', 'mc', ['3','4','17','42','42','42'], '2','1'], ['is it true', 't/f', true,'2'], ['why', 'fr', 'why not','3']]
  for (let i = 0; i < questions.length; i++) {
    render(questions[i])
  }
}

function shuffle(points) {
  for (let i = points.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let k = points[i]
    points[i] = points[j]
    points[j] = k
  }
  return points;
}
 $(document).on("keydown", "form", function(event) { 
   console.log('called')
    return event.key != "Enter";
})