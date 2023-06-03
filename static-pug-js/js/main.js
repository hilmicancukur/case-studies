const itemAlertSuccess = `
    <div class="alert alert--success" id="js-alert">
        <div class="alert__content">
            <div class="alert__icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" class="svg-inline--fa fa-check fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>
            </div>
            <div class="alert__description">Başarıyla Gönderildi. Size En Kısa Sürede Dönüş Yapacağız.</div>
            <button class="alert__btn-close" type="button" onclick="closeAlert()">OK</button>
        </div>
    </div>
`;
const itemAlertDanger = `
    <div class="alert alert--danger" id="js-alert">
        <div class="alert__content">
            <div class="alert__icon">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" class="svg-inline--fa fa-times fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
            </div>
            <div class="alert__description">Lütfen formu uygun şekilde doldurunuz.</div>
            <button class="alert__btn-close" type="button" onclick="closeAlert()">OK</button>
        </div>
    </div>
`;

const loadMembers = (page=1) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://reqres.in/api/users?page=${page}`, true);

    xhr.onload = function () {
        if(this.status === 200) {
            const response = JSON.parse(this.responseText);
            const members = response.data;
            const total_pages = response.total_pages;
            const current_page = response.page;

            let members_output = '<div class="grid-cards">';
            members.forEach(member => {
                var name = member.first_name + ' ' + member.last_name;
                var description = member.email;
                var image = member.avatar;
                var id = member.id;
                members_output += 
                    `
                    <div class="card">
                        <img class="card__image" src="${image}" title="${name}">
                        <div class="card__title">${name}</div>
                        <div class="card__description">${description}</div>
                        <div class="card__footer"><a class="btn btn--secondary" href="member.html?m=${id}">Review</a></div>
                    </div>
                    `
            });
            members_output += '</div>';
            document.querySelector("#js-members").innerHTML = members_output;

            let pagination_output = '<ul class="pagination">';
            if(current_page > 1){
                pagination_output += `
                    <li>
                        <button class="pagination__link" type="button" onclick="loadMembers(${current_page - 1})">
                            <figure class="icon__wrapper icon__chevron-left">
                                <svg class="icon">
                                    <use xlink:href="#icon-chevron-left"></use>
                                </svg>
                            </figure>
                        </button>
                    </li>
                `;
            }
            for (let page = 1; page <= total_pages; page++) {
                if (page == current_page) {
                    pagination_output += 
                        `<li><button class="pagination__link active" type="button">${page}</button></li>`
                }else{
                    pagination_output += 
                        `<li><button class="pagination__link" type="button" onclick="loadMembers(${page})">${page}</button></li>`
                }
            }
            if(current_page < total_pages){
                pagination_output += `
                    <li>
                        <button class="pagination__link" type="button" onclick="loadMembers(${current_page + 1})">
                            <figure class="icon__wrapper icon__chevron-right">
                                <svg class="icon">
                                    <use xlink:href="#icon-chevron-right"></use>
                                </svg>
                            </figure>
                        </button>
                    </li>
                `;
            }
            pagination_output += '</ul>';
            document.querySelector("#js-pagination").innerHTML = pagination_output;
            
        }
    }
    xhr.send();
}
if(document.querySelector("#js-members")){
    loadMembers();
}

const loadMember = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://reqres.in/api/users/${id}`, true);

    xhr.onload = function () {
        if(this.status === 200) {
            const response = JSON.parse(this.responseText);
            const member = response.data;

            let member_output = '';
            var name = member.first_name + ' ' + member.last_name;
            var description = member.email;
            var image = member.avatar;
            member_output += 
                `
                <div class="card">
                    <img class="card__image" src="${image}" title="${name}">
                    <div class="card__title">${name}</div>
                    <div class="card__description">${description}</div>
                    <div class="card__footer"><button class="btn btn--secondary" onclick="history.back()">Back</button></div>
                </div>
                `
            document.querySelector("#js-member").innerHTML = member_output;
        }
    }
    xhr.send();
}
const params = new URLSearchParams(window.location.search);
const param_member = params.get("m");
if(param_member){
    loadMember(param_member);
}

if (document.querySelector("#js-create-form")) {
    const createForm = document.querySelector("#js-create-form");
    createForm.onsubmit = async (e) => {
        e.preventDefault();
        let datas = { 
            name: document.querySelector("input[name='name']").value, 
            job: document.querySelector("input[name='job']").value
        }
        let response = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datas)
        });
        let result = await response.json();
        let status = response.status;
        console.log(result,status);
        if (status == 201) {
            document.querySelector("#js-alert-wrapper").innerHTML = itemAlertSuccess;
        }else{
            document.querySelector("#js-alert-wrapper").innerHTML = itemAlertDanger;
        }
    };
}

const closeAlert = () => {
    const alert = document.querySelector("#js-alert");
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 150);
}