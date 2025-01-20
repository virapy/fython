let pyodideReady = false;
let pyodide;

async function loadPyodideOnce() {
	if (!pyodideReady) {
		pyodide = await loadPyodide();
		pyodideReady = true;
	}
}

async function runPythonCode() {
	const code = document.getElementById('code').value;
	const outputElement = document.getElementById('output');
	
	await loadPyodideOnce();
	
	try {
		pyodide.runPython(`import sys\nimport io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()`);
		const result = await pyodide.runPythonAsync(code);
		const stdout = pyodide.runPython("sys.stdout.getvalue()");
		const stderr = pyodide.runPython("sys.stderr.getvalue()");
		
		outputElement.innerHTML = `<pre>${stdout}</pre>`;
		if (stderr) {
			outputElement.innerHTML += `<pre style=\"color: red;\">${stderr}</pre>`;
		}
	} catch (error) {
		outputElement.innerHTML = `<pre style=\"color: red;\">${error}</pre>`;
	}
}

// بارگذاری اولیه Pyodide
loadPyodideOnce();