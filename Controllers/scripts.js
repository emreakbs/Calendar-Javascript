$(document).ready(function () {

    databaseOpen();
    notesCreateTable();
    let tarih = new Date();
    let simdikiAyIndis = tarih.getMonth();
    let simdikiYil = tarih.getFullYear();
    let gunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
    let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    Cookies.set('ay', simdikiAyIndis);
    Cookies.set('yil', simdikiYil);
    //takvim başında hangi ayda ve yılda olduğumuzu belirten butonlara değer atar.
    $('#ayBilgisi').val(aylar[simdikiAyIndis]);
    $('#yilBilgisi').val(simdikiYil);

    // gunBul(simdikiAyIndis, simdikiYil);
    takvimGoruntule(simdikiAyIndis, simdikiYil)

    //önceki ayı görüntülemeye yarar.
    $("#oncekiAy").click(function () {
        simdikiAyIndis = simdikiAyIndis - 1;
        //eğer ay 0 a yani ocağa geldiyse aralığa ulaşabilmek için indis numarası 11 tanımlanır.
        if (simdikiAyIndis < 0) {
            simdikiAyIndis = 11;
            simdikiYil -= 1;
        }
        $('#ayBilgisi').val(aylar[simdikiAyIndis]);
        $('#yilBilgisi').val(simdikiYil);
        Cookies.set('ay', simdikiAyIndis);
        Cookies.set('yil', simdikiYil);
        takvimGoruntule(simdikiAyIndis, simdikiYil)

    });

    //sonraki ayı görüntülemeye yarar.
    $("#sonrakiAy").click(function () {
        simdikiAyIndis = simdikiAyIndis + 1; //şimdiki ayın değerini 1 arttırır.
        //eğer aralığa geldiğimizde indis değeri 11 döner. 12 ye geldiyse ocağa çekmeye yarar.
        if (simdikiAyIndis > 11) {
            simdikiAyIndis = 0;
            simdikiYil += 1;
        }
        $('#ayBilgisi').val(aylar[simdikiAyIndis]);
        $('#yilBilgisi').val(simdikiYil);
        Cookies.set('ay', simdikiAyIndis);
        Cookies.set('yil', simdikiYil);
        takvimGoruntule(simdikiAyIndis, simdikiYil)

    });
    //önceki yılı görüntülemeye yarar.
    $("#oncekiYil").click(function () {
        simdikiYil -= 1;
        $('#yilBilgisi').val(simdikiYil);
        Cookies.set('yil', simdikiYil);
        takvimGoruntule(simdikiAyIndis, simdikiYil)
    });

    // sonraki yılı görüntülemeye yarar
    $("#sonrakiYil").click(function () {
        simdikiYil += 1;
        $('#yilBilgisi').val(simdikiYil);
        Cookies.set('yil', simdikiYil);
        takvimGoruntule(simdikiAyIndis, simdikiYil)
    });


    function takvimGoruntule(ay, yil) {
        gunBul(ay, yil);
        Cookies.set('ay', ay);
        Cookies.set('yil', yil);
        let baslangincGunu = (new Date(yil, ay)).getDay();
        let ayUzunlugu = new Date(yil, ay + 1, 0).getDate(); // 0 önceki ayın son gününü almaya yarar. o yüzden ay parametresine  1 ekleriz ki istenilen ayın uzunluğunu bulabilelim.
        let oncekiAyUzunlugu = new Date(yil, ay, 0).getDate()
        let sonrakiAyUzunlugu = new Date(yil, ay + 2, 0).getDate()
        let prevFark = baslangincGunu - 2;
        let nextFark = 1;

        console.log(oncekiAyUzunlugu, ayUzunlugu, sonrakiAyUzunlugu)
        //pazartesiden başlatmak için kullanılır. pazar gününe gelice günler arrayinin 6. indisini almasını sağlar.
        if (baslangincGunu == 0) //eğer başlangıç günü pazar ise günler dizisinin 6. indisine yönlenmesi için 7 ye aktarılır.
            baslangincGunu = 7; //yerelleştirmek amacıyla başlangıç gününden 1 çıkarttığımız için 7. indise e gönderiyoruz.
        console.log(ay, " , " + aylar[ay] + ": uzunluğu= ", ayUzunlugu, " , başlangıç günü= ", gunler[baslangincGunu - 1], " , Yıl= " + yil);

        let takvimBody = document.getElementById("takvim-body");
        takvimBody.innerHTML = ""; //ay değiştiğinde body nin üzerine eklemesin diye boşalttık.

        let gunSayac = 1; //ayın son elemanına kadar eklemeyi kontrol etmek için tanımlandı.
        for (let i = 0; i < 6; i++) { //
            let satir = document.createElement("tr");
            for (let j = 0; j < 7; j++) {
                //eklenen gün sayısı ay uzunluğunu geçmemesi kontrolü
                if (gunSayac > ayUzunlugu) {
                    let sutun = document.createElement("td");
                    sutun.setAttribute("class", "artikGun");
                    sutun.style.backgroundColor = "#fadcdc";
                    let sutunText = document.createTextNode(nextFark);
                    sutun.appendChild(sutunText);
                    satir.appendChild(sutun);
                    nextFark++;
                }
                //ilk satırda başlangıç gününden öncesinde boşluk bırakma kontrolünü yapar.
                //baslangicgunu-1 diyerek hafta başlangıcı yerelleştirmiş oluruz.
                else if (i === 0 && j < baslangincGunu - 1) {
                    if (prevFark < 0)
                        prevFark = 5;
                    let sutun = document.createElement("td");
                    sutun.setAttribute("class", "artikGun");
                    let sutunText = document.createTextNode(oncekiAyUzunlugu - prevFark);
                    sutun.style.backgroundColor = "#fadcdc";
                    sutun.appendChild(sutunText);
                    satir.appendChild(sutun);
                    prevFark--;
                }
                //başlangıç gününe geldiyse günlerin tabloya eklenmesinin kontrolü
                else {

                    let sutun = document.createElement("td");
                    sutun.setAttribute("class", "sutun");
                    sutun.setAttribute("id", "sutun" + gunSayac);
                    let sutunText = document.createTextNode(gunSayac);
                    //gün ay ve yılın bugüne eşitliğini kontrol eder.
                    if (gunSayac === tarih.getDate() && ay === tarih.getMonth() && yil === tarih.getFullYear()) {

                        //eğer eşit ise arka plan rengini açık gri yapar
                        sutun.style.backgroundColor = "#d3d3d3";
                        sutun.style.fontWeight = "bold";
                    }
                    sutun.appendChild(sutunText);
                    satir.appendChild(sutun);
                    //tüm işlemler bittikten sonra bir sonraki gün için tüm kontrolleri tekrar tetiklemesi için sayaç arttırılır.
                    gunSayac++;
                }
            }
            takvimBody.appendChild(satir);
        }
    }

    $(document).on('click', '.sutun', function () {
        Cookies.set('gun', this.innerHTML)
        $('#containerInsert').fadeToggle();
    });

    $(document).mouseup(function (e) {
        var containerInsert = $("#containerInsert");
        var containerMonth = $('#contactListMonth');
        var containerYear = $('#contactListYear');
        var containerFullYear = $('#contactListFullYear');

        if (!containerInsert.is(e.target) && containerInsert.has(e.target).length === 0 && !containerMonth.is(e.target) && containerMonth.has(e.target).length === 0 &&
            !containerYear.is(e.target) && containerYear.has(e.target).length === 0 && !containerFullYear.is(e.target) && containerFullYear.has(e.target).length === 0) // ... nor a descendant of the container
        {
            containerInsert.fadeOut();
            containerMonth.fadeOut();
            containerYear.fadeOut();
            containerFullYear.fadeOut();
        }
    });

})