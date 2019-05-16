function databaseOpen() {
     var veriTabani_ad = 'Calendar';
     var veriTabani_version = '1.0';
     var veriTabani_tanim = 'WebSql Veri Tabanı';
     var veriTabani_boyut = 10 * 1024 * 1024;
     this.veritabani = window.openDatabase(veriTabani_ad, veriTabani_version, veriTabani_tanim, veriTabani_boyut);
}

var notesCreateTable = () => {
     CalendarService._notesCreateTable().then(fullfilled => {
          console.log(fullfilled);
     }).catch((rejected) => {
          console.log(rejected);
     })
}

var noteInsert = () => {
     var simdikiAyIndis = Cookies.get('ay');
     var simdikiYil = Cookies.get('yil');
     var gun = Cookies.get('gun');
     var text = $('#noteText').val();
     CalendarService._noteInsert(gun, simdikiAyIndis, simdikiYil, text).then(fullfilled => {
          console.log("oluşturulan hayıt: ", fullfilled);
          $('#noteText').val("");
          noteMonthList();
          var gun = Cookies.get('gun');
          $('#sutun' + gun).css("background-color", "#dbc27e");

          // $(document).ready(takvimGoruntule(simdikiAyIndis, simdikiYil));
          // $(document).takvimGoruntule(simdikiAyIndis, simdikiYil);
     }).catch(rejected => {
          console.log(rejected);
     })
}


var noteMonthList = () => {
     $("#contactListMonth").html("");
     var simdikiAyIndis = Cookies.get('ay');
     var simdikiYil = Cookies.get('yil');
     let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
     CalendarService._noteMonthtList(simdikiAyIndis, simdikiYil).then(fullfilled => {
          console.log("Kayıtlar listeleniyor:")
          console.log(fullfilled.rows);
          jQuery.each(fullfilled.rows, function (_index, value) {
               var kayit = "";
               kayit += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
               kayit += '<tr><td colspan="5"><input type="text" class="txt_noteUpdate" id="txt_noteUpdate' + value.noteId + '"></td> ' +
                    '<td colspan="2"><button id="btn_noteTxtUpdate' + value.noteId + '" class = "btn_noteTxtUpdate" onclick="noteUpdate(' + value.noteId + ')" > Kaydet</button>' +
                    '<button id="btn_noteCancel' + value.noteId + '" class = "btn_noteCancel" onclick="noteCancel(' + value.noteId + ')" > Vazgeç</button></td></tr>'
               kayit += '<tr><td colspan="2">' + value.day + " " + aylar[value.monthIndis] + " " + value.year + '</td><td colspan ="3"><b>' + value.text + '</b></td>  <td colspan ="2"><button class="btn_noteListDelete" onclick="noteDelete(' + value.noteId + "," + value.day + ');" > Sil</button>' +
                    '<button id="btn_noteUpdate' + value.noteId + '" class="btn_noteListUpdate" onclick="noteUpdateTxtSearch(' + value.noteId + ')" > Düzenle</button></td></tr> ';
               $("#contactListMonth").append(kayit);
          });

          $('.txt_noteUpdate').hide();
          $('.btn_noteTxtUpdate').hide();
          $('.btn_noteCancel').hide();

          $("#containerInsert").fadeOut();
          $('#contactListMonth').fadeToggle();

     }).catch(rejected => {
          console.log("Kayıt Yok.")
          console.log("Hata: ", rejected);
     })
}

var noteYearList = () => {
     $("#contactListYear").html("");
     var simdikiYil = Cookies.get('yil');

     let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
     CalendarService._noteYearList(simdikiYil).then(fullfilled => {
          console.log("Kayıtlar listeleniyor:")
          console.log(fullfilled.rows);
          jQuery.each(fullfilled.rows, function (_index, value) {
               var kayit = "";
               kayit += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
               kayit += '<tr><td colspan="5"><input type="text" class="txt_noteUpdate" id="txt_noteUpdate' + value.noteId + '"></td> ' +
                    '<td colspan="2"><button id="btn_noteTxtUpdate' + value.noteId + '" class = "btn_noteTxtUpdate" onclick="noteUpdate(' + value.noteId + ')" > Kaydet</button>' +
                    '<button id="btn_noteCancel' + value.noteId + '" class = "btn_noteCancel" onclick="noteCancel(' + value.noteId + ')" > Vazgeç</button></td></tr>'
               kayit += '<tr><td colspan="2">' + value.day + " " + aylar[value.monthIndis] + " " + value.year + '</td><td colspan ="3"><b>' + value.text + '</b></td>  <td colspan ="2"><button class="btn_noteListDelete" onclick="noteDelete(' + value.noteId + "," + value.day + ');" > Sil</button>' +
                    '<button id="btn_noteUpdate' + value.noteId + '" class="btn_noteListUpdate" onclick="noteUpdateTxtSearch(' + value.noteId + ')" > Düzenle</button></td></tr> ';
               $("#contactListYear").append(kayit);
          });
          $('.txt_noteUpdate').hide();
          $('.btn_noteTxtUpdate').hide();
          $('.btn_noteCancel').hide();
          $('#contactListYear').fadeToggle();
     }).catch(rejected => {
          console.log("Kayıt Yok.")
          console.log("Hata: ", rejected);
     })
}
var noteYearFullList = () => {
     $("#contactListFullYear").html("");
     let aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
     CalendarService._noteYearFullList().then(fullfilled => {
          console.log("Kayıtlar listeleniyor:")
          console.log(fullfilled.rows);
          jQuery.each(fullfilled.rows, function (_index, value) {
               var kayit = "";
               kayit += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
               kayit += '<tr><td colspan="5"><input type="text" class="txt_noteUpdate" id="txt_noteUpdate' + value.noteId + '"></td> ' +
                    '<td colspan="2"><button id="btn_noteTxtUpdate' + value.noteId + '" class = "btn_noteTxtUpdate" onclick="noteUpdate(' + value.noteId + ')" > Kaydet</button>' +
                    '<button id="btn_noteCancel' + value.noteId + '" class = "btn_noteCancel" onclick="noteCancel(' + value.noteId + ')" > Vazgeç</button></td></tr>'
               kayit += '<tr><td colspan="2">' + value.day + " " + aylar[value.monthIndis] + " " + value.year + '</td><td colspan ="3"><b>' + value.text + '</b></td>  <td colspan ="2"><button class="btn_noteListDelete" onclick="noteDelete(' + value.noteId + "," + value.day + ');" > Sil</button>' +
                    '<button id="btn_noteUpdate' + value.noteId + '" class="btn_noteListUpdate" onclick="noteUpdateTxtSearch(' + value.noteId + ')" > Düzenle</button></td></tr> ';
               $("#contactListFullYear").append(kayit);
          });
          $('.txt_noteUpdate').hide();
          $('.btn_noteTxtUpdate').hide();
          $('.btn_noteCancel').hide();
          $('#contactListFullYear').fadeToggle();

     }).catch(rejected => {
          console.log("Kayıt Yok.")
          console.log("Hata: ", rejected);
     })
}
var noteDelete = (noteId, day) => {
     CalendarService._noteDelete(noteId).then(fullfilled => {
          $('#sutun' + day).css("background-color", "white");
          debugger
          console.log("Kayıtlar listeleniyor:");
          console.log(fullfilled.rows);
          $('#contactListMonth').fadeOut();
          $('#contactListYear').fadeOut();
          $('#contactListFullYear').fadeOut();

     }).catch(rejected => {
          console.log("Hata: ", rejected);
     })
}

var noteUpdateTxtSearch = (txt_noteId) => {
     CalendarService._noteUpdateTxtSearch(txt_noteId).then(fullfilled => {
          console.log("kayıtlar getiriliyor.");
          console.log(fullfilled);
          jQuery.each(fullfilled.rows, function (_index, value) {
               if (fullfilled.rows.length >= 0) {
                    $('#txt_noteUpdate' + txt_noteId).show();
                    $('#btn_noteTxtUpdate' + txt_noteId).show();
                    $('#btn_noteCancel' + txt_noteId).show();
                    $('#txt_noteUpdate' + txt_noteId).val(value.text);
               }
          });
     }).catch(rejected => {
          console.log(rejected);
     })
}
var noteCancel = (noteId) => {
     $('#txt_noteUpdate' + noteId).hide();
     $('#btn_noteTxtUpdate' + noteId).hide();
     $('#btn_noteCancel' + noteId).hide();
     // $('#txt_noteUpdate' + noteId).val("");
}
var noteUpdate = (noteId) => {
     var text = $('#txt_noteUpdate' + noteId).val();
     debugger
     CalendarService._noteUpdate(text, noteId).then(fullfilled => {
          console.log("Kayıtlar Guncellendi:");
          console.log(fullfilled.rows);
          $('#contactListMonth').fadeOut();
          $('#contactListYear').fadeOut();
          $('#contactListFullYear').fadeOut();

     }).catch(rejected => {
          console.log("Hata: ", rejected);
     })
}



var gunBul = (simdikiAyIndis, simdikiYil) => {
     CalendarService._gunBul(simdikiAyIndis, simdikiYil).then(fullfilled => {
          console.log("Kayıtlar listeleniyor:")
          console.log(fullfilled.rows);
          jQuery.each(fullfilled.rows, function (_index, value) {
               $('#sutun' + value.day).css("background-color", "#dbc27e");
               // $('#sutun' + value.day).css("border-radius", "50%");
          })
     }).catch(rejected => {
          console.log("Kayıt Yok.")
          console.log("Hata: ", rejected);
     })
}