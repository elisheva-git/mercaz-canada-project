const arr = document.querySelectorAll('.atraction');

const clickattrarction = arr.forEach(attrac => {
  attrac.onclick = () => {
    if (attrac.classList[1] === "groups") {
      const url = new URL('/groups.html', location.href);
      url.searchParams.set('atrac', attrac.classList[1]);
      location.href = url;
    }
    else {
      const url = new URL('/attraction.html', location.href);
      url.searchParams.set('atrac', attrac.classList[1]);
      location.href = url;
    }
  }
});

const create_container_atraction = (data) => {
  const img_out = document.querySelectorAll('.atrac_img');
  let index = 0;
  arr.forEach(atrac => {
    const title_atrac = document.createElement('span');
    title_atrac.innerHTML = data[atrac.classList[1]].title;
    title_atrac.classList.add('title_atrac');
    atrac.appendChild(title_atrac);
    img_out[index++].src = data[atrac.classList[1]].img_out;
  })
  if(screen.availWidth <= 900){
    const container = document.querySelector('#container');
    document.getElementsByTagName('line1').removeAttribute("class");
    document.getElementsByTagName('line2').removeAttribute("class");
    document.getElementsByTagName('line3').removeAttribute("class");
  }
}

const div_img_over = document.querySelector('.img_over');//מעבר תמונות ע"י החיצים
const div_icon_angle = document.createElement('div');
div_icon_angle.classList.add('div_icon_angle');
const angle_left = document.createElement('i');
const angle_right = document.createElement('i'); 
angle_right.classList.add('fas');
angle_right.classList.add('fa-angle-right');
angle_right.classList.add('angle');
angle_left.classList.add('fas');
angle_left.classList.add('fa-angle-left');
angle_left.classList.add('angle');
div_icon_angle.appendChild(angle_right);
div_icon_angle.appendChild(angle_left);
div_img_over.before(div_icon_angle);


const func_img_over = (_data_img) => {//הפונקציה של התמונות המתחלפות
  let value = Object.keys(_data_img).length;
  div_img_over.src = _data_img[1];
  const intervalId = setInterval(() => {
    div_img_over.src = _data_img[value];
    value--;
    if (value === 0) {
      value = Object.keys(_data_img).length;
    }
  }, 4000);
  angle_right.onclick = () => {
    div_img_over.src = _data_img[value];
    value--;
    if (value === 0) {
      value = Object.keys(_data_img).length;
    }
  }
  angle_left.onclick = () => {
    div_img_over.src = _data_img[value];
    if (value === Object.keys(_data_img).length) {
      value = 0;
    }
    value++;
  }
}

const json_img_over = () => {//שליפה של התמונות של עמוד הבית
  $.ajax({
    url: './attractions.json',
    success: (_data_img) => {
      func_img_over(_data_img["img_over"]);
      create_container_atraction(_data_img);
    }
  });
};
json_img_over();
