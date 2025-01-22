const translations = {
	"keywords": {
		"اگر ": "if ",
		"دیگر ": "elif ",
		"وگرنه": "else",
		"برای ": "for ",
		"در ": "in ",
		"یا ": "or ",
		"و ": "and ",
		"بازگرداندن ": "return ",
		"تعریف ": "def ",
		"از ": "from ",
		"وارد ": "import ",
		"کلاس ": "class ",
		"تا ": "while ",
		"همچون ": "as ",
		"تایید ": "assert ",
		"شکستن": "break",
		"ادامه": "continue",
		"حذف ": "del ",
		"استثنا ": "except ",
		"نادرست": "False",
		"درست": "True",
		"نهایت": "finally",
		"سراسری ": "global ",
		"است ": "is ",
		"لاندا ": "lambda ",
		"هیچ": "None",
		"غیرمحلی ": "nonlocal",
		"نه ": "not ",
		"تلاش": "try",
		"با ": "with ",
		"بازده": "yield"
	},
	"builtinFunctions": {
		"چاپ": "print",
		"تراش": "strip",
		"جدا": "split",
		"جمع": "sum",
		"فهرست": "list",
		"قدر": "abs",
		"همه": "all",
		"هر": "any",
		"دوتایی": "bin",
		"منطقی": "bool",
		"نقطه توقف": "breakpoint",
		"بایت": "bytearray",
		"بایت‌ها": "bytes",
		"فراخوان": "callable",
		"کاراکتر": "chr",
		"دیکشنری": "dict",
		"خصیصه": "dir",
		"شماره‌گذاری": "enumerate",
		"ارزیابی": "eval",
		"اجرا": "exec",
		"فیلتر": "filter",
		"شناور": "float",
		"قالب": "format",
		"سراسری": "globals",
		"هگز": "hex",
		"شناسه": "id",
		"ورودی": "input",
		"صحیح": "int",
		"طول": "len",
		"بیشینه": "max",
		"کمینه": "min",
		"باز": "open",
		"توان": "pow",
		"دامنه": "range",
		"وارونه": "reversed",
		"گرد": "round",
		"مرتب‌": "sorted",
		"رشته": "str",
		"تاپل": "tuple",
		"نوع": "type",
		"متغیرها": "vars",
		"زیپ": "zip",
		"افزودن": "append",
		"اف\"": "f\"",
		"آر\"": "r\"",
		"یو\"": "u\"",

	},
	"exceptions": {
		"خطای ریاضی": "ArithmeticError",
		"خطای ویژگی": "AttributeError",
		"استثناء": "Exception",
		"خطای شاخص": "IndexError",
		"خطای کلید": "KeyError",
		"خطای حافظه": "MemoryError",
		"خطای نام": "NameError",
		"خطای نوع": "TypeError",
		"خطای مقدار": "ValueError",
		"خطای تقسیم بر صفر": "ZeroDivisionError"
	},
	"persianNumbers" : {
	  '۰': '0',
	  '۱': '1',
	  '۲': '2',
	  '۳': '3',
	  '۴': '4',
	  '۵': '5',
	  '۶': '6',
	  '۷': '7',
	  '۸': '8',
	  '۹': '9'
  },
  "farKeyMappings" : {
	"+": "+",
	"-": "-",
	"ـ": "_",
	"*": "*",
	"/": "/",
	"\u066A": "%",
	"=": "=",
	"!": "!",
	"<": "<",
	">": ">",
	"(": "(",
	")": ")",
	"[": "[",
	"]": "]",
	"{": "{",
	"}": "}",
	":": ":",
	",": ",",
	".": ".",
	"\\": "\\",
	"\u066C": "@",
	"\u060C": "&",
	"|": "|",
	"\u00D7": "^",
	"\u200F\u00F7": "~",
	"٫": "#"
}
};


	function replaceKeywords() {
		let codeElement = document.getElementById('code');
		let code = codeElement.value;
		for (let [key, value] of Object.entries(translations.keywords)) {
			code = code.replaceAll(key, value);
		}
		for (let [key, value] of Object.entries(translations.builtinFunctions)) {
			code = code.replaceAll(key, value);

		}
		for (let [key, value] of Object.entries(translations.persianNumbers)) {
			code = code.replaceAll(key, value);

		}
		for (let [key, value] of Object.entries(translations.farKeyMappings)) {
			code = code.replaceAll(key, value);

		}

		return code;
	}

	let pyodideReady = false;
	let pyodide;

	async function loadPyodideOnce() {
		if (!pyodideReady) {
			pyodide = await loadPyodide();
			pyodideReady = true;
		}
	}

	async function runPythonCode() {
		const code = replaceKeywords();
		console.log(code)
		const outputElement = document.getElementById('output');
		await loadPyodideOnce();
		try {
			pyodide.runPython('import sys\nimport io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()');
			const result = await pyodide.runPythonAsync(code);
			const stdout = pyodide.runPython("sys.stdout.getvalue()");
			const stderr = pyodide.runPython("sys.stderr.getvalue()");
			outputElement.innerHTML = `<pre>${stdout}</pre>`;
			if (stderr) {
				outputElement.innerHTML += `<pre style="color: red;">${stderr}</pre>`;
			}
		} catch (error) {
			outputElement.innerHTML = `<pre style="color: red;">${error.message}</pre>`;
		}
	}

	loadPyodideOnce();

	function toggleTheme() {
		document.body.classList.toggle('dark-mode');
		document.body.classList.toggle('light-mode');
	}

	// تنظیم تم پیش‌فرض
	document.body.classList.add('dark-mode');