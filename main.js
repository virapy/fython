const translations = {
    keywords: {
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
        "yield": "بازده",
    },
    builtinFunctions: {
        "print": "چاپ",
        "strip": "حذف فاصله",
        "split": "جدا کردن",
        "sum": "جمع",
        "list": "لیست",
        "abs": "قدر مطلق",
        "all": "همه",
        "any": "هر یک",
        "bin": "دودویی",
        "bool": "بولین",
        "breakpoint": "نقطه توقف",
        "bytearray": "آرایه بایت",
        "bytes": "بایت‌ها",
        "callable": "قابل فراخوانی",
        "chr": "کاراکتر",
        "dict": "دیکشنری",
        "dir": "فهرست",
        "enumerate": "شماره‌گذاری",
        "eval": "ارزیابی",
        "exec": "اجرا",
        "filter": "فیلتر",
        "float": "شناور",
        "format": "قالب",
        "globals": "متغیرهای سراسری",
        "hex": "هگزادسیمال",
        "id": "شناسه",
        "input": "ورودی",
        "int": "عدد صحیح",
        "len": "طول",
        "max": "بیشینه",
        "min": "کمینه",
        "open": "باز کردن",
        "pow": "توان",
        "range": "دامنه",
        "reversed": "وارونه",
        "round": "گرد کردن",
        "sorted": "مرتب‌سازی شده",
        "str": "رشته",
        "sum": "جمع",
        "tuple": "تاپل",
        "type": "نوع",
        "vars": "متغیرها",
        "zip": "زیپ",
    },
    exceptions: {
        "ArithmeticError": "خطای ریاضی",
        "AttributeError": "خطای ویژگی",
        "Exception": "استثناء",
        "IndexError": "خطای شاخص",
        "KeyError": "خطای کلید",
        "MemoryError": "خطای حافظه",
        "NameError": "خطای نام",
        "TypeError": "خطای نوع",
        "ValueError": "خطای مقدار",
        "ZeroDivisionError": "خطای تقسیم بر صفر",
    }
};



function translateToPython(code) {
    let pythonCode = code;

    // ترجمه کلمات کلیدی
    for (const [en, fa] of Object.entries(translations.keywords)) {
        const regex = new RegExp(`\\b${fa}\\b`, "g");
        pythonCode = pythonCode.replace(regex, en);
    }

    // ترجمه توابع داخلی
    for (const [en, fa] of Object.entries(translations.builtinFunctions)) {
        const regex = new RegExp(`\\b${fa}\\b`, "g");
        pythonCode = pythonCode.replace(regex, en);
    }

    // ترجمه استثناءها
    for (const [en, fa] of Object.entries(translations.exceptions)) {
        const regex = new RegExp(`\\b${fa}\\b`, "g");
        pythonCode = pythonCode.replace(regex, en);
    }

    return pythonCode;
}

function runCode(persianCode) {
    const pythonCode = translateToPython(persianCode);

    Skulpt.configure({
        output: function (text) {
            const outputDiv = document.getElementById('output');
            outputDiv.innerText += text;
        },
        read: function (x) {
            if (Skulpt.builtinFiles === undefined || Skulpt.builtinFiles["files"][x] === undefined) {
                throw `File not found: '${x}'`;
            }
            return Skulpt.builtinFiles["files"][x];
        },
    });

    Skulpt.misceval.asyncToPromise(() => Skulpt.importMainWithBody("<stdin>", false, pythonCode, true))
        .catch((err) => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerText = `خطا: ${err.toString()}`;
        });
}

// // Run code
// document.getElementById('run-code').addEventListener('click', () => {
//     const code = document.getElementById('code-editor').value;
//     const pythonCode = translateToPython(code);
//     skupt.configure({ output: (text) => document.getElementById('output').innerText += text});
//     skulpt.run(pythonCode);
// });

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