let pyodide = null;
let pyodideReady = false;

// بارگذاری Pyodide به صورت Lazy
async function loadPyodideOnce() {
    if (!pyodideReady) {
        pyodide = await loadPyodide();
        pyodideReady = true;
    }
}

async function initializePyodide() {
    pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        packages: ["numpy", "pandas"]  // فقط پکیج‌های مورد نیاز
    });
    pyodideReady = true;
}



function convertLineNumbersToPersian() {
    setTimeout(() => {
        document.querySelectorAll(".CodeMirror-linenumber").forEach(el => {
            el.textContent = toPersianDigits(el.textContent.trim());
        });
    }, 10);
}


var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "farsi-python",
    lineNumbers: true,
    matchBrackets: true,
    styleActiveLine: true,
    autoCloseBrackets: true,
    rtlMoveVisually: true,
    gutters: ["CodeMirror-linenumbers"],
    lineWrapping: true,
});

editor.on("renderLine", function (cm, line, elt) {
    convertLineNumbersToPersian();
});


editor.on("keydown", function(cm, event) {
    if (event.key === "Tab") {
        setTimeout(() => {
            cm.refresh();  // ← بازسازی ادیتور برای اعمال صحیح تغییرات
        }, 0);
    }
});

setTimeout(convertLineNumbersToPersian, 1);

function toPersianDigits(num) {
    const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    return num.toString().replace(/[0-9]/g, d => persianDigits[d]);
}

editor.on("renderLine", function (cm, line, elt) {
    setTimeout(() => {
        document.querySelectorAll(".CodeMirror-linenumber").forEach(el => {
            el.textContent = toPersianDigits(el.textContent.trim());
        });
    }, 10);
});

const translations = new Map([
    // صورتی (pink) - کلمات کلیدی
    ["وارد", "import"], ["از", "from"], ["دفع", "raise"], ["اگر", "if"], ["دیگر", "elif"], 
    ["وگرنه", "else"], ["برای", "for"], ["تا", "while"], ["در", "in"], ["بازگرداندن", "return"], 
    ["همچون", "as"], ["تایید", "assert"], ["شکستن", "break"], ["ادامه", "continue"], 
    ["حذف", "del"], ["استثنا", "except"], ["نادرست", "False"], ["درست", "True"], 
    ["درنهایت", "finally"], ["سراسری", "global"], ["هست", "is"], ["لاندا", "lambda"], 
    ["هیچ", "None"], ["غیرمحلی", "nonlocal"], ["تلاش", "try"], ["با", "with"], 
    ["بازده", "yield"], ["تطابق", "match"], ["حالت", "case"], ["ناهمگام", "async"], 
    ["منتظر", "await"],
    
    // آبی (blue) - تعریف‌ها و کلاس‌ها
    ["تعریف", "def"], ["کلاس", "class"],
    
    // زرد (yellow) - توابع داخلی
    ["چاپ", "print"], ["تراش", "strip"], ["جدا", "split"], ["لیست", "list"], 
    ["کاراکتر", "chr"], ["رشته", "str"], ["طول", "len"], ["قالب", "format"], 
    ["نمایش", "repr"], ["ترتیب", "ord"], ["حذف_ویژگی", "delattr"], ["عبور", "pass"], 
    ["قدرمطلق", "abs"], ["جمع", "sum"], ["دوتایی", "bin"], ["منطقی", "bool"], 
    ["شناور", "float"], ["صحیح", "int"], ["بیشینه", "max"], ["کمینه", "min"], 
    ["توان", "pow"], ["دامنه", "range"], ["گرد", "round"], ["دیکشنری", "dict"], 
    ["شمارش", "enumerate"], ["فیلتر", "filter"], ["جهانی", "globals"], ["ورودی", "input"], 
    ["تاپل", "tuple"], ["مجموعه", "set"], ["زیپ", "zip"], ["نقشه", "map"], ["نوع", "type"], 
    ["شناسه", "id"], ["شی", "object"], ["مختلط", "complex"], ["نمونه", "isinstance"], 
    ["همه", "all"], ["هر", "any"], ["خوانا", "ascii"], ["آرایه", "bytearray"], 
    ["بایت", "bytes"], ["فراخوانی", "callable"], ["کلاسی", "classmethod"], ["ترکیب", "compile"], 
    ["فهرست", "dir"], ["تقسیم", "divmod"], ["ارزیابی", "eval"], ["اجرا", "exec"], 
    ["دریافت", "getattr"], ["ویژگی دارد", "hasattr"], ["کمک", "help"], ["هگزا", "hex"], 
    ["زیر کلاس", "issubclass"], ["بعدی", "next"], ["هشتایی", "oct"], ["باز", "open"], 
    ["تنظیم", "setattr"], ["برش", "slice"], ["مرتب", "sorted"], ["ایستا", "staticmethod"], 
    ["ویژگی", "property"], ["ممتاز", "super"], ["متغیرها", "vars"], ["معکوس", "reversed"], 
    ["هش", "hash"], ["تکرار", "iter"], ["محلی", "locals"], ["حافظه", "memoryview"], 
    ["شکست", "breakpoint"],
    
    // آسمانی (skyblue) - self
    ["خود", "self"],
    
    // سفید (white) - عملگرهای منطقی
    ["یا", "or"], ["و", "and"], ["نه", "not"],
    
    // سبز روشن (lightgreen) - اعداد فارسی
    ["۰", "0"], ["۱", "1"], ["۲", "2"], ["۳", "3"], ["۴", "4"], ["۵", "5"], 
    ["۶", "6"], ["۷", "7"], ["۸", "8"], ["۹", "9"],
    
    // 🔸 مقادیر ثابت (literal)
    ["ــ‌دیباگ‌ــ", "__debug__"], 
    ["الیپس", "Ellipsis"], 
    ["نادرست", "False"], 
    ["هیچ", "None"], 
    ["اجراـ‌نشده", "NotImplemented"], 
    ["درست", "True"],
    
    // 🔹 انواع داده (type)
    ["هر‌نوع", "Any"], 
    ["قابل‌ـ‌فراخوانی", "Callable"], 
    ["روال", "Coroutine"], 
    ["نوع‌ـ‌دیکشنری", "Dict"], 
    ["نوع‌ـ‌لیست", "List"], 
    ["مقدار‌ـثابت", "Literal"], 
    ["نوع‌ـ‌عمومی", "Generic"], 
    ["نوع‌ـ‌اختیاری", "Optional"], 
    ["نوع‌ـ‌دنباله", "Sequence"], 
    ["نوع‌ـ‌مجموعه", "Set"], 
    ["نوع‌ـ‌تاپل", "Tuple"], 
    ["نوع", "Type"], 
    ["نوع‌ـ‌اجتماع", "Union"]
    
]);
    


function toEnglishDigits(num) {
    let persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    let englishDigits = ['0','1','2','3','4','5','6','7','8','9'];
    return num.replace(/[\u06F0-\u06F9]/g, d => englishDigits[persianDigits.indexOf(d)]);
}

function replaceKeywords() {
    if (!translations || !(translations instanceof Map)) {
        console.error('Translations not loaded yet');
        return ''; 
    }

    let code = editor.getValue();
    let strings = [];
    let index = 0;

    // استخراج عبارات داخل کوتیشن و جایگذاری آن‌ها با توکن
    code = code.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, match => {
        strings.push(match);
        return `__STR${index++}__`;
    });
    

    const regexPatterns = [
        /(?:^|[\s\(\){}:])(و|همچون|تایید|ناهمگام|منتظر|شکستن|حالت|کلاس|ادامه|تعریف|حذف|دیگر|وگرنه|استثنا|درنهایت|برای|از|سراسری|اگر|وارد|در|هست|لاندا|تطابق|نه|یا|عبور|دفع|بازگرداندن|تلاش|تا|با|بازده)(?=$|[\s\(\){}:])/gu,
        /(?:^|[\s\(\){}:])(ــ‌وارد‌ــ|قدرمطلق|همه|هر|خوانا|دوتایی|منطقی|شکست|آرایه|بایت|فراخوانی|کاراکتر|کلاسی|ترکیب|مختلط|حذف_ویژگی|دیکشنری|فهرست|تقسیم|شمارش|ارزیابی|اجرا|فیلتر|شناور|قالب|frozenset|دریافت|جهانی|hasattr|هش|کمک|هگزا|شناسه|ورودی|صحیح|نمونه|issubclass|تکرار|طول|لیست|محلی|نقشه|بیشینه|حافظه|کمینه|بعدی|شی|هشتایی|باز|ترتیب|توان|چاپ|ویژگی|دامنه|نمایش|معکوس|گرد|مجموعه|تنظیم|برش|مرتب|ایستا|رشته|جمع|ممتاز|تاپل|نوع|متغیرها|زیپ)(?=$|[\s\(\){}:])/gu,
        /(?:^|[\s\(\){}:])(ــ‌دیباگ‌ــ|الیپس|نادرست|هیچ|اجراـ‌نشده|درست)(?=$|[\s\(\){}:])/gu,
        /(?:^|[\s\(\){}:])(هر‌نوع|قابل‌ـ‌فراخوانی|روال|نوع‌ـ‌دیکشنری|نوع‌ـ‌لیست|نوع‌ـ‌اختیاری|نوع‌ـ‌عمومی|مقدار‌ـثابت|نوع‌ـ‌دنباله|نوع‌ـ‌مجموعه|نوع‌ـ‌تاپل|نوع|نوع‌ـ‌اجتماع)(?=$|[\s\(\){}:])/gu,
        /[\p{L}_][\p{L}\p{N}_]*/gu,
        /[۰-۹0-9]+/g,
        /"(?:\\.|[^\\"])*"/g,
        /'(?:\\.|[^\\'])*'/g,
        /#.*/g
    ];

    // استفاده از regex برای جایگزینی کلمات کلیدی
    regexPatterns.forEach(pattern => {
        code = code.replace(pattern, match => translations.get(match) || match);
    });
    // **تبدیل اعداد فارسی به انگلیسی**
    code = toEnglishDigits(code);

    code = code.replace(/__STR(\d+)__/g, (match, num) => strings[num]);

    console.log(code); // برای بررسی خروجی ترجمه‌شده
    return code;
}


function replacePersianComma(code) {
    const stringPattern = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    let matches = code.match(stringPattern) || [];


    let placeholders = {};
    matches.forEach((str, i) => {
        let key = `@@${i}@@`;
        placeholders[key] = str;
        code = code.replace(str, key);
    });

    code = code.replace(/،/g, ',');

    Object.keys(placeholders).forEach(key => {
        code = code.replace(key, placeholders[key]);
    });

    return code;
}

//TODO
function convertPersianFString(code) {
    // to F-String ف -> f
    code =  code.replace(/(?<!["'])ف(?=["'])/g, "f");

    // to change Unicode ی -> u
    code = code.replace(/(?<!["'])ی(?=["'])/g, "u");

    // to change RegEx ر -> r
    code = code.replace(/(?<!["'])ر(?=["'])/g, "r");

    // to change Binary ب -> b
    code = code.replace(/(?<!["'])ب(?=["'])/g, "b");

    return code;
}



async function runCode() {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = "در حال اجرا...";
    
    if (!pyodideReady) {
        await loadPyodideOnce();
    }
    
    let code = replaceKeywords();
    code = replacePersianComma(code);
    code = convertPersianFString(code);
    
    if (!code.trim()) {
        outputElement.innerHTML = "<pre style='color: red;'>خطایی رخ داده است: کد خالی است.</pre>";
        return;
    }

    try {
        pyodide.runPython('import sys\nimport io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()');
        await pyodide.runPythonAsync(code);
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");
        outputElement.innerHTML = `<pre>${stdout}</pre>`;
        if (stderr) {
            outputElement.innerHTML += `<pre style="color: red;">${stderr}</pre>`;
        }
    } catch (error) {
        outputElement.innerHTML = `<pre style="color: red;">خطا: ${error.message}</pre>`;
    }
}


// async function runCode() {
//     if (!pyodide) {
//         await loadPyodideOnce();
//     }
//     const outputElement = document.getElementById('output');
//     outputElement.innerHTML = "در حال اجرا...";
//     let code = replaceKeywords();
//     if (!code.trim()) {
//         outputElement.innerHTML = "<pre style='color: red;'>خطایی رخ داده است: کد خالی است.</pre>";
//         return;
//     }
//     try {
//         pyodide.runPython('import sys\nimport io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()');
//         await pyodide.runPythonAsync(code);
//         const stdout = pyodide.runPython("sys.stdout.getvalue()");
//         const stderr = pyodide.runPython("sys.stderr.getvalue()");
//         outputElement.innerHTML = `<pre>${stdout}</pre>`;
//         if (stderr) {
//             outputElement.innerHTML += `<pre style="color: red;">${stderr}</pre>`;
//         }
//     } catch (error) {
//         outputElement.innerHTML = `<pre style="color: red;">خطا: ${error.message}</pre>`;
//     }
// }
