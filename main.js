const translations = {
    "if": "اگر",
    "elif": "اگر دیگر",
    "else": "دیگر",
    "for": "برای",
    "in": "در",
    "or": "یا",
    "and": "و",
    "return": "بازگرداندن",
    "def": "تعریف",
    "from": "از",
    "import": "وارد کردن",
    "class": "کلاس",
    "while": "تا زمانی که",
    "as": "به عنوان",
    "assert": "تایید",
    "break": "شکستن",
    "continue": "ادامه دادن",
    "del": "حذف",
    "except": "استثناء",
    "False": "نادرست",
    "True": "درست",
    "finally": "در نهایت",
    "global": "سراسری",
    "is": "است",
    "lambda": "تابع ناشناس",
    "None": "هیچ",
    "nonlocal": "غیر محلی",
    "not": "نه",
    "try": "تلاش",
    "with": "با",
    "yield": "بازده"
};

const builtinFunctions = {
    "print": "چاپ",
    "strip": "حذف فاصله",
    "split": "جدا کردن",
    "sum": "جمع",
    "list": "لیست",
    "abs": "قدر مطلق",
    "aiter": "تکرارگر غیر همزمان",
    "all": "همه",
    "anext": "بعدی غیر همزمان",
    "any": "هر یک",
    "ascii": "متن ساده",
    "bin": "دودویی",
    "bool": "بولین",
    "breakpoint": "نقطه توقف",
    "bytearray": "آرایه بایت",
    "bytes": "بایت‌ها",
    "callable": "قابل فراخوانی",
    "chr": "کاراکتر",
    "classmethod": "متد کلاس",
    "compile": "ترجمه",
    "complex": "عدد مختلط",
    "delattr": "حذف ویژگی",
    "dict": "دیکشنری",
    "dir": "فهرست",
    "divmod": "باقی‌مانده تقسیم",
    "enumerate": "شماره‌گذاری",
    "eval": "ارزیابی",
    "exec": "اجرا",
    "filter": "فیلتر",
    "float": "شناور",
    "format": "قالب",
    "frozenset": "مجموعه منجمد",
    "getattr": "دریافت ویژگی",
    "globals": "متغیرهای سراسری",
    "hasattr": "داشتن ویژگی",
    "hash": "هش",
    "help": "راهنما",
    "hex": "هگزادسیمال",
    "id": "شناسه",
    "input": "ورودی",
    "int": "عدد صحیح",
    "isinstance": "بررسی نمونه",
    "issubclass": "بررسی زیرکلاس",
    "iter": "تکرارگر",
    "len": "طول",
    "list": "لیست",
    "locals": "متغیرهای محلی",
    "map": "نگاشت",
    "max": "بیشینه",
    "memoryview": "نمای حافظه",
    "min": "کمینه",
    "next": "بعدی",
    "object": "شیء",
    "oct": "هشتادسیمال",
    "open": "باز کردن",
    "ord": "کد عددی",
    "pow": "توان",
    "property": "ویژگی",
    "range": "دامنه",
    "repr": "نمایش رشته‌ای",
    "reversed": "وارونه",
    "round": "گرد کردن",
    "set": "مجموعه",
    "setattr": "تنظیم ویژگی",
    "slice": "بُرش",
    "sorted": "مرتب‌سازی شده",
    "staticmethod": "متد ایستا",
    "str": "رشته",
    "sum": "جمع",
    "super": "ابر کلاس",
    "tuple": "تاپل",
    "type": "نوع",
    "vars": "متغیرها",
    "zip": "زیپ",
    "__import__": "وارد کردن"
};

const exceptions = {
    "ArithmeticError": "خطای ریاضی",
    "AssertionError": "خطای تایید",
    "AttributeError": "خطای ویژگی",
    "Exception": "استثناء",
    "EOFError": "خطای پایان فایل",
    "FloatingPointError": "خطای نقطه شناور",
    "GeneratorExit": "خروج مولد",
    "ImportError": "خطای وارد کردن",
    "IndentationError": "خطای تورفتگی",
    "IndexError": "خطای شاخص",
    "KeyError": "خطای کلید",
    "KeyboardInterrupt": "قطع کیبورد",
    "LookupError": "خطای جستجو",
    "MemoryError": "خطای حافظه",
    "NameError": "خطای نام",
    "NotImplementedError": "خطای پیاده‌سازی نشده",
    "OSError": "خطای سیستم عامل",
    "OverflowError": "خطای سرریز",
    "ReferenceError": "خطای ارجاع",
    "RuntimeError": "خطای زمان اجرا",
    "StopIteration": "پایان تکرار",
    "SyntaxError": "خطای نحو",
    "TabError": "خطای تب",
    "SystemError": "خطای سیستم",
    "SystemExit": "خروج سیستم",
    "TypeError": "خطای نوع",
    "UnboundLocalError": "خطای متغیر محلی بدون مقداردهی",
    "UnicodeError": "خطای یونی‌کد",
    "UnicodeEncodeError": "خطای کدگذاری یونی‌کد",
    "UnicodeDecodeError": "خطای کدگشایی یونی‌کد",
    "UnicodeTranslateError": "خطای ترجمه یونی‌کد",
    "ValueError": "خطای مقدار",
    "ZeroDivisionError": "خطای تقسیم بر صفر"
};



// Convert fython code to python
function translateToPython(code) {
    let pythonCode = code;
    for (const [fa, en] of Object.entries(translations)) {
        pythonCode = pythonCode.replaceAll(fa, en);
    }
    return pythonCode;
}

// Run code
document.getElementById('run-code').addEventListener('click', () => {
    const code = document.getElementById('code-editor').value;
    const pythonCode = translateToPython(code);
    skupt.configure({ output: (text) => document.getElementById('output').innerText += text});
    skulpt.run(pythonCode);
});

// Save in Localstorage
const editor = document.getElementById('code-editor');
editor.addEventListener('input', () => {
    localStorage.setItem('savedCode', editor.value);
});

// Recover saved code
window.addEventListener('load', () => {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) editor.value = savedCode;
});