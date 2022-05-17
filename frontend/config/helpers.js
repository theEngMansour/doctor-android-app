export const transformName = name => {
    const na = `${name}`;
    const firstLetters = na.split(" ");
    return firstLetters
      .map(letter => {
        letter.toUpperCase();
        return letter[0];
      })
      .join(" ");
   };
   
  // تعمل على توقيف عمل دالة معينة على حسب لوقت محدد  لها 
  // نستعملها لتخفيض العبئ على السيرفر لانه كل مرة يكتب مسخدم يروح يبحث في خادم
   export const debounce = (func, wait, immediate) => {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  