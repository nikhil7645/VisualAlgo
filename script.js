let array = [];
function delay(ms) {
    const speed = document.getElementById("speed").value; // Dynamically fetch speed
    const adjustedDelay = ms / speed; // Adjust delay based on speed
    return new Promise((resolve) => setTimeout(resolve, adjustedDelay));
}
function generateArray() {
    const arraySize = document.getElementById("array-size").value;
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1);
    renderBars();
}

function renderBars() {
    const container = document.getElementById("bar-container");
    container.innerHTML = "";
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.className = "bar";
        container.appendChild(bar);
    });
}

function startSorting(type) {
    if (type === "bubble") bubbleSort();
    else if (type === "quick") quickSortHandler();
    else if (type === "merge") mergeSortHandler();
    else if (type === "insertion") insertionSortHandler();
    else if (type === "selection") selectionSortHandler();
    else if (type === "radix") radixSortHandler();
}

// Bubble Sort
async function bubbleSort() {
    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value * 2;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            await delay(100 / speed);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderBars();
            }
            bars[j].style.backgroundColor = "#4caf50";
            bars[j + 1].style.backgroundColor = "#4caf50";
        }
    }
}

// Quick Sort
async function quickSortHandler() {
    await quickSort(0, array.length - 1);
    renderBars();
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.getElementsByClassName("bar");
    const pivot = array[high];
    let i = low - 1;
    const speed = document.getElementById("speed").value * 2;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";
        bars[high].style.backgroundColor = "blue";
        await delay(100 / speed);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            renderBars();
        }
        bars[j].style.backgroundColor = "#4caf50";
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    renderBars();
    return i + 1;
}

// Merge Sort
async function mergeSortHandler() {
    await mergeSort(0, array.length - 1);
    renderBars();
}

async function mergeSort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    const speed = document.getElementById("speed").value * 2;
    const leftPart = array.slice(left, mid + 1);
    const rightPart = array.slice(mid + 1, right + 1);

    let i = left, j = 0, k = 0;

    while (j < leftPart.length && k < rightPart.length) {
        await delay(100 / speed);
        if (leftPart[j] <= rightPart[k]) {
            array[i++] = leftPart[j++];
        } else {
            array[i++] = rightPart[k++];
        }
        renderBars();
    }

    while (j < leftPart.length) {
        await delay(100 / speed);
        array[i++] = leftPart[j++];
        renderBars();
    }

    while (k < rightPart.length) {
        await delay(100 / speed);
        array[i++] = rightPart[k++];
        renderBars();
    }
}

// Insertion Sort
async function insertionSortHandler() {
    await insertionSort();
    renderBars();
}

async function insertionSort() {
    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value * 2;

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            bars[j + 1].style.backgroundColor = "red";
            await delay(100 / speed);
            array[j + 1] = array[j];
            renderBars();
            bars[j + 1].style.backgroundColor = "#4caf50";
            j--;
        }
        array[j + 1] = key;
        renderBars();
    }
}

// Selection Sort
async function selectionSortHandler() {
    await selectionSort();
    renderBars();
}

async function selectionSort() {
    const bars = document.getElementsByClassName("bar");
    const speed = document.getElementById("speed").value * 2;

    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = "red";
            await delay(100 / speed);
            if (array[j] < array[minIdx]) minIdx = j;
            bars[j].style.backgroundColor = "#4caf50";
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        renderBars();
    }
}

// Radix Sort
async function radixSortHandler() {
    await radixSort();
    renderBars();
}

async function radixSort() {
    const max = Math.max(...array);
    const speed = document.getElementById("speed").value * 2;

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const output = Array(array.length).fill(0);
        const count = Array(10).fill(0);

        array.forEach((num) => {
            const index = Math.floor(num / exp) % 10;
            count[index]++;
        });

        for (let i = 1; i < 10; i++) count[i] += count[i - 1];

        for (let i = array.length - 1; i >= 0; i--) {
            const index = Math.floor(array[i] / exp) % 10;
            output[--count[index]] = array[i];
        }

        for (let i = 0; i < array.length; i++) {
            await delay(100 / speed);
            array[i] = output[i];
            renderBars();
        }
    }
}

// Utility Function
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

generateArray();








