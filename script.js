class DFA {
    constructor(name) {
        this.name = name;
        this.states = new Set();
        this.alphabet = new Set();
        this.initialState = null;
        this.finalStates = new Set();
        this.transitions = new Map();
    }

    addStates(statesStr) {
        const states = statesStr.split(',').map(s => s.trim());
        states.forEach(state => this.states.add(state));
    }

    addAlphabet(alphabetStr) {
        const symbols = alphabetStr.split(',').map(s => s.trim());
        symbols.forEach(symbol => this.alphabet.add(symbol));
    }

    setInitialState(state) {
        this.initialState = state.trim();
    }

    addFinalStates(statesStr) {
        const states = statesStr.split(',').map(s => s.trim());
        states.forEach(state => this.finalStates.add(state));
    }

    addTransitions(transitionsStr) {
        const transitions = transitionsStr.split(';');
        transitions.forEach(transition => {
            const parts = transition.split(',').map(s => s.trim());
            if (parts.length === 3) {
                const [fromState, symbol, toState] = parts;
                const key = `${fromState},${symbol}`;
                this.transitions.set(key, toState);
            }
        });
    }

    recognize(word) {
        let currentState = this.initialState;
        const trace = [currentState];

        // Manejar palabra vacía (epsilon)
        if (word === "") {
            const accepted = this.finalStates.has(currentState);
            return {
                accepted: accepted,
                trace: trace,
                finalState: currentState
            };
        }

        for (let i = 0; i < word.length; i++) {
            const symbol = word[i];
            const key = `${currentState},${symbol}`;
            
            if (!this.transitions.has(key)) {
                return {
                    accepted: false,
                    trace: trace,
                    error: `No hay transición desde ${currentState} con símbolo '${symbol}'`
                };
            }

            currentState = this.transitions.get(key);
            trace.push(currentState);
        }

        const accepted = this.finalStates.has(currentState);
        return {
            accepted: accepted,
            trace: trace,
            finalState: currentState
        };
    }

    isComplete() {
        return this.states.size > 0 && 
               this.alphabet.size > 0 && 
               this.initialState !== null && 
               this.finalStates.size > 0 && 
               this.transitions.size > 0;
    }

    getInfo() {
        return {
            name: this.name,
            states: Array.from(this.states),
            alphabet: Array.from(this.alphabet),
            initialState: this.initialState,
            finalStates: Array.from(this.finalStates),
            transitionsCount: this.transitions.size,
            isComplete: this.isComplete()
        };
    }
}

class AutomataManager {
    constructor() {
        this.automata = new Map();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const fileInput = document.getElementById('fileInput');
        const testButton = document.getElementById('testButton');
        const downloadExample = document.getElementById('downloadExample');
        const clearButton = document.getElementById('clearButton'); // Botón Limpiar

        fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        testButton.addEventListener('click', () => this.testWord());
        downloadExample.addEventListener('click', () => this.downloadExampleFile());
        clearButton.addEventListener('click', () => this.clearTest()); // Evento Limpiar
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Limpiar autómatas y UI anterior
        this.automata.clear();
        this.displayAutomata(); // Limpia la lista y el select
        this.clearTest(); // Limpia los resultados de la prueba
        document.getElementById('fileInfo').innerHTML = '';

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.parseAutomataFile(e.target.result);
                this.displayFileInfo(file.name);
                this.displayAutomata();
                this.showSections();
            } catch (error) {
                this.showError(`Error al procesar el archivo: ${error.message}`);
            }
        };
        reader.readAsText(file);
    }

    parseAutomataFile(content) {
        const lines = content.split('\n').filter(line => line.trim() !== '');
        
        lines.forEach((line, index) => {
            const parts = line.split(':');
            if (parts.length < 3) {
                console.warn(`Línea ${index + 1} ignorada: formato incorrecto.`);
                return;
            };

            const idInfo = parts[0].trim();
            const automataName = parts[1].trim();
            const information = parts.slice(2).join(':').trim();

            if (!this.automata.has(automataName)) {
                this.automata.set(automataName, new DFA(automataName));
            }

            const automata = this.automata.get(automataName);

            switch (idInfo) {
                case '1': automata.addStates(information); break;
                case '2': automata.addAlphabet(information); break;
                case '3': automata.setInitialState(information); break;
                case '4': automata.addFinalStates(information); break;
                case '5': automata.addTransitions(information); break;
                default:
                     console.warn(`Línea ${index + 1} ignorada: IdInfo '${idInfo}' desconocido.`);
            }
        });
    }

    displayFileInfo(filename) {
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.innerHTML = `
            <div class="success">
                ✅ Archivo cargado: <strong>${filename}</strong>
                <br>Autómatas encontrados: <strong>${this.automata.size}</strong>
            </div>
        `;
    }

    displayAutomata() {
        const automataList = document.getElementById('automataList');
        const automataSelect = document.getElementById('automataSelect');
        
        automataList.innerHTML = '';
        automataSelect.innerHTML = '<option value="">Seleccionar autómata...</option>';

        this.automata.forEach((automata, name) => {
            const info = automata.getInfo();
            
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            automataSelect.appendChild(option);

            const automataCard = document.createElement('div');
            automataCard.className = 'automata-card';
            automataCard.innerHTML = `
                <h3>${name} ${info.isComplete ? '✅' : '⚠️'}</h3>
                <div class="automata-details">
                    <p><strong>Estados:</strong> {${info.states.join(', ')}}</p>
                    <p><strong>Alfabeto:</strong> {${info.alphabet.join(', ')}}</p>
                    <p><strong>Estado inicial:</strong> ${info.initialState}</p>
                    <p><strong>Estados finales:</strong> {${info.finalStates.join(', ')}}</p>
                    <p><strong>Transiciones:</strong> ${info.transitionsCount}</p>
                    ${!info.isComplete ? '<p class="warning">⚠️ Autómata incompleto</p>' : ''}
                </div>
            `;
            automataList.appendChild(automataCard);
        });
    }

    testWord() {
        const automataName = document.getElementById('automataSelect').value;
        const word = document.getElementById('wordInput').value;
        const resultDiv = document.getElementById('result');
        const traceDiv = document.getElementById('trace');

        // Limpiar resultados anteriores
        resultDiv.innerHTML = '';
        traceDiv.innerHTML = '';

        if (!automataName) {
            this.showTestError('Selecciona un autómata');
            return;
        }

        const automata = this.automata.get(automataName);
        if (!automata.isComplete()) {
            this.showTestError('El autómata seleccionado está incompleto');
            return;
        }

        // --- VALIDACIÓN DEL ALFABETO ---
        const alphabet = automata.alphabet;
        for (const symbol of word) {
            if (!alphabet.has(symbol)) {
                this.showTestError(`El símbolo '<strong>${symbol}</strong>' no pertenece al alfabeto del autómata {${Array.from(alphabet).join(', ')}}.`);
                return; // Detener ejecución
            }
        }
        // --- FIN DE VALIDACIÓN ---

        const result = automata.recognize(word);
        
        resultDiv.innerHTML = `
            <div class="${result.accepted ? 'success' : 'error'}">
                <h3>${result.accepted ? '✅ ACEPTADA' : '❌ RECHAZADA'}</h3>
                <p>La palabra "<strong>${word || 'ε'}</strong>" ${result.accepted ? 'es reconocida' : 'no es reconocida'} por el autómata <strong>${automataName}</strong></p>
                ${result.error ? `<p class="error-detail">${result.error}</p>` : ''}
                ${result.finalState ? `<p>Estado final: <strong>${result.finalState}</strong></p>` : ''}
            </div>
        `;

        // Mostrar traza
        if (result.trace) {
            traceDiv.innerHTML = `
                <div class="trace-container">
                    <h4>🔍 Traza de ejecución:</h4>
                    <div class="trace-steps">
                        ${this.generateTraceSteps(word, result.trace)}
                    </div>
                </div>
            `;
        }
    }

    generateTraceSteps(word, trace) {
        if (word.length === 0) {
            return `<div class="trace-step">Inicio (palabra vacía): <strong>${trace[0]}</strong></div>`;
        }
        
        let steps = [`<div class="trace-step">Inicio: <strong>${trace[0]}</strong></div>`];
        
        for (let i = 0; i < word.length; i++) {
            if (i + 1 < trace.length) {
                steps.push(`
                    <div class="trace-step">
                        Símbolo '<strong>${word[i]}</strong>' → <strong>${trace[i + 1]}</strong>
                    </div>
                `);
            }
        }
        
        return steps.join('');
    }

    showSections() {
        // Se usa classList en lugar de style.display
        document.getElementById('automataSection').classList.remove('hidden');
        document.getElementById('testSection').classList.remove('hidden');
    }

    // Muestra errores en el área de carga de archivos
    showError(message) {
        const fileInfo = document.getElementById('fileInfo');
        fileInfo.innerHTML = `<div class="error">❌ ${message}</div>`;
    }

    // Muestra errores en el área de prueba
    showTestError(message) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<div class="error">❌ ${message}</div>`;
        document.getElementById('trace').innerHTML = ''; // Limpiar traza si hay error
    }

    // Limpia el área de prueba
    clearTest() {
        document.getElementById('wordInput').value = '';
        document.getElementById('result').innerHTML = '';
        document.getElementById('trace').innerHTML = '';
    }

    downloadExampleFile() {
        const exampleContent = `1:AF04:q0,q1,q2
2:AF04:a,b
3:AF04:q0
4:AF04:q1
5:AF04:q0,a,q1;q0,b,q2;q1,a,q1;q1,b,q2;q2,a,q1;q2,b,q0
1:AF05:p0,p1,p2,p3
2:AF05:0,1
3:AF05:p0
4:AF05:p3
5:AF05:p0,0,p1;p0,1,p0;p1,0,p2;p1,1,p0;p2,0,p3;p2,1,p0;p3,0,p3;p3,1,p3`;

        const blob = new Blob([exampleContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'automatas_ejemplo.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    new AutomataManager();
});
