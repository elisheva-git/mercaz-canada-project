const dom = {
    container: document.querySelector('.container_atrac'),
}
const url = new URL(location.href);
const atrac_name = url.searchParams.get('atrac');

const funcyoyo = () => {
    $.ajax({
        url: './attractions.json',
        success: (_data) => {
            create_page(_data[atrac_name], _data["img_over_kapiterya"]);
        }
    });
};

const create_page = (obj_attrac, obj_kapiteria) => {//הפונקציה שיוצרת את העמוד בהתאם לאטרקציה שנלחצה
    const divimg = document.createElement('div');
    divimg.classList.add('div_img');
    divimg.style.backgroundImage =`url('${obj_attrac.img}')`;

    dom.container.appendChild(divimg);

    var whitediv = document.createElement('div');
    whitediv.classList.add('white');


    const title = document.createElement('h3');
    title.innerHTML = `${obj_attrac.title}`;
    title.classList.add('title');
    document.title = `מרכז קנדה | ${obj_attrac.title}`;

    const f = document.createElement('div');
    f.classList.add('f');

    const text = document.createElement('p');
    text.innerHTML = obj_attrac.text;

    const drow = document.createElement('img');
    drow.classList.add('drow');
    drow.src = obj_attrac.img_drow;
    
    if (obj_attrac.name != "kapiteria") {
        var btn = document.createElement('button');
        btn.innerHTML = "לפרטים נוספים והזמנה";
        btn.classList.add('btn');
    }
    
    if (obj_attrac.name != "kapiteria") {
        whitediv.appendChild(title);
        f.appendChild(drow);
        f.appendChild(text);
        whitediv.appendChild(f);
        console.log("hghg");
        whitediv.appendChild(btn);
        btn.onclick = () => {
            btn.disabled = true;
            btn_paying(obj_attrac);
        }

    }
    else {//יצירת דיב עם תמונות מתחלפות רק בקפיטריה
        const arr_kapiteria = Object.entries(obj_kapiteria);
        const div_kapiteria = document.createElement('div');
        div_kapiteria.classList.add('div_kapiteria');
        const img_k = document.createElement('img');
        img_k.src = arr_kapiteria[0][1];
        img_k.classList.add('img_k');

        const div_icon_angle = document.createElement('div');
        div_icon_angle.classList.add('div_icon_angle');
        div_icon_angle.style.top = "40%";
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
        div_kapiteria.appendChild(div_icon_angle);
        div_kapiteria.appendChild(img_k);
        whitediv.appendChild(title);
        drow.style.width = "30vw";
        f.appendChild(drow);
        f.appendChild(div_kapiteria);
        f.style.marginTop = "2vw";
        whitediv.appendChild(f);
        text.style.textAlign = "center";
        whitediv.appendChild(text);
        var index = 1;
        angle_right.onclick = () => {
            img_k.src = arr_kapiteria[index][1];
            index--;
            if (index === 0) {
                index = arr_kapiteria.length - 1;
            }
        }
        angle_left.onclick = () => {
            img_k.src = arr_kapiteria[index][1];
            if (index === arr_kapiteria.length - 1) {
                index = 0;
            }
            index++;
        }

    }
    dom.container.appendChild(whitediv);

}
let obj_cards = {};
let count = 1;

const div_count = () => { 
    const div_count = document.createElement('div');
    const span_count = document.createElement('span');
    span_count.innerHTML = "כמות: ";
    const btn_plus = document.createElement('button');
    btn_plus.innerHTML = "+";
    btn_plus.classList.add('btn_round');
    btn_plus.classList.add('btn_plus');
    var input_count = document.createElement('input');
    input_count.classList.add('input')
    input_count.value = count;
    const btn_minus = document.createElement('button');
    btn_minus.innerHTML = "-";
    btn_minus.classList.add('btn_round');
    btn_minus.classList.add('btn_minus');
    div_count.appendChild(span_count);
    div_count.appendChild(btn_plus);
    div_count.appendChild(input_count);
    div_count.appendChild(btn_minus);
    btn_plus.onclick = () => {//פונקציה בעת לחיצה על כפתור הוספת כרטיס
        input_count.value = (parseInt(input_count.value) + 1);
        count++;
    }
    btn_minus.onclick = () => {//פונקציה בעת לחיצה על כפתור הורדת כרטיס
        if (parseInt(input_count.value) > 1) {
            input_count.value = (parseInt(input_count.value) - 1);
            count--;
        }
    }
    input_count.onkeypress = (event) => {//שנוי כמות הכרטיסים
        if (!(event.keyCode >= '0'.charCodeAt() && event.keyCode <= '9'.charCodeAt())) {
            event.preventDefault();
        }
    }
    input_count.onchange = (event) => {//שנוי כמות הכרטיסים
        count = input_count.value;
    }
    return div_count;
}

const btn_paying = (obj_attrac) => {//פונקציה שיוצרת את הדיב של פרטים נוספים
    const div_buy = document.createElement('div');
    div_buy.classList.add('white');
    div_buy.classList.add('div_price');
    div_buy.id="_buy";//הוספת id בגאבה

    const name_b = document.createElement('span');
    name_b.innerHTML = obj_attrac.title;
    name_b.classList.add('title');
    let price = document.createElement('span');
    price.innerHTML = `מחיר: ${obj_attrac.price} <i class="fas fa-shekel-sign shekel"></i>`;
    div_buy.appendChild(name_b);
    div_buy.appendChild(price);
    dom.container.appendChild(div_buy);

    const div_count_in = div_count();

    const btn_add_shopping = document.createElement('button');
    btn_add_shopping.classList.add('btn');
    btn_add_shopping.innerHTML = "הוסף להזמנה";

    div_buy.appendChild(div_count_in);
    div_buy.appendChild(btn_add_shopping);
    location.href = "#_buy";//גלילת הדף למקום של הדיב החדש שנוצר

    btn_add_shopping.onclick = () => {
        if (localStorage.cards===undefined) {//אם אין הזמנות
            obj_cards[obj_attrac.name] = count;
            localStorage["cards"] = JSON.stringify(obj_cards);
        }
        else {
            obj_cards = JSON.parse(localStorage["cards"]);
            if(obj_cards[obj_attrac.name]!=null){//אם כבר הוזמנו כרטיסים מאטרקציה זו 
                obj_cards[obj_attrac.name] += count;//נוספים מספר הכרטיסים שהוזמנו עכשיו
            }
            else{//אם לא הוזמנו כרטיסים מאטרקציה זו
                obj_cards[obj_attrac.name] = count;
            }
            localStorage["cards"] = JSON.stringify(obj_cards);
        }
        location.href = '/shopping.html';
    };

}
if (location.pathname === '/attraction.html') {
    funcyoyo();
}
