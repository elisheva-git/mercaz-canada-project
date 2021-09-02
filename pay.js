const form = document.paying;


form.phone.onchange = () => {//כשמקלידים מספר טלפון אם כבר נרשם בעבר מספר זה מושלם אוטומטית הפרטים
    if (localStorage[form.phone.value] != null) {
        const obj_details = JSON.parse(localStorage[form.phone.value]);
        const arr_obj_details = Object.entries(obj_details);
        const arr_input = document.querySelectorAll('input');
        let index = 1;
        arr_obj_details.forEach((item) => {
            arr_input[index++].value = item[1];
        })
    }
}

const numbers = document.querySelectorAll('.num');
numbers.forEach(num => {//בדיקת תקינות להכנסת מספרים
    num.onkeypress = function (event) {
        console.log(num);
        const code = event.keyCode;
        if (code < '0'.charCodeAt(0) || code > '9'.charCodeAt(0)) {
            event.preventDefault();
        }
        if (num.name === "attacker_year" && form.attacker_year.value.length >= 2) {
            event.preventDefault();
        }
        if (num.name === "attacker_month" && form.attacker_month.value.length >= 2) {
            event.preventDefault();
        }
        if (num.name === "cvv" && form.cvv.value.length >= 3) {
            event.preventDefault();
        }
        if (num.name === "card_number_1" && form.card_number_1.value.length >= 4) {
            event.preventDefault();
        }
        if (num.name === "card_number_2" && form.card_number_2.value.length >= 4) {
            event.preventDefault();
        }if (num.name === "card_number_3" && form.card_number_3.value.length >= 4) {
            event.preventDefault();
        }if (num.name === "card_number_4" && form.card_number_4.value.length >= 4) {
            event.preventDefault();
        }
    }
})

const names = document.querySelectorAll('.name');

names.forEach(name => {//בדיקת תקינות להכנסת אותיות
    name.onkeypress = function (event) {
        const lett = event.keyCode;
        if ((lett < 'a'.charCodeAt(0) && lett != ' '.charCodeAt(0) && lett != '"'.charCodeAt(0) && lett != '-'.charCodeAt(0)) ||
            (lett > 'z'.charCodeAt(0) && lett != ' '.charCodeAt(0) && lett != '"'.charCodeAt(0) && lett != '-'.charCodeAt(0)) &&
            (lett < 'א'.charCodeAt(0) && lett != ' '.charCodeAt(0) && lett != '"'.charCodeAt(0) && lett != '-'.charCodeAt(0)) ||
            (lett > 'ת'.charCodeAt(0) && lett != ' '.charCodeAt(0) && lett != '"'.charCodeAt(0) && lett != '-'.charCodeAt(0))) {
            event.preventDefault();
        }
    }
})
const func_end_shopping = (data) => {
    form.onsubmit = (event) => {//בעת לחיצה על כפתור של סיום התשלום
        event.preventDefault();
        let right_phone = false, right_email = false, right_card = false, right_attacker = false, right_cvv = false;
        let count_right = 0;
        const error_card = document.querySelector('.card');
        // const error_e_mail=document.querySelector('.e-mail');
        const error_phone = document.querySelector('.phone');
        const error_attacker = document.querySelector('.attacker');
        const error_cvv = document.querySelector('.cvv');
        const _cards = document.querySelectorAll('.c');
        const card_no = document.querySelector('.c_no');
        //בדיקות תקינות
        if (form.phone.value.length >= 9 && form.phone.value.length <= 10) {
            right_phone = true;
            error_phone.classList.add('hidden');
        }
        else {
            error_phone.classList.remove('hidden');
            right_phone = false;
        }
        let count_right_card = 0;
        _cards.forEach(card => {
            if (card.value.length === 4)
                count_right_card++;
        })
        if (count_right_card === 4 || (card_no.value.length === 0 && count_right_card === 3)) {
            error_card.classList.add('hidden');
            right_card = true;
        }
        else {
            error_card.classList.remove('hidden');
            right_card = false;
        }
        const date_today = new Date();
        if (form.attacker_month.value > 12 || form.attacker_month.value < 1 || form.attacker_year.value < (date_today.getFullYear()) % 100) {
            error_attacker.classList.remove('hidden');
            right_attacker = false;
        }
        else {
            if (parseInt(form.attacker_year.value) === (date_today.getFullYear()) % 100) {
                if (form.attacker_month.value < date_today.getMonth()) {
                    error_attacker.classList.remove('hidden');
                    right_attacker = false;
                }
                else {
                    error_attacker.classList.add('hidden');
                    right_attacker = true;
                }
            }
            else {
                error_attacker.classList.add('hidden');
                right_attacker = true;
            }
        }
        if (form.cvv.value.length != 3) {
            error_cvv.classList.remove('hidden');
            right_cvv = false;
        }
        else {
            error_cvv.classList.add('hidden');
            right_cvv = true;
        }
        const input_pay = document.querySelectorAll('.must');
        input_pay.forEach(function (inp, index) {//בדיקה שכל השדות חובה מלאים(אם לא הוא לא נותן לשלוח)
            if (input_pay[index].value === "" && input_pay[index].classList[0] === "must") {
                console.log(input_pay[index]);
                input_pay[index].classList.add('input_pay');
            }
            else {
                count_right++;
                input_pay[index].classList.remove('input_pay');
            }
        });

        // יצירת החשבונית
        if (count_right === 9 && right_phone === true && right_card === true && right_attacker === true && right_cvv === true) {
            form.onsubmit = (event) => {
                event.preventDefault();
            }
            let sum = 0;
            const div_bill = document.createElement('div');
            div_bill.classList.add('bill');
            div_bill.id="bill";
            const span_name = document.createElement('span');
            span_name.innerHTML = `שלום ${form.first_name.value} ${form.last_name.value}`;
            span_name.style.textAlign = "center";
            span_name.style.fontSize = "22px";
            span_name.style.fontWeight = "500";
            div_bill.appendChild(span_name);
            const span_bill = document.createElement('span');
            span_bill.innerHTML = "פרטי ההזמנה:";
            div_bill.appendChild(span_bill);
            let obj_details_shopping = JSON.parse(localStorage["cards"]);
            let arr_details_shopping = Object.entries(obj_details_shopping);
            const div_attraction = document.createElement('div');
            arr_details_shopping.forEach(item => {
                const div_atrac = document.createElement('div');
                div_atrac.classList.add('div_atrac_bill');
                const name_atrac = document.createElement('span');
                name_atrac.innerHTML = `${data[item[0]].title}`;
                const count_atrac = document.createElement('span');
                count_atrac.innerHTML = `כמות כרטיסים: ${item[1]}`;
                const final_price_atrac = document.createElement('span');
                final_price_atrac.innerHTML = `סה"כ: ${item[1] * data[item[0]].price} <i class="fas fa-shekel-sign shekel"></i>`;
                // final_price_atrac.style.position = "absolute";
                // final_price_atrac.style.right = "44vw";
                sum += item[1] * data[item[0]].price;
                div_atrac.appendChild(name_atrac);
                div_atrac.appendChild(count_atrac);
                div_atrac.appendChild(final_price_atrac);
                div_attraction.appendChild(div_atrac);
            })
            div_attraction.classList.add('div_attraction');
            div_bill.appendChild(div_attraction);
            const span_sum_all = document.createElement('span');
            span_sum_all.innerHTML = `סך הכל לתשלום: ${sum} <i class="fas fa-shekel-sign shekel"></i>`;
            span_sum_all.style.fontSize = "24px";
            span_sum_all.style.fontWeight = "500";
            span_sum_all.style.textAlign = "left";
            div_bill.appendChild(span_sum_all);

            // הוספה לעמוד 
            const container = document.querySelector('#container');
            container.appendChild(div_bill);

            // מחיקה מהלוקל
            obj_details_shopping = {};
            localStorage["cards"] = JSON.stringify(obj_details_shopping);
            const formData = new FormData(event.target);
            const entries = Array.from(formData.entries())
            const obj_user_details = Object.fromEntries(entries);
            localStorage[form.phone.value] = JSON.stringify(obj_user_details);
        }
        location.href='#bill';
    }
}

const pay_json = () => {
    $.ajax({
        url: './attractions.json',
        success: (_data) => {
            func_end_shopping(_data);;
        }
    });
};
pay_json();
