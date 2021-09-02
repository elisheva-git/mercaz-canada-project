//js של סל הקניות
const cancel_shopping = (obj_cards, i) => {//פונקציה למחיקת אטקרציה מהסל
    delete obj_cards[i[0]];
    localStorage["cards"] = JSON.stringify(obj_cards);
}

const func_create_shopping = (data) => {//פונקציה ליצירת הדיבים של ההזמנה עם הפרטים
    let obj_cards = JSON.parse(localStorage["cards"]);
    let arr = Object.entries(obj_cards);
    let sum = 0;
    arr.forEach(i => {
        console.log(i);
        const div_product = document.createElement('div');
        div_product.classList.add('div_product');
        div_product.style.fontWeight = "500";

        const name = document.createElement('div');
        name.classList.add('flex_colum');
        const span_name = document.createElement('span');
        span_name.innerHTML = data[i[0]].title;
        const div_delete = document.createElement('div');
        div_delete.classList.add('f');
        const delete_btn = document.createElement('button');
        delete_btn.innerHTML = 'x';
        const span_delete = document.createElement('span');
        span_delete.innerHTML = "בטל";
        span_delete.style.paddingRight = "3px";
        div_delete.appendChild(delete_btn);
        div_delete.appendChild(span_delete);
        delete_btn.classList.add('dalete_btn');
        delete_btn.onclick = () => {//כשלוחצים על כפתור למחיקת אטרקציה
            div_product.remove();
            cancel_shopping(obj_cards, i);
            sum -= data[i[0]].price * div_count1.querySelector('input').value;
            sum_all.innerHTML = `סה"כ : ${sum} <i class="fas fa-shekel-sign shekel"></i>`;
            if (sum === 0) {
                sum_all.style.paddingRight = "0";
                sum_all.innerHTML = "אין הזמנות";
            }
        }
        name.appendChild(span_name);
        name.appendChild(div_delete);
        const price = document.createElement('div');
        price.classList.add('flex_colum');
        price.classList.add('price_a');
        const price_item = document.createElement('span');
        price_item.innerHTML = `מחיר ליחידה: ${data[i[0]].price} <i class="fas fa-shekel-sign shekel"></i>`;
        price_item.classList.add('padding');
        const price_all = document.createElement('span');
        price_all.innerHTML = `סה"כ למוצר : ${data[i[0]].price * i[1]} <i class="fas fa-shekel-sign shekel"></i>`;
        price_all.classList.add('padding');

        price.appendChild(price_item);
        price.appendChild(price_all);
        const div_count1 = div_count();
        div_count1.querySelector('input').value=i[1];
        let count=0;
        div_count1.querySelector('.btn_plus').onclick=()=>{// לחיצה על כפתור להוסיף כרטיס
            div_count1.querySelector('input').value = (parseInt(div_count1.querySelector('input').value) + 1);
            obj_cards[i[0]]=div_count1.querySelector('input').value;
            localStorage["cards"] = JSON.stringify(obj_cards);
            price_all.innerHTML = `סה"כ למוצר : ${data[i[0]].price *(obj_cards[i[0]])} <i class="fas fa-shekel-sign shekel"></i>`;
            sum += parseInt(data[i[0]].price);
            sum_all.innerHTML = `סה"כ : ${sum} <i class="fas fa-shekel-sign shekel"></i>`;
        }
        div_count1.querySelector('.btn_minus').onclick=()=>{//לחיצה על כפתור להורדת כרטיס
            if (parseInt(div_count1.querySelector('input').value) > 1){
                div_count1.querySelector('input').value = (parseInt(div_count1.querySelector('input').value) - 1);
                obj_cards[i[0]]=div_count1.querySelector('input').value;
                localStorage["cards"] = JSON.stringify(obj_cards);
                price_all.innerHTML = `סה"כ למוצר : ${data[i[0]].price *(obj_cards[i[0]])} <i class="fas fa-shekel-sign shekel"></i>`;
                sum -= parseInt(data[i[0]].price);
                sum_all.innerHTML = `סה"כ : ${sum} <i class="fas fa-shekel-sign shekel"></i>`;
            }
        }
        const container = document.querySelector('#container');
        div_product.appendChild(name);
        div_product.appendChild(price);
        div_product.appendChild(div_count1);
        div_product.style.margin = "10px";
        container.appendChild(div_product);
        sum += data[i[0]].price * i[1];
    });
    const div_buttons_shopping = document.createElement('div');

    const btn_back_shopping = document.createElement('button');
    btn_back_shopping.classList.add('btn');

    btn_back_shopping.innerHTML = "המשך קניה";
    btn_back_shopping.style.marginRight = "0";
    btn_back_shopping.style.width = "130px";
    btn_back_shopping.onclick = () => {
        location.href = '/homepage.html#container';
    }

    const btn_pay = document.createElement('button');
    btn_pay.innerHTML = "לתשלום";
    btn_pay.classList.add('btn');
    btn_pay.style.marginRight = "0";
    btn_pay.style.width = "130px";
    btn_pay.onclick = () => {
        location.href = '/pay.html';
    }
    div_buttons_shopping.appendChild(btn_back_shopping);
    div_buttons_shopping.appendChild(btn_pay);
    div_buttons_shopping.classList.add('div_buttons_shopping');

    const sum_all = document.createElement('span');
    if (sum === 0) {//אם אין הזמנות
        sum_all.innerHTML = "אין הזמנות";
        sum_all.style.paddingRight = "0";
        btn_pay.onclick = (event) => {
            event.preventDefault();
        }
    }
    else {//אחרת כותב את סכום סהכ
        sum_all.innerHTML = `סה"כ : ${sum} <i class="fas fa-shekel-sign shekel"></i>`;
        sum_all.style.paddingRight = "58vw";
    }
    sum_all.style.fontSize = "4vh";
    sum_all.style.fontWeight = "500";
    container.appendChild(sum_all);

    container.appendChild(div_buttons_shopping);
}
const out_json = () => {
    $.ajax({
        url: './attractions.json',
        success: (_data) => {
            func_create_shopping(_data);;
        }
    });
};
out_json();