CalendarService = {
     _notesCreateTable: function () {
          return new Promise((resolve, reject) => {
               if (document.readyState) {
                    veritabani.transaction(function (fx) {
                         fx.executeSql('CREATE TABLE IF NOT EXISTS notes (noteId INTEGER PRIMARY KEY AUTOINCREMENT, day INTEGER, monthIndis INTEGER, year INTEGER , text VARCHAR2(200) )', [],
                              function (transaction, result) {
                                   resolve(result);
                              },
                              function (transaction, error) {
                                   reject(error);
                              })
                    })
               } else {
                    var msg = "sayfa yüklenemedi";
                    reject(msg)
               }
          })
     },
     _noteInsert: function (gun, ayIndis, yil, text) {
          return new Promise((resolve, reject) => {
               if (gun != "" && gun != null && ayIndis != "" && ayIndis != null &&
                    yil != "" && yil != null && text != "" && text != null) {
                    veritabani.transaction(function (fx) {
                         fx.executeSql('INSERT INTO notes (day,monthIndis,year,text) VALUES (?,?,?,?)', [gun, ayIndis, yil, text], function (transaction, result) {
                                   resolve(result)
                              }),
                              function (transaction, error) {
                                   reject(error);
                              };
                    })
               } else {
                    var msg = "bilgileriniz hatal lütfen kontrol ediniz."
                    reject(alert(msg));
               }
          })
     },
     _noteMonthtList: function (ayIndis, simdikiYil) {
          return new Promise((resolve, reject) => {
               if (document.readyState) {
                    veritabani.transaction(function (tx) {
                         tx.executeSql('SELECT * FROM notes WHERE monthIndis=? AND year=?', [ayIndis, simdikiYil], function (transaction, result) {
                              if (result.rows.length > 0) resolve(result);
                         }, function (transaction, error) {
                              reject(error)
                         });
                    });
               } else {
                    var msg = "sayfa yüklenemedi.";
                    reject(msg);
               }
          })
     },
     _noteYearList: function (simdikiYil) {
          return new Promise((resolve, reject) => {
               if (document.readyState) {
                    veritabani.transaction(function (tx) {
                         tx.executeSql('SELECT * FROM notes WHERE year=?', [simdikiYil], function (transaction, result) {
                              if (result.rows.length > 0) resolve(result);
                         }, function (transaction, error) {
                              reject(error)
                         });
                    });
               } else {
                    var msg = "sayfa yüklenemedi.";
                    reject(msg);
               }
          })
     },
     _noteYearFullList: function () {
          return new Promise((resolve, reject) => {
               if (document.readyState) {
                    veritabani.transaction(function (tx) {
                         tx.executeSql('SELECT * FROM notes', [], function (transaction, result) {
                              if (result.rows.length > 0) resolve(result);
                         }, function (transaction, error) {
                              reject(error)
                         });
                    });
               } else {
                    var msg = "sayfa yüklenemedi.";
                    reject(msg);
               }
          })
     },
     _noteDelete: function (noteId) {
          return new Promise((resolve, reject) => {
               if (noteId != "" && noteId != null) {
                    veritabani.transaction(function (tx) {
                         tx.executeSql('DELETE FROM notes WHERE noteId=?', [noteId], function (transaction, result) {
                              resolve(result);
                              debugger
                         }, function (transaction, error) {
                              reject(error);
                         });
                    });
               } else {
                    var msg = "product_id istenilen şekilde gelmedi.";
                    reject(msg);
               }
          })
     },
     _noteUpdate: function (text, noteId) {
          return new Promise((resolve, reject) => {
               if (noteId != "" && noteId != null) {
                    veritabani.transaction(function (fx) {
                         fx.executeSql('UPDATE notes SET text=? WHERE noteId=?', [text, noteId], function (transaction, result) {
                              resolve(result);
                         }, function (transaction, error) {
                              reject(error);
                         });
                    });
               } else {
                    var msg = "Id beklenen sekilde gelmedi.";
                    reject(msg);
               }
          })

     },
     _noteUpdateTxtSearch: function (noteId) {
          return new Promise((resolve, reject) => {
               if (noteId != "" && noteId != null) {
                    veritabani.transaction(function (fx) {
                         fx.executeSql('select* from notes WHERE noteId=?', [noteId], function (transaction, result) {
                              if (result.rows.length > 0) resolve(result);
                         }, function (transaction, error) {
                              reject(error);
                         });
                    });
               } else {
                    var msg = "product_id istenilen şekilde gelmedi.";
                    reject(msg);
               }
          })
     },
     _gunBul: function (ayIndis, simdikiYil) {
          return new Promise((resolve, reject) => {
               if (document.readyState) {
                    veritabani.transaction(function (tx) {
                         tx.executeSql('SELECT * FROM notes WHERE monthIndis=? AND year=?', [ayIndis, simdikiYil], function (transaction, result) {
                              if (result.rows.length > 0) resolve(result);
                         }, function (transaction, error) {
                              reject(error)
                         });
                    });
               } else {
                    var msg = "sayfa yüklenemedi.";
                    reject(msg);
               }
          })
     },
}