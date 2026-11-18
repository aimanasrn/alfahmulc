/**
 * AL-FAHMU | Sistem Laporan Prestasi
 *
 * Tampal fail ini dalam Extensions > Apps Script pada Google Sheet.
 * Langkah penuh: docs/staff-forms.md
 */

const TAB_PANDUAN = "Panduan";
const TAB_REKOD = "Rekod Guru";
const TAB_LAPORAN = "Laporan Individu";
const TAB_DASHBOARD = "Dashboard";
const TAB_SENARAI = "Senarai";

const R = "'" + TAB_REKOD + "'!";
const S = TAB_SENARAI + "!";

const NAVY = "#17365D";
const LIGHT = "#DCE9F5";
const LINE = "#B7C9DC";
const PICK = "#E2EFDA";
const MUTED = "#666666";

const HEADERS = [
  "Nama Pelajar", "Darjah / Tingkatan", "Tempoh Laporan", "Nama Guru", "Subjek",
  "Markah (%)", "Kehadiran (%)", "Kekuatan Pelajar", "Perlu Dipertingkatkan",
  "Ulasan Guru", "Tindakan Susulan", "Dihantar Pada",
];

const BULAN = "JANUARI|FEBRUARI|MAC|APRIL|MEI|JUN|JULAI|OGOS|SEPTEMBER|OKTOBER|NOVEMBER|DISEMBER";
const TEMPOH_PATTERN = new RegExp("^(" + BULAN + ") \\d{4}$");

/* ---------- Penerimaan borang website ---------- */

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;

  try {
    const data = (e && e.parameter) || {};

    // Medan perangkap bot: pura-pura berjaya, tiada apa disimpan.
    if (data.website) return reply({ ok: true });

    const kod = PropertiesService.getScriptProperties().getProperty("KOD_GURU");
    if (!kod) return fail("Sistem belum disediakan. Sila hubungi admin.");
    if (clean(data.kodGuru, 50) !== kod) return fail("Kod guru tidak sah.");

    const namaPelajar = clean(data.namaPelajar, 120).toUpperCase();
    const darjah = clean(data.darjah, 40);
    const tempoh = clean(data.tempoh, 30).toUpperCase();
    const namaGuru = clean(data.namaGuru, 120);
    const subjek = clean(data.subjek, 80);
    const kekuatan = clean(data.kekuatan, 1000);
    const perlu = clean(data.perluDipertingkatkan, 1000);
    const ulasan = clean(data.ulasan, 1000);
    const tindakan = clean(data.tindakan, 1000);
    const markah = toFraction(data.markah);
    const kehadiran = toFraction(data.kehadiran);

    const text = [namaPelajar, darjah, tempoh, namaGuru, subjek, kekuatan, perlu, ulasan, tindakan];
    if (text.some((value) => !value)) return fail("Sila lengkapkan semua ruangan.");
    if (!TEMPOH_PATTERN.test(tempoh)) return fail("Tempoh laporan tidak sah.");
    if (markah === null) return fail("Markah mesti antara 0 hingga 100.");
    if (kehadiran === null) return fail("Kehadiran mesti antara 0 hingga 100.");

    locked = lock.tryLock(10000);
    if (!locked) return fail("Sistem sedang sibuk. Sila cuba lagi.");

    const sheet = SpreadsheetApp.getActive().getSheetByName(TAB_REKOD);
    if (!sheet) return fail("Sistem belum disediakan. Sila hubungi admin.");

    if (isDuplicate(sheet, namaPelajar, tempoh, subjek)) {
      return fail("Rekod pelajar ini untuk subjek dan tempoh yang sama sudah ada. Minta admin betulkan jika perlu.");
    }

    // Tanda ' menyimpan nilai sebagai teks, jadi input tidak dibaca sebagai formula.
    sheet.appendRow([
      asText(namaPelajar), asText(darjah), asText(tempoh), asText(namaGuru), asText(subjek),
      markah, kehadiran,
      asText(kekuatan), asText(perlu), asText(ulasan), asText(tindakan),
      new Date(),
    ]);

    return reply({ ok: true });
  } catch (error) {
    console.error(error);
    return fail("Rekod tidak dapat disimpan. Sila cuba lagi.");
  } finally {
    if (locked) lock.releaseLock();
  }
}

function isDuplicate(sheet, namaPelajar, tempoh, subjek) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const key = (nama, masa, tajuk) =>
    [nama, masa, tajuk].map((value) => String(value).trim().toUpperCase()).join("|");
  const target = key(namaPelajar, tempoh, subjek);

  return sheet.getRange(2, 1, lastRow - 1, 5).getValues()
    .some((row) => key(row[0], row[2], row[4]) === target);
}

function clean(value, maxLength) {
  return String(value === undefined || value === null ? "" : value)
    .replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function toFraction(value) {
  const text = clean(value, 10);
  const number = Number(text);
  if (!text || !isFinite(number) || number < 0 || number > 100) return null;
  return number / 100;
}

function asText(value) {
  return "'" + value;
}

function fail(error) {
  return reply({ ok: false, error: error });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Kod guru ---------- */

function newKodGuru() {
  return Utilities.getUuid().replace(/-/g, "").slice(0, 10).toUpperCase();
}

/** Jalankan fungsi ini jika kod guru terdedah. Kod lama terus tidak sah. */
function tukarKodGuru() {
  const kod = newKodGuru();
  PropertiesService.getScriptProperties().setProperty("KOD_GURU", kod);
  console.log("KOD GURU BAHARU: " + kod);
}

/* ---------- Bina Google Sheet ---------- */

/**
 * Selamat dijalankan semula: data dalam Rekod Guru dikekalkan,
 * manakala tab lain dibina semula.
 */
function setupLaporanPrestasi() {
  const ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetTimeZone("Asia/Kuala_Lumpur");

  const names = [TAB_PANDUAN, TAB_REKOD, TAB_LAPORAN, TAB_DASHBOARD, TAB_SENARAI];
  const sheets = names.map((name) => ss.getSheetByName(name) || ss.insertSheet(name));
  const [panduan, rekod, laporan, dashboard, senarai] = sheets;

  [panduan, laporan, dashboard, senarai].forEach(resetSheet);

  buildRekod(rekod);
  buildSenarai(senarai);
  buildPanduan(panduan);
  buildLaporan(laporan, senarai);
  buildDashboard(dashboard, senarai);

  senarai.showSheet(); // Perlu kelihatan untuk disusun semasa setup dijalankan semula.
  sheets.forEach((sheet, index) => {
    ss.setActiveSheet(sheet);
    ss.moveActiveSheet(index + 1);
  });
  ss.setActiveSheet(dashboard);
  senarai.hideSheet();

  // Buang tab kosong asal seperti "Sheet1".
  ss.getSheets()
    .filter((sheet) => names.indexOf(sheet.getName()) === -1)
    .filter((sheet) => sheet.getLastRow() === 0 && sheet.getCharts().length === 0)
    .forEach((sheet) => ss.deleteSheet(sheet));

  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty("KOD_GURU")) props.setProperty("KOD_GURU", newKodGuru());
  console.log("KOD GURU: " + props.getProperty("KOD_GURU"));
}

function resetSheet(sheet) {
  sheet.getCharts().forEach((chart) => sheet.removeChart(chart));
  const all = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  all.breakApart();
  all.clear();
  all.clearDataValidations();
  sheet.setFrozenRows(0);
  all.setFontFamily("Arial").setFontSize(10);
  sheet.setHiddenGridlines(true);
}

function buildRekod(sheet) {
  const rows = sheet.getMaxRows();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setBackground(NAVY).setFontColor("#FFFFFF").setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 30);

  const widths = [190, 120, 130, 160, 130, 90, 95, 240, 240, 240, 200, 130];
  widths.forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  sheet.getRange(2, 6, rows - 1, 2).setNumberFormat("0.0%").setHorizontalAlignment("center");
  sheet.getRange(2, 12, rows - 1, 1).setNumberFormat("dd/mm/yyyy hh:mm");
  sheet.getRange(2, 8, rows - 1, 4).setWrap(true);
  sheet.getRange(2, 1, rows - 1, HEADERS.length).setVerticalAlignment("top");

  const table = sheet.getRange(1, 1, rows, HEADERS.length);
  if (sheet.getBandings().length === 0) {
    table.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  }
  if (!sheet.getFilter()) table.createFilter();
}

function buildSenarai(sheet) {
  const period = "(" + TAB_DASHBOARD + "!$B$3=\"SEMUA\")+(" + R + "C2:C=" + TAB_DASHBOARD + "!$B$3)";

  sheet.getRange("A1:C1").setValues([["Nama", "Tempoh", "Pilihan Dashboard"]]);
  sheet.getRange("A2").setFormula("=IFERROR(SORT(UNIQUE(FILTER(" + R + "A2:A," + R + "A2:A<>\"\"))),\"\")");
  sheet.getRange("B2").setFormula("=IFERROR(UNIQUE(FILTER(" + R + "C2:C," + R + "C2:C<>\"\")),\"\")");
  sheet.getRange("C2").setValue("SEMUA");
  sheet.getRange("C3").setFormula("=IFERROR(FILTER(B2:B,B2:B<>\"\"),\"\")");

  // E:K = rekod ikut tempoh yang dipilih di Dashboard.
  sheet.getRange("E1:K1").setValues([["Nama", "Darjah", "Tempoh", "Guru", "Subjek", "Markah", "Kehadiran"]]);
  sheet.getRange("E2").setFormula(
    "=IFERROR(FILTER(" + R + "A2:G," + R + "A2:A<>\"\"," + period + "),\"\")"
  );

  // M:P = purata setiap pelajar, supaya Skala Tahap dikira ikut pelajar.
  sheet.getRange("M1:P1").setValues([["Pelajar", "Purata Markah", "Purata Kehadiran", "Rekod"]]);
  sheet.getRange("M2").setFormula(
    "=IFERROR(QUERY(E2:K,\"select E, avg(J), avg(K), count(E) where E is not null " +
    "group by E label avg(J) '', avg(K) '', count(E) ''\",0),\"\")"
  );
}

function buildPanduan(sheet) {
  title(sheet.getRange("A1:B1"), "AL FAHMU LEARNING CENTRE | SISTEM LAPORAN PRESTASI");
  const rows = [
    ["TUJUAN", "Satu fail berpusat untuk rekod prestasi pelajar. Laporan ibu bapa menggabungkan semua subjek bagi seorang pelajar."],
    ["LANGKAH 1", "Guru isi borang Rekod Prestasi Pelajar di website, satu borang bagi setiap subjek."],
    ["LANGKAH 2", "Rekod masuk secara automatik ke helaian 'Rekod Guru'."],
    ["LANGKAH 3", "Admin buka 'Laporan Individu', kemudian pilih nama pelajar di B4 dan tempoh di E4."],
    ["LANGKAH 4", "Semak laporan, kemudian pilih File > Download > PDF untuk simpan atau hantar kepada ibu bapa."],
    ["DASHBOARD", "Pilih tempoh di B3 untuk melihat ringkasan bulan tersebut, atau SEMUA untuk keseluruhan rekod."],
    ["SKALA TAHAP", "80-100: Cemerlang | 65-79: Baik | 50-64: Memuaskan | 40-49: Perlu Bimbingan | 0-39: Perlu Perhatian"],
    ["PEMBETULAN", "Rekod yang salah dibetulkan oleh admin terus dalam 'Rekod Guru'. Nama pelajar mesti dieja sama bagi semua subjek."],
    ["PENTING", "Jangan ubah tajuk lajur, nama helaian atau formula. Helaian 'Senarai' disembunyikan kerana ia digunakan oleh formula."],
  ];
  const range = sheet.getRange(3, 1, rows.length, 2).setValues(rows)
    .setWrap(true).setVerticalAlignment("middle");
  box(range);
  label(sheet.getRange(3, 1, rows.length, 1));
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 660);
  sheet.setRowHeights(3, rows.length, 46);
}

function buildLaporan(sheet, senarai) {
  const match = R + "A2:A=$B$4," + R + "C2:C=$E$4";
  const lookup = (column) => "FILTER(" + R + column + "2:" + column + "," + match + ")";
  const joined = (column) =>
    "=IFERROR(TEXTJOIN(CHAR(10),TRUE,FILTER(" + R + "E2:E&\": \"&" + R + column + "2:" + column + "," + match + ")),\"\")";

  [180, 160, 90, 110, 130, 250].forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  title(sheet.getRange("A1:F1"), "AL FAHMU LEARNING CENTRE");
  sheet.getRange("A2:F2").merge().setValue("LAPORAN PRESTASI PELAJAR | STUDENT PROGRESS REPORT")
    .setBackground(LIGHT).setFontColor(NAVY).setFontWeight("bold").setFontSize(12)
    .setHorizontalAlignment("center");

  sheet.getRange("A4").setValue("Pilih nama pelajar:");
  sheet.getRange("D4").setValue("Tempoh laporan:");
  [sheet.getRange("A4"), sheet.getRange("D4")].forEach(fieldLabel);
  dropdown(sheet.getRange("B4"), senarai.getRange("A2:A"));
  dropdown(sheet.getRange("E4"), senarai.getRange("B2:B"));
  box(sheet.getRange("B4").setBackground(PICK));
  box(sheet.getRange("E4").setBackground(PICK));

  section(sheet.getRange("A6:F6"), "MAKLUMAT PELAJAR");
  sheet.getRange("A7").setValue("Nama");
  sheet.getRange("A8").setValue("Tempoh");
  sheet.getRange("D7").setValue("Darjah / Tingkatan");
  sheet.getRange("D8").setValue("Nama guru");
  ["A7", "A8", "D7", "D8"].forEach((cell) => fieldLabel(sheet.getRange(cell)));
  sheet.getRange("B7").setFormula("=IF(B4=\"\",\"\",B4)");
  sheet.getRange("B8").setFormula("=IF(E4=\"\",\"\",E4)");
  sheet.getRange("E7").setFormula("=IFERROR(INDEX(" + lookup("B") + ",1),\"\")");
  sheet.getRange("E8:F8").merge().setFormula("=IFERROR(TEXTJOIN(\", \",TRUE,UNIQUE(" + lookup("D") + ")),\"\")");
  ["B7", "B8", "E7", "E8:F8"].forEach((cell) => box(sheet.getRange(cell)));

  section(sheet.getRange("A10:F10"), "PRESTASI MENGIKUT SUBJEK");
  sheet.getRange("A11:F11").setValues([["Subjek", "Guru", "Markah", "Kehadiran", "Tahap", "Ulasan Guru"]])
    .setBackground(LIGHT).setFontColor(NAVY).setFontWeight("bold");
  sheet.getRange("A12").setFormula(
    "=IFERROR(ARRAY_CONSTRAIN(FILTER({" + R + "E2:E," + R + "D2:D," + R + "F2:F," + R + "G2:G}," + match + "),10,4),\"\")"
  );
  sheet.getRange("F12").setFormula("=IFERROR(ARRAY_CONSTRAIN(" + lookup("J") + ",10,1),\"\")");
  for (let row = 12; row <= 21; row++) {
    sheet.getRange("E" + row).setFormula(tahapFormula("C" + row));
  }
  sheet.getRange("A22").setValue("Purata keseluruhan");
  sheet.getRange("C22").setFormula("=IFERROR(AVERAGE(C12:C21),\"\")");
  sheet.getRange("D22").setFormula("=IFERROR(AVERAGE(D12:D21),\"\")");
  sheet.getRange("E22").setFormula(tahapFormula("C22"));
  sheet.getRange("A22:F22").setFontWeight("bold").setBackground(LIGHT).setFontColor(NAVY);
  sheet.getRange("C12:D22").setNumberFormat("0.0%").setHorizontalAlignment("center");
  sheet.getRange("A12:F21").setWrap(true).setVerticalAlignment("top");
  box(sheet.getRange("A11:F22"));

  section(sheet.getRange("A23:F23"), "RINGKASAN PERKEMBANGAN");
  summary(sheet, 24, "KEKUATAN PELAJAR", joined("H"));
  summary(sheet, 27, "ASPEK YANG PERLU DIPERTINGKATKAN", joined("I"));
  summary(sheet, 30, "CADANGAN TINDAKAN SUSULAN", joined("K"));

  sheet.getRange("A34:F34").merge().setValue("Disediakan oleh Al Fahmu Learning Centre | Membina Ilmu, Membentuk Generasi")
    .setFontStyle("italic").setFontColor(MUTED).setHorizontalAlignment("center");
}

function summary(sheet, row, heading, formula) {
  sheet.getRange(row, 1, 1, 6).merge().setValue(heading)
    .setBackground(LIGHT).setFontColor(NAVY).setFontWeight("bold");
  const body = sheet.getRange(row + 1, 1, 2, 6).merge().setFormula(formula)
    .setWrap(true).setVerticalAlignment("top");
  box(body);
  sheet.setRowHeights(row + 1, 2, 42);
}

function buildDashboard(sheet, senarai) {
  [190, 85, 85, 85, 24, 190, 85, 85, 85, 24, 210, 90, 90]
    .forEach((width, index) => sheet.setColumnWidth(index + 1, width));

  title(sheet.getRange("A1:M1"), "DASHBOARD PRESTASI PELAJAR | AL FAHMU");

  fieldLabel(sheet.getRange("A3").setValue("Tempoh"));
  const picker = sheet.getRange("B3:D3").merge().setValue("SEMUA")
    .setBackground(PICK).setFontWeight("bold").setHorizontalAlignment("center");
  dropdown(sheet.getRange("B3"), senarai.getRange("C2:C"));
  box(picker);
  sheet.getRange("F3").setValue("Dikemas kini automatik apabila guru menghantar borang.")
    .setFontStyle("italic").setFontColor(MUTED);

  // Ringkasan
  section(sheet.getRange("A5:D5"), "RINGKASAN");
  const kpis = [
    ["Jumlah rekod diisi", "=COUNTIF(" + S + "E2:E,\"?*\")", "0"],
    ["Jumlah pelajar unik", "=IFERROR(COUNTUNIQUE(FILTER(" + S + "E2:E," + S + "E2:E<>\"\")),0)", "0"],
    ["Purata markah", "=IFERROR(AVERAGE(" + S + "J2:J),0)", "0.0%"],
    ["Purata kehadiran", "=IFERROR(AVERAGE(" + S + "K2:K),0)", "0.0%"],
  ];
  kpis.forEach((kpi, index) => {
    const row = 6 + index;
    sheet.getRange(row, 1).setValue(kpi[0]);
    sheet.getRange(row, 2, 1, 3).merge().setFormula(kpi[1]).setNumberFormat(kpi[2])
      .setFontWeight("bold").setFontSize(12).setFontColor(NAVY).setHorizontalAlignment("center");
  });
  label(sheet.getRange("A6:A9"));
  box(sheet.getRange("A6:D9"));

  // Skala Tahap, dikira ikut purata setiap pelajar
  const avg = S + "N2:N";
  section(sheet.getRange("F5:I5"), "SKALA TAHAP (BILANGAN PELAJAR)");
  const scale = [
    ["Cemerlang", "=COUNTIF(" + avg + ",\">=0.8\")", "80-100%"],
    ["Baik", "=COUNTIFS(" + avg + ",\">=0.65\"," + avg + ",\"<0.8\")", "65-79%"],
    ["Memuaskan", "=COUNTIFS(" + avg + ",\">=0.5\"," + avg + ",\"<0.65\")", "50-64%"],
    ["Perlu Bimbingan", "=COUNTIFS(" + avg + ",\">=0.4\"," + avg + ",\"<0.5\")", "40-49%"],
    ["Perlu Perhatian", "=COUNTIF(" + avg + ",\"<0.4\")", "0-39%"],
  ];
  scale.forEach((item, index) => {
    const row = 6 + index;
    sheet.getRange(row, 6).setValue(item[0]);
    sheet.getRange(row, 7).setFormula(item[1]).setFontWeight("bold").setHorizontalAlignment("center");
    sheet.getRange(row, 8, 1, 2).merge().setValue(item[2]).setFontColor(MUTED).setHorizontalAlignment("center");
  });
  label(sheet.getRange("F6:F10"));
  box(sheet.getRange("F6:I10"));

  // Pelajar perlu perhatian
  section(sheet.getRange("K5:M5"), "PURATA MARKAH BAWAH 50%");
  tableHead(sheet.getRange("K6:M6"), ["Pelajar", "Markah", "Kehadiran"]);
  sheet.getRange("K7").setFormula(
    "=IFERROR(SORT(FILTER(" + S + "M2:O," + S + "M2:M<>\"\"," + S + "N2:N<0.5),2,TRUE),\"Tiada pelajar\")"
  );
  sheet.getRange("L7:M200").setNumberFormat("0.0%").setHorizontalAlignment("center");

  // Jadual
  section(sheet.getRange("A29:D29"), "PRESTASI IKUT SUBJEK");
  section(sheet.getRange("F29:I29"), "PRESTASI IKUT DARJAH / TINGKATAN");
  tableHead(sheet.getRange("A30:D30"), ["Subjek", "Rekod", "Markah", "Kehadiran"]);
  tableHead(sheet.getRange("F30:I30"), ["Darjah / Tingkatan", "Rekod", "Markah", "Kehadiran"]);
  sheet.getRange("A31").setFormula(groupFormula("I", "order by avg(J) desc"));
  sheet.getRange("F31").setFormula(groupFormula("F", "order by F"));
  ["B31:B200", "G31:G200"].forEach((cells) => sheet.getRange(cells).setHorizontalAlignment("center"));
  ["C31:D200", "H31:I200"].forEach((cells) =>
    sheet.getRange(cells).setNumberFormat("0.0%").setHorizontalAlignment("center"));

  // Carta
  sheet.insertChart(sheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(sheet.getRange("F6:G10"))
    .setNumHeaders(0)
    .setPosition(12, 1, 0, 0)
    .setOption("title", "Bilangan pelajar ikut tahap")
    .setOption("legend", { position: "none" })
    .setOption("colors", [NAVY])
    .setOption("vAxis", { minValue: 0, format: "0" })
    .setOption("width", 445)
    .setOption("height", 310)
    .build());

  sheet.insertChart(sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(sheet.getRange("A31:A50"))
    .addRange(sheet.getRange("C31:C50"))
    .setNumHeaders(0)
    .setPosition(12, 6, 0, 0)
    .setOption("title", "Purata markah ikut subjek")
    .setOption("legend", { position: "none" })
    .setOption("colors", [NAVY])
    .setOption("hAxis", { minValue: 0, maxValue: 1, format: "0%" })
    .setOption("width", 445)
    .setOption("height", 310)
    .build());
}

function groupFormula(column, order) {
  return "=IFERROR(QUERY(" + S + "E2:K,\"select " + column + ", count(" + column + "), avg(J), avg(K) " +
    "where E is not null group by " + column + " " + order + " " +
    "label count(" + column + ") '', avg(J) '', avg(K) ''\",0),\"\")";
}

function tahapFormula(cell) {
  return "=IF(" + cell + "=\"\",\"\",IFS(" +
    cell + ">=0.8,\"Cemerlang\"," +
    cell + ">=0.65,\"Baik\"," +
    cell + ">=0.5,\"Memuaskan\"," +
    cell + ">=0.4,\"Perlu Bimbingan\"," +
    "TRUE,\"Perlu Perhatian\"))";
}

/* ---------- Gaya ---------- */

function title(range, text) {
  range.merge().setValue(text).setBackground(NAVY).setFontColor("#FFFFFF")
    .setFontWeight("bold").setFontSize(15)
    .setHorizontalAlignment("center").setVerticalAlignment("middle");
  range.getSheet().setRowHeight(range.getRow(), 40);
}

function section(range, text) {
  range.merge().setValue(text).setBackground(NAVY).setFontColor("#FFFFFF").setFontWeight("bold");
}

function label(range) {
  range.setBackground(LIGHT).setFontColor(NAVY).setFontWeight("bold");
}

function fieldLabel(range) {
  range.setFontColor(NAVY).setFontWeight("bold");
}

function tableHead(range, values) {
  range.setValues([values]).setBackground(LIGHT).setFontColor(NAVY).setFontWeight("bold");
}

function box(range) {
  range.setBorder(true, true, true, true, true, true, LINE, SpreadsheetApp.BorderStyle.SOLID);
}

function dropdown(cell, source) {
  cell.setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInRange(source, true)
    .setAllowInvalid(false)
    .build());
}
