(()=>{const n={name:"name",email:"email",phone:"phone",password:"password",passwordAccept:"password-accept",INN:"INN",KPP:"KPP",OGRN:"OGRN",subscribe:"subscribe",nameOrganization:"nameOrganization",privacy:"privacy",legalForm:"legal-form",address:"address",contactPerson:"contact-person"},o={ERROR_REQUIRED:"Обязательное поле",ERROR_EMAIL:"Введите корректный email",ERROR_PHONE:"Заполните телефон полностью",ERROR_PASSWORD_ACCEPT:"Пароли не совпадают",ERROR_MIN_LENGTH:e=>`Поле должно содержать не менее ${e} символов`,ERROR_MAX_LENGTH:e=>`Поле должно содержать не более ${e} символов`,ERROR_MIN_LENGTH_DATA:(e,t)=>`${t} должно состоять из ${e} символов`},l={[n.name]:{valueMissing:o.ERROR_REQUIRED},[n.email]:{valueMissing:o.ERROR_REQUIRED,typeMismatch:o.ERROR_EMAIL,customError:o.ERROR_EMAIL},[n.phone]:{valueMissing:o.ERROR_REQUIRED,customError:o.ERROR_PHONE},[n.password]:{valueMissing:o.ERROR_REQUIRED,tooShort:o.ERROR_MIN_LENGTH(6)},[n.INN]:{valueMissing:o.ERROR_REQUIRED,tooShort:o.ERROR_MIN_LENGTH(10),tooLong:o.ERROR_MAX_LENGTH(12)},[n.KPP]:{valueMissing:o.ERROR_REQUIRED,tooShort:o.ERROR_MIN_LENGTH_DATA(9,"КПП")},[n.OGRN]:{valueMissing:o.ERROR_REQUIRED,tooShort:o.ERROR_MIN_LENGTH_DATA(13,"ОГРН")},[n.nameOrganization]:{valueMissing:o.ERROR_REQUIRED},[n.passwordAccept]:{valueMissing:o.ERROR_REQUIRED,customError:o.ERROR_PASSWORD_ACCEPT,tooShort:o.ERROR_MIN_LENGTH(6)},[n.address]:{valueMissing:o.ERROR_REQUIRED},[n.contactPerson]:{valueMissing:o.ERROR_REQUIRED}};document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll(".js-form");e==null||e.forEach(t=>p(t)),m(),E(),d(),u()});function u(){const e=document.querySelectorAll(".form-input input"),t=document.querySelectorAll(".form-textarea textarea");e.forEach(s=>{s.addEventListener("input",()=>c(s))}),t.forEach(s=>{s.addEventListener("input",()=>c(s))})}function d(){var s;const e=document.querySelector(".js-password-display"),t=(s=e==null?void 0:e.closest(".form-input"))==null?void 0:s.querySelector("input");e==null||e.addEventListener("click",()=>{e.classList.toggle("show-pass");const a=e.classList.contains("show-pass")?"text":"password";t.setAttribute("type",a)})}function E(){const e=document.querySelector(`input[name=${n.phone}]`),t=document.querySelector(`input[name=${n.KPP}]`),s=document.querySelector(`input[name=${n.OGRN}]`);e&&IMask(e,{mask:"+7(000)000-00-00",prepare:(a,r)=>!r.value&&a==="8"?"+7":a}),t&&IMask(t,{mask:"000000000"}),s&&IMask(s,{mask:/^[15]\d{0,12}$/})}function m(){const e=document.querySelectorAll(".form-input input"),t=document.querySelectorAll(".form-textarea textarea");e.forEach(s=>R(s,".form-input")),t.forEach(s=>R(s,".form-textarea"))}function R(e,t){e.addEventListener("change",()=>{e.closest(t).classList.toggle("fill",e.value.length)})}function p(e){e.addEventListener("submit",t=>{t.preventDefault(),v(e),e.checkValidity()?(e.classList.contains("js-recovery")&&O(!0,"Инструкции по восстановлению пароля отправлены на Ваш e-mail"),console.log("send"),e.querySelector("[type=submit]").setAttribute("disabled","disabled")):(e.classList.add("was-validated"),f(e))},!1)}function f(e){const t=e.querySelector("input:invalid"),s=t==null?void 0:t.getBoundingClientRect().top;scrollBy({top:s-100,behavior:"smooth"})}function v(e){for(const t of e.elements)c(t)}function c(e){const t=e.getAttribute("name");Object.keys(l).includes(t)&&(g(e,t),Object.keys(ValidityState.prototype).forEach(a=>{if(e.validity[a]){const r=e.closest(e.tagName==="TEXTAREA"?".form-textarea":".form-input");r.querySelector(".invalid-feedback")||r.insertAdjacentHTML("beforeend",'<div class="invalid-feedback"></div>');const i=r.querySelector(".invalid-feedback");i.textContent=l[e.name][a]}}))}function g(e,t){if(t===n.phone){const s=!e.validity.valueMissing&&e.value.length<16;e.setCustomValidity(s?"Incorrect phone":"")}else if(t===n.email){const s=!e.validity.valueMissing&&!e.value.includes(".");e.setCustomValidity(s?"Incorrect email":"")}else if(t===n.passwordAccept){const s=document.querySelector(`input[name=${n.password}]`),a=!e.validity.valueMissing&&e.value!==s.value;e.setCustomValidity(a?"Incorrect email":"")}}function O(e,t=""){const r=e?t||"Данные успешно отправлены":"Произошла ошибка передачи данных.<br> Пожалуйста поробуйте еще раз!";new Fancybox([{src:`<p>${r}</p><button class="popup-close"></button>`,type:"html"}],{mainClass:"send-message",closeButton:!1,dragToClose:!1,on:{done:i=>{_(i)}}})}function _(e){document.querySelector(".popup-close").addEventListener("click",()=>{e.close(),document.querySelectorAll("[type=submit]").forEach(a=>a.removeAttribute("disabled"))})}})();
