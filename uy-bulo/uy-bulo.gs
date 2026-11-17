/**
 * Үй-бүлө Күндөлүгү — Google Apps Script (синхрон)
 * 1) Google Drive'да жаңы Google Sheet ачыңыз (аты: «Үй-бүлө Күндөлүгү»).
 * 2) Кеңейтүүлөр (Расширения) → Apps Script. Бардык кодду өчүрүп, ушул файлды чаптаңыз.
 * 3) Төмөндөгү KEY'ди өзүңүз ойлоп тапкан сөзгө алмаштырыңыз (мис. "Arzykul-777").
 * 4) Жайгаштыруу (Начать развертывание) → Жаңы жайгаштыруу → Түрү: Веб-колдонмо
 *    · Аткаруучу: Мен  · Кимдер кире алат: Баары (Все)
 *    → URL'ди көчүрүп, колдонмонун «Жөндөө → Синхрон» бөлүмүнө чаптаңыз, KEY'ди да жазыңыз.
 */
var KEY = "ӨЗГӨРТҮҢҮЗ";

function sh_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(head); s.setFrozenRows(1); }
  return s;
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doGet(e) { return out_({ ok: true, app: "uy-bulo" }); }

function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var b = JSON.parse(e.postData.contents || "{}");
    if (b.key !== KEY) return out_({ ok: false, error: "key" });
    var log = sh_("log", ["member", "date", "data", "ts", "percent"]);
    var cfgS = sh_("config", ["cfg", "ts"]);

    if (b.a === "get") {
      var v = log.getDataRange().getValues().slice(1).map(function (r) { return [String(r[0]), fmt_(r[1]), String(r[2]), Number(r[3]) || 0]; });
      var c = cfgS.getRange(2, 1, 1, 2).getValues()[0];
      return out_({ ok: true, rows: v, cfg: c[0] || null, cfgTs: Number(c[1]) || 0 });
    }
    if (b.a === "put") {
      var all = log.getDataRange().getValues(), idx = {};
      for (var i = 1; i < all.length; i++) idx[all[i][0] + "|" + fmt_(all[i][1])] = i + 1;
      (b.rows || []).forEach(function (r) {
        var k = r[0] + "|" + r[1], row = idx[k];
        var vals = [[r[0], "'" + r[1], r[2], r[3], ""]];
        if (row) { if (Number(log.getRange(row, 4).getValue()) <= Number(r[3])) log.getRange(row, 1, 1, 5).setValues(vals); }
        else { log.appendRow(vals[0]); idx[k] = log.getLastRow(); }
      });
      return out_({ ok: true });
    }
    if (b.a === "cfg") {
      var old = Number(cfgS.getRange(2, 2).getValue()) || 0;
      if (Number(b.ts) >= old) cfgS.getRange(2, 1, 1, 2).setValues([[b.cfg, b.ts]]);
      return out_({ ok: true });
    }
    return out_({ ok: false, error: "action" });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}
function fmt_(d) {
  if (Object.prototype.toString.call(d) === "[object Date]") return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
  return String(d).replace(/^'/, "");
}
