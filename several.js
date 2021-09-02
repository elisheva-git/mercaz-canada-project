const btn_shop_up = document.querySelector('.btn_shop_in');
btn_shop_up.onclick = () => {
    location.href = '/shopping.html';
}

const img_header = document.querySelector('.img_pingwin');
img_header.onclick = () => {
    location.href = '/homepage.html';
}

const adTimer = () => {//פונקציה של הפרסומת שתופיע כמה שניות לאחר שפתח את האתר
    const intervalId = setTimeout(() => {
        if (sessionStorage["ad"] != "true") {
            const div_background_ad = document.createElement('div');
            const div_sale = document.createElement('div');
            const btn_ad = document.createElement('button');
            btn_ad.innerHTML = "x";
            btn_ad.classList.add('btn_ad');
            div_sale.classList.add('div_ad');
            div_sale.appendChild(btn_ad);
            div_background_ad.appendChild(div_sale);
            div_background_ad.classList.add('background_ad');
            const container = document.querySelector('body');
            container.appendChild(div_background_ad);
            let click_x=false;
            btn_ad.onclick = () => {
                div_background_ad.remove();
                click_x=true;
            }
            div_sale.onclick = () => {
                if(click_x===false)
                    location.href = '/attraction.html?atrac=swimming_pool';
            }
            sessionStorage["ad"] = true;
        }
    }, 3000);
    return intervalId;
}
adTimer();

const header = document.querySelector('#head');
const link_attraction = document.querySelector('.link_atrac');

const func_atrac_list = (data) => {//פונקציה ליצירת רשימת לינקים של אטרקציות שמרחפים על לינק אטרקציות
    var ul_atraction = document.createElement('div');
    ul_atraction.classList.add('ul_attraction');
    ul_atraction.style.display="none";
    const arr_li = Object.entries(data);
    arr_li.forEach(li_a => {
        const li_atrac = document.createElement('a');
        li_atrac.innerHTML = li_a[1];
        li_atrac.classList.add('li_atrac');
        ul_atraction.appendChild(li_atrac);
        const url = new URL('/attraction.html', location.href);
        url.searchParams.set('atrac', li_a[0]);
        li_atrac.href = url;
    });
    link_attraction.appendChild(ul_atraction);
    link_attraction.onmouseenter = () => {
        ul_atraction.style.display = "flex";
    }
    ul_atraction.onmouseenter = () => {
        ul_atraction.style.display = "flex";
    }
    link_attraction.onmouseleave = () => {
        ul_atraction.style.display = "none";
    }
    ul_atraction.onmouseleave = () => {
        ul_atraction.style.display = "none";
    }
}

const input_search=document.querySelector('.input_search');
let ul_search=document.querySelector('.ul_search');
var flag_found_search=false;
const func_create_search=(_data)=>{//פונקציה לחיפוש
    const arr_ul_atrac = Object.entries(_data);
    const func_change_input=()=>{
        while (ul_search.hasChildNodes()) {//לולאה להסרת כל הלינקים הקודמים  
            ul_search.removeChild(ul_search.firstChild);
        }
        ul_search=document.querySelector('.ul_search');
        const val_press=input_search.value;//משתנה ששומר את הערך באיפוט אחרי הקשה במקלדת
        if(val_press.length!=0){
            flag_found_search=false;
            arr_ul_atrac.forEach(atrac =>{
                if(atrac[1].slice(0,val_press.length)===val_press){
                    const li_atrac_a=document.createElement('a');
                    li_atrac_a.innerHTML=atrac[1];
                    li_atrac_a.classList.add('li_atrac_a');
                    const url = new URL('/attraction.html', location.href);
                    url.searchParams.set('atrac', atrac[0]);
                    li_atrac_a.href = url;
                    ul_search.appendChild(li_atrac_a);
                    flag_found_search=true;
                }
            })
            console.log(flag_found_search);
            if(flag_found_search===false){
                const li_atrac_a=document.createElement('span');
                li_atrac_a.innerHTML="לא נמצאו תוצאות";
                li_atrac_a.classList.add('li_atrac_a');
                ul_search.appendChild(li_atrac_a);
            }
        }
    }
    input_search.onkeyup =()=>{//קריאה לפונקציה בעת לחיצה במקלדת
        flag_found_search=false;
        func_change_input();  
    }
    input_search.onchange =()=>{//קריאה לפונקציה בעת שנוי הערך בפקד אינפוט
        flag_found_search=false;
        func_change_input();
    }
}

const json_atrac_list = () => {//שליפה של התמונות של עמוד הבית
    $.ajax({
        url: './attractions.json',
        success: (_data) => {
            func_atrac_list(_data["names_atraction"]);
            func_create_search(_data["names_atraction"]);
        }
    });
};
json_atrac_list();