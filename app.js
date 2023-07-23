let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');

const showQuestion = (question) => {
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(option === question.answer));
        optionsElement.appendChild(button);
    });
};

const checkAnswer = (isCorrect) => {
    if (isCorrect) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion(questions[currentQuestion]);
    } else {
        showResult();
    }
};

const showResult = () => {
    questionElement.textContent = `Your score: ${score} out of ${questions.length}`;
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
};

nextButton.addEventListener('click', () => {
    showQuestion(questions[currentQuestion]);
});

showQuestion(questions[currentQuestion]);

// ... (existing code)

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-btn');

let questions = []; // Array to store the questions

const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        const jsonQuestions = XLSX.utils.sheet_to_json(worksheet);
        questions = jsonQuestions;
        currentQuestion = 0;
        score = 0;
        showQuestion(questions[currentQuestion]);
    };
};

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    readExcelFile(file);
});

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

// ... (existing code)
// ... (existing code)

const fetchQuestionsFromSource = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        questions = data;
        currentQuestion = 0;
        score = 0;
        showQuestion(questions[currentQuestion]);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

// ... (existing code)

// ... (existing code)

const sourceUrlInput = document.getElementById('source-url');
const fetchButton = document.getElementById('fetch-btn');

fetchButton.addEventListener('click', () => {
    const sourceUrl = sourceUrlInput.value;
    if (sourceUrl) {
        fetchQuestionsFromSource(sourceUrl);
    }
});

// ... (existing code)
