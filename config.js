/* ============================================================
   ربط الموقع بـ Google Sheet "Caribou Menu Guide — Data"
   كل تاب منشور كـ CSV. لو عايز توقف الربط سيب أي لينك فاضي ("")،
   والموقع هيستخدم البيانات المدمجة في data.js.
   ============================================================ */
(function () {
  var BASE = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-OzWLsIjyQlzGYiLbsspPsbQBuj-_crDAQMb8u3egukCwxQw75Fmf2PEZhcGfaK6c5j_Y0HpF_jU2/pub";
  function tab(gid) { return BASE + "?gid=" + gid + "&single=true&output=csv"; }
  window.SHEETS = {
    branches: tab("1989027028"),   // Branches_Data
    menu:     tab("1855891339"),   // Menu_Data
    offers:   tab("618382330"),    // Offers_Data
    replies:  tab("435326182")     // Replies
  };
})();
