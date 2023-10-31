function getReadableDate(date = Date.now()) {
  const dt = new Date(date);
  return `${dt.getDate().toString().padStart(2, "0")}/${dt.getUTCMonth().toString().padStart(2, "0")}/${dt.getFullYear()},${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`
}

var SCRIPT_CACHE_KEY = {
  LAST_USED_ROW_BY_GPT_CACHE: "LAST_USED_ROW_BY_GPT_CACHE",
  LAST_USED_ROW_BY_FORM_CACHE: "LAST_USED_ROW_BY_FORM_CACHE",
  LAST_USED_ROW_BY_GMAIL_CACHE: "LAST_USED_ROW_BY_GMAIL_CACHE",
}
var SCRIPT_PROP_KEY = {
  LAST_USED_ROW_BY_GPT: "LAST_USED_ROW_BY_GPT",
  LAST_USED_ROW_BY_FORM: "LAST_USED_ROW_BY_FORM",
  LAST_USED_ROW_BY_GMAIL: "LAST_USED_ROW_BY_GMAIL",

}


class LastUsedRowByFormProperty {
  static set(row = 1) {
    // Set script cache
    CacheService.getScriptCache().put(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_FORM_CACHE, String(row));
    // set script properties
    PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_FORM, String(row))

  }

  static get() {
    // return cache and only if its empty return props
    return CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_FORM_CACHE)
      ?? PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_FORM);
    /* CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE) !== null
      ? CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE)
      : PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.SCAN_STATUS);
 */
  }
}


class LastUsedRowByGmailProperty {
  static set(row = 1) {
    // Set script cache
    CacheService.getScriptCache().put(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_GMAIL_CACHE, String(row));
    // set script properties
    PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_GMAIL, String(row))

  }

  static get() {
    // return cache and only if its empty return props
    return CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_GMAIL_CACHE) ?? PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_GMAIL);
    /* CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE) !== null
      ? CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE)
      : PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.SCAN_STATUS);
 */
  }
}

class LastUsedRowByGPTProperty {
  static set(row = 1) {
    // Set script cache
    CacheService.getScriptCache().put(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_GPT_CACHE, String(row));
    // set script properties
    PropertiesService.getScriptProperties().setProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_GPT, String(row))

  }

  static get() {
    // return cache and only if its empty return props
    return CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.LAST_USED_ROW_BY_GPT_CACHE) ?? PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.LAST_USED_ROW_BY_GPT);
    /* CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE) !== null
      ? CacheService.getScriptCache().get(SCRIPT_CACHE_KEY.SCAN_STATUS_CACHE)
      : PropertiesService.getScriptProperties().getProperty(SCRIPT_PROP_KEY.SCAN_STATUS);
 */
  }
}

function removeAllPropsNCaches() {
  console.log(Object.values(SCRIPT_CACHE_KEY))
  CacheService.getScriptCache().removeAll(Object.values(SCRIPT_CACHE_KEY));
  PropertiesService.getScriptProperties().deleteAllProperties();
}