//tarix checkbox-unun seçildiyi halda tarix seçimini aktiv hala gətirir
document.getElementById("checkdate").addEventListener("change", function () {
    var datepicker = document.getElementById("datepicker");
    datepicker.disabled = !this.checked;
});

//formun dəyərlərini sıfırlayır
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
});

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();

    //formdan gələn məlumatların alnması
    var leaderNameValue = document.getElementById("leader-name").value;
    var leaderNumberValue = document.getElementById("leader-number").value;
    var musnomValue = document.getElementById("musnom").value;

    //müştərilərin nömrələrini boşluqlara görə ayırır
    var numbers = musnomValue.split(/\s+/);

    //checkbox və date məlumatlarının alınması
    var checkbox = document.getElementById("checkdate");
    var datepicker = document.getElementById("datepicker");

    //tarix dəyərini checkbox seçilidirsə formdan, deyilsə bu günün tarixini qeyd edir
    var thedate = checkbox.checked ? datepicker.value : getCurrentDate();

    //forma yazılan hər nömrə üçün nömrə göndərilməsi əməliyyatının təkrar olunması
    if (numbers && numbers.length > 0) {
        //nəticələrin görünəcəyi container
        var iframeContainer = document.getElementById("iframeContainer");
        var messageContainer = document.getElementById("messageContainer");

        //konteynerlərin təmizlənməsi
        messageContainer.innerHTML = '';
        iframeContainer.innerHTML = '';

        //ƏSAS!

        //hər bir nömrə üçün ayrı bir iframe yaradılır və nömrə hesabata göndərilir
        numbers.forEach(function (number) {
            if (/^\d{12}$/.test(number)) {
                var iframe = document.createElement('iframe');
                iframe.src = 'https://docs.google.com/forms/d/e/1FAIpQLSeddupztOzx5j51UJOqtOHzJ1AnI5f0ggTM3Jf-K_aJCub-ow/formResponse?usp=pp_url&entry.1984184271=' + thedate + '&entry.1202641751=' + leaderNameValue + '&entry.1291774621=' + leaderNumberValue + '&entry.1599625594=' + number + '&entry.585016444=__other_option__&entry.585016444.other_option_response=' + leaderNameValue;
                iframe.width = '100%';
                iframe.height = '40px';

                //nəticə uğurlu olarsa
                iframe.onload = function () {
                    iframe.classList.add('success');
                    messageContainer.innerHTML += '<p class="success">Göndərildi: ' + number + '</p>';
                };

                //nəticə uğursuz olarsa
                iframe.onerror = function () {
                    iframe.classList.add('error');
                    messageContainer.innerHTML += '<p class="error">Value Error: ' + number + '</p>';
                };

                //iframe containerə əlavə edilir
                iframeContainer.appendChild(iframe);
            } else {
                //nömrə formata uyğun deyilsə xəta mesajı görünür
                messageContainer.innerHTML += '<p class="error">Format xətası: ' + number + '</p>';
            }
        });
    } else {
        //nömrə boş olarsa və ya xətalıdısa xəta mesajı göstərilir
        alert("Zəhmət olmasa nömrələri doğru daxil etdiyinizdən əmin olun. Nümunə: 994708145414");
    }
});

//mövcud tarixi iiii-aa-gg olaraq götürür
function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

//menyunu açmaq və bağlamaq üçün gərəkli elementlərə funksiyalar təyin edilir
document.addEventListener('DOMContentLoaded', function () {
    var menuButton = document.querySelector('.menu');
    var menuContent = document.querySelector('.menu-content');
    var menuCloser = document.querySelector('.menu-closer');
    var menuCloserSvg = document.querySelector('.menu-closer-svg');
    var menuCloserBtn = document.querySelector('.sml-line');

    function showMenu() {
        menuContent.style.display = 'flex';
        menuCloser.style.display = 'block';
    }

    function hideMenu() {
        menuContent.style.display = 'none';
        menuCloser.style.display = 'none';
    }

    menuButton.addEventListener('click', showMenu);
    menuCloser.addEventListener('click', hideMenu);
    menuCloserSvg.addEventListener('click', hideMenu);
    menuCloserBtn.addEventListener('click', hideMenu);
});

