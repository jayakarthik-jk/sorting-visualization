let gap = 1;
let width = 10;
let padding = 150;
let bottom = 100;
let delay = 30;
let active_bg = "tomato";
const array = [];
const containerWidth = window.innerWidth - padding;
const containerHeight = window.innerHeight - bottom * 2;
const container = document.createElement("div");
let total = Math.floor(containerWidth / (width + gap));
let algorithm = "selection";
let totalComparison = 0;
let timeid = null;
let totalComparsionDiv;
let timeTakenDiv;
let time_taken = {
  min: 0,
  sec: 0,
  ms: 0,
};
let playable = false;

// utility functions
const incTimeTaken = () => {
  time_taken.ms += 10;
  if (time_taken.ms >= 1000) {
    time_taken.ms = 0;
    time_taken.sec++;
  }
  if (time_taken.sec >= 60) {
    time_taken.sec = 0;
    time_taken.min++;
  }
  timeTakenDiv.innerHTML = Object.keys(time_taken)
    .map((key) => {
      if (key === "ms") return time_taken[key] / 10;
      return time_taken[key].toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    })
    .join(":");
};

const incCompareCount = () => {
  totalComparison++;
  totalComparsionDiv.innerText = totalComparison;
};

const resetStat = () => {
  totalComparison = 0;
  time_taken = {
    min: 0,
    sec: 0,
    ms: 0,
  };
  timeTakenDiv.innerHTML = Object.keys(time_taken)
    .map((key) =>
      time_taken[key].toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    )
    .join(":");
};

const range = (value) => containerHeight * ((value - 0) / (total - 0));

const getPosition = (index) => (width + gap) * index + padding / 2 + "px";

const arrange = () =>
  array.forEach((div, i) => (div.style.left = getPosition(i)));

const setActive = (index) => (array[index].style.backgroundColor = active_bg);

const setInActive = (index) => (array[index].style.backgroundColor = "white");

const enable = (...els) => els.forEach((el) => el.removeAttribute("disabled"));

const disable = (...els) =>
  els.forEach((el) => el.setAttribute("disabled", true));

const play = () => {
  if (playable) {
    let audio = new Audio("./src/assets/sound.mp3");
    audio.play().then(() => {
      audio = null;
    });
  }
};

// mobile view alert
window.addEventListener("load", () => {
  if (window.innerWidth < 800) {
    alert(
      "This site is not optimized for mobile view yet, turn on desktop mode"
    );
  }
});

// execution starting point
document.addEventListener("DOMContentLoaded", () => {
  const speedBtn = document.getElementById("speed-btn");
  const speedBtnIcon = document.getElementById("speed-btn-icon");
  totalComparsionDiv = document.getElementById("total_comparison");
  timeTakenDiv = document.getElementById("time_taken");
  speedBtn.addEventListener("click", () => {
    play();
    switch (speedBtn.getAttribute("data-speed")) {
      case "slow":
        speedBtn.setAttribute("data-speed", "medium");
        speedBtnIcon.className = "fa-solid fa-car";
        delay = 50;
        break;
      case "medium":
        speedBtn.setAttribute("data-speed", "fast");
        speedBtnIcon.className = "fa-solid fa-rocket";
        delay = 5;
        break;
      case "fast":
        speedBtn.setAttribute("data-speed", "slow");
        speedBtnIcon.className = "fa-solid fa-motorcycle";
        delay = 100;
        break;
    }
    if (timeid) {
      clearInterval(timeid);
      timeid = setInterval(incTimeTaken, delay / 3);
    }
  });
  const sizeBtn = document.getElementById("size-btn");
  const sizeBtnIcon = document.getElementById("size-btn-icon");
  sizeBtn.addEventListener("click", () => {
    play();
    switch (sizeBtn.getAttribute("data-size")) {
      case "small":
        sizeBtn.setAttribute("data-size", "medium");
        sizeBtnIcon.className = "fa-solid fa-2";
        width = 10;
        break;
      case "medium":
        sizeBtn.setAttribute("data-size", "large");
        sizeBtnIcon.className = "fa-solid fa-3";
        width = 15;
        break;
      case "large":
        sizeBtn.setAttribute("data-size", "small");
        sizeBtnIcon.className = "fa-solid fa-1";
        width = 5;
        break;
    }
    init();
  });
  const algorithmList = document.getElementById("algorithm-list");
  const tooltipText = document.getElementById("tooltiptext");
  algorithmList.addEventListener("click", play);
  algorithmList.addEventListener("change", () => {
    algorithm = algorithmList.options[algorithmList.selectedIndex].value;
    tooltipText.innerHTML = desc[algorithm];
  });
  const shuffleBtn = document.getElementById("shuffle-btn");
  shuffleBtn.addEventListener("click", () => {
    play();
    init();
  });
  const playBtn = document.getElementById("play-btn");
  playBtn.addEventListener("click", async () => {
    play();
    disable(playBtn, shuffleBtn, sizeBtn, algorithmList);
    await run();
    enable(playBtn, shuffleBtn, sizeBtn, algorithmList);
  });
  const volumeBtn = document.getElementById("volume-btn");
  const volumeBtnIcon = document.getElementById("volume-btn-icon");
  volumeBtn.addEventListener("click", () => {
    play();
    playable = !playable;
    volumeBtnIcon.className = playable
      ? "fa-solid fa-volume-high"
      : "fa-solid fa-volume-xmark";
  });
  init();
});

function init() {
  create();
  shuffle();
  arrange();
  display();
}

async function run() {
  resetStat();
  let sort;
  switch (algorithm) {
    case "selection":
      sort = selectionSort;
      break;
    case "bubble":
      sort = bubbleSort;
      break;
    case "cocktail":
      sort = cocktailSort;
      break;
    case "odd-even":
      sort = oddEvenSort;
      break;
    case "gnome":
      sort = gnomeSort;
      break;
    case "insersion":
      sort = insersionSort;
      break;
    case "merge":
      sort = mergeSort;
      break;
    case "stooge":
      sort = stoogeSort;
      break;
    case "pancake":
      sort = pancakeSort;
      break;
    case "cycle":
      sort = cycleSort;
      break;
    case "comb":
      sort = combSort;
      break;
    case "shell":
      sort = shellSort;
      break;
    case "heap":
      sort = heapSort;
      break;
    case "quick":
      sort = quickSort;
      break;
    case "bitonic":
      sort = bitonicSort;
      break;
    case "bogo":
      sort = bogoSort;
      break;
    default:
      sort = selectionSort;
      break;
  }
  timeid = setInterval(incTimeTaken, delay / 3);
  await sort();
  clearInterval(timeid);
  timeid = null;
}

function display() {
  const container = document.getElementById("container");
  container.innerHTML = "";
  container.append(...array);
}

function create() {
  array.splice(0, array.length);
  document.getElementById("container").innerHTML = "";
  total = Math.floor(containerWidth / (width + gap));
  for (let i = 1; i <= total; i++) {
    const div = document.createElement("div");
    div.className = "bin " + i;
    div.style.width = width + "px";
    div.style.height = range(i) + "px";
    div.style.bottom = bottom + "px";
    div.value = i;
    array.push(div);
  }
}

function shuffle() {
  resetStat();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

async function swap(i, j) {
  play();
  incCompareCount();
  setActive(i);
  setActive(j);
  const first = array[i];
  const second = array[j];
  return new Promise(async (resolve) => {
    const duration = {
      duration: delay,
      iterations: 1,
      fill: "both",
    };
    const one = first.animate(
      [{ left: first.style.left }, { left: second.style.left }],
      duration
    );
    const two = second.animate(
      [{ left: second.style.left }, { left: first.style.left }],
      duration
    );
    await Promise.all([one.finished, two.finished]);
    let temp = first.style.left;
    first.style.left = second.style.left;
    second.style.left = temp;
    array[i] = second;
    array[j] = first;
    setInActive(i);
    setInActive(j);
    resolve();
  });
}

async function update(index, div) {
  play();
  incCompareCount();
  return new Promise(async (resolve) => {
    const duration = {
      duration: delay,
      iterations: 1,
      fill: "both",
    };

    div.style.backgroundColor = active_bg;
    setActive(index);
    await div.animate(
      [{ left: div.style.left }, { left: getPosition(index) }],
      duration
    ).finished;
    div.style.backgroundColor = "white";
    setInActive(index);
    div.style.left = getPosition(index);
    array[index] = div;
    resolve();
  });
}

// Sorting Algorithms
async function insersionSort() {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1;
    let key = array[i];
    while (j >= 0 && array[j].value > key.value) {
      await update(j + 1, array[j]);
      j = j - 1;
    }
    await update(j + 1, key);
  }
}

async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i].value > array[j].value) {
        await swap(i, j);
      }
    }
  }
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j].value > array[j + 1].value) {
        await swap(j, j + 1);
      }
    }
  }
}

async function cocktailSort() {
  let left = 0;
  let right = array.length - 1;
  let swapped = true;
  while (swapped) {
    swapped = false;
    for (let i = left; i < right; i++) {
      if (array[i].value > array[i + 1].value) {
        await swap(i, i + 1);
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
    swapped = false;
    right--;
    for (let i = right; i >= left; i--) {
      if (array[i].value > array[i + 1].value) {
        setActive(i);
        setActive(i + 1);
        await swap(i, i + 1);
        setInActive(i);
        setInActive(i + 1);
        swapped = true;
      }
    }
    left++;
  }
}

async function oddEvenSort() {
  let sorted = false;
  while (!sorted) {
    sorted = true;
    for (let i = 1; i < array.length - 1; i += 2) {
      if (array[i].value > array[i + 1].value) {
        await swap(i, i + 1);
        sorted = false;
      }
    }
    for (let i = 0; i < array.length - 1; i += 2) {
      if (array[i].value > array[i + 1].value) {
        await swap(i, i + 1);
        sorted = false;
      }
    }
  }
}

async function gnomeSort() {
  let i = 0;
  while (i < array.length) {
    if (i == 0 || array[i].value >= array[i - 1].value) {
      i++;
    } else {
      await swap(i, i - 1);
      i--;
    }
  }
}

async function mergeSort() {
  await divide(0, array.length - 1);

  async function divide(l, r) {
    if (l < r) {
      let m = parseInt((l + r) / 2);
      await divide(l, m);
      await divide(m + 1, r);
      await merge(l, m, r);
    }
  }

  async function merge(l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = [];
    let R = [];
    for (let i = 0; i < n1; i++) L[i] = array[l + i];
    for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];

    let i = 0;
    let j = 0;
    let k = l;
    while (i < n1 && j < n2) {
      if (L[i].value <= R[j].value) {
        await update(k, L[i]);
        i++;
      } else {
        await update(k, R[j]);
        j++;
      }
      k++;
    }

    while (i < n1) {
      await update(k, L[i]);
      i++;
      k++;
    }
    while (j < n2) {
      await update(k, R[j]);
      j++;
      k++;
    }
  }
}

async function stoogeSort() {
  await sort(0, array.length - 1);
  async function sort(l, h) {
    if (l >= h) return;
    if (array[l].value > array[h].value) {
      await swap(l, h);
    }
    if (h - l + 1 > 2) {
      let t = parseInt((h - l + 1) / 3, 10);
      await sort(l, h - t);
      await sort(l + t, h);
      await sort(l, h - t);
    }
  }
}

async function pancakeSort() {
  for (let curr_size = array.length; curr_size > 1; --curr_size) {
    let mi = findMax(curr_size);
    if (mi != curr_size - 1) {
      await flip(mi);
      await flip(curr_size - 1);
    }
  }
  async function flip(i) {
    let start = 0;
    while (start < i) {
      await swap(start, i);
      start++;
      i--;
    }
  }
  function findMax(n) {
    let mi, i;
    for (mi = 0, i = 0; i < n; ++i)
      if (array[i].value > array[mi].value) mi = i;
    return mi;
  }
}

async function cycleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    let item = array[i];
    let pos = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].value < item.value) {
        pos++;
      }
    }
    if (pos == i) {
      continue;
    }
    while (item.value == array[pos].value) {
      pos++;
    }
    if (pos != i) {
      let temp = item;
      item = array[pos];
      await update(pos, temp);
    }
    while (pos != i) {
      pos = i;

      for (let j = i + 1; j < array.length; j++) {
        if (array[j].value < item.value) {
          pos++;
        }
      }
      while (item.value == array[pos].value) {
        pos++;
      }
      if (item.value != array[pos].value) {
        let temp = item;
        item = array[pos];
        await update(pos, temp);
      }
    }
  }
}

async function combSort() {
  let gap = array.length;
  let swapped = true;
  while (gap > 1 || swapped) {
    gap = Math.floor(gap / 1.3);

    if (gap < 1) {
      gap = 1;
    }
    swapped = false;
    for (let i = 0; i + gap < array.length; i++) {
      if (array[i].value > array[i + gap].value) {
        await swap(i, i + gap);
        swapped = true;
      }
    }
  }
}

async function shellSort() {
  let n = array.length;
  let gap = Math.floor(n / 2);
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap].value > temp.value) {
        await update(j, array[j - gap]);
        j -= gap;
      }
      await update(j, temp);
    }
    gap = Math.floor(gap / 2);
  }
}

async function heapSort() {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    await heapify(i, array.length);
  }
  for (let i = array.length - 1; i > 0; i--) {
    await swap(0, i);
    await heapify(0, i);
  }
  async function heapify(i, heapSize) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < heapSize && array[left].value > array[largest].value) {
      largest = left;
    }
    if (right < heapSize && array[right].value > array[largest].value) {
      largest = right;
    }
    if (largest !== i) {
      await swap(i, largest);
      await heapify(largest, heapSize);
    }
  }
}

async function quickSort() {
  await sort(0, array.length - 1);
  async function sort(low, high) {
    if (low < high) {
      let pivot = await partition(low, high);
      await sort(low, pivot - 1);
      await sort(pivot + 1, high);
    }
  }
  async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
      if (array[j].value < pivot.value) {
        i++;
        await swap(i, j);
      }
    }
    await swap(i + 1, high);
    return i + 1;
  }
}

async function bitonicSort() {
  const required = greatestPowerOfTwoLessThan(total);
  padding += (total - required) * (width + gap);
  create();
  array.splice(required, total - required);
  shuffle();
  arrange();
  display();
  await sort(0, array.length, 1);
  padding -= (total - required) * (width + gap);
  async function bitonicMerge(low, n, direction) {
    if (n > 1) {
      const m = greatestPowerOfTwoLessThan(n);
      for (let i = low; i < low + n - m; i++) {
        await compareAndSwap(i, i + m, direction);
      }
      await bitonicMerge(low, m, direction);
      await bitonicMerge(low + m, n - m, direction);
    }
  }
  function greatestPowerOfTwoLessThan(n) {
    let k = 1;
    while (k < n) {
      k = k << 1;
    }
    return k >> 1;
  }
  async function sort(low, n, direction) {
    if (n > 1) {
      const m = Math.floor(n / 2);
      await sort(low, m, 1);
      await sort(low + m, m, 0);
      await bitonicMerge(low, n, direction);
    }
  }
  async function compareAndSwap(i, j, direction) {
    if (
      (array[i].value > array[j].value && direction === 1) ||
      (array[i].value < array[j].value && direction === 0)
    ) {
      await swap(i, j);
    }
  }
}

async function bogoSort() {
  while (!isSorted()) {
    await shuffle();
  }
  async function shuffle() {
    for (let i = 0; i < array.length; i++) {
      let j = Math.floor(Math.random() * array.length);
      await swap(i, j);
    }
  }
  function isSorted() {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        return false;
      }
    }
    return true;
  }
}

// all the descriptions of the algorithms
const desc = {
  selection:
    "Selection sort is a simple sorting algorithm that selects the smallest (or largest) element from an unsorted list in each iteration and places it at the beginning of the sorted list.",
  bubble:
    "Bubble sort is a simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order until the list is sorted.",
  cocktail:
    "Cocktail sort, also known as bidirectional bubble sort, is a variation of bubble sort that sorts the list in both directions, from the beginning to the end and from the end to the beginning.",
  "odd-even":
    "Odd-even sort is a sorting algorithm that sorts the list by repeatedly comparing adjacent elements in pairs and swapping them if they are in the wrong order, starting with odd-indexed elements and then even-indexed elements.",
  gnome:
    "Gnome sort is a sorting algorithm that sorts the list by repeatedly comparing adjacent elements and swapping them if they are in the wrong order, and then moving back one position and repeating the process.",
  insertion:
    "Insertion sort is a simple sorting algorithm that builds the sorted list one element at a time by inserting each element in its proper place.",
  merge:
    "Merge sort is a divide-and-conquer sorting algorithm that divides the list into smaller sub-lists, sorts them recursively, and then merges the sorted sub-lists back into a single sorted list.",
  stooge:
    "Stooge sort is a recursive sorting algorithm that divides the list into three parts, recursively sorts the first two-thirds and last two-thirds of the list, and then recursively sorts the first two-thirds again.",
  pancake:
    "Pancake sort is a sorting algorithm that sorts the list by repeatedly flipping the first k elements, where k is the index of the maximum element in the unsorted list, and then flipping the entire list.",
  cycle:
    "Cycle sort is an in-place sorting algorithm that minimizes the number of writes by cycling through the list to find the correct position for each element.",
  comb: "Comb sort is a variation of bubble sort that sorts the list by comparing elements that are far apart and then gradually decreasing the gap between elements until it is 1.",
  shell:
    "Shell sort is an extension of insertion sort that sorts the list by comparing elements that are far apart and then gradually decreasing the gap between elements until it is 1.",
  heap: "Heap sort is a sorting algorithm that builds a binary heap from the list and repeatedly extracts the maximum element from the heap to build the sorted list.",
  quick:
    "Quick sort is a divide-and-conquer sorting algorithm that chooses a pivot element, partitions the list into two sub-lists based on the pivot, and then recursively sorts the sub-lists.",
  bitonic:
    "Bitonic sort is a sorting algorithm that sorts the list by dividing it into two bitonic sequences, recursively sorting them, and then merging them into a single sorted list.",
  bogo: "Bogo sort, also known as stupid sort, is a sorting algorithm that randomly shuffles the list and checks if it is sorted, repeating this process until the list is sorted.",
};
