const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let array = [];
let barWidth;
let barHeightUnit;
sorting = false;

function generateArray() {
  if(sorting) return;
  array = [];
  for (let i = 0; i < 50; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  drawArray();
}

function drawArray() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  barWidth = canvas.width / array.length;
  barHeightUnit = canvas.height / Math.max(...array);

  for (let i = 0; i < array.length; i++) {
    const barHeight = array[i] * barHeightUnit;
    ctx.fillStyle = "blue";
    ctx.fillRect(
      i * barWidth,
      canvas.height - barHeight,
      barWidth,
      barHeight
    );
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swap(j, jPlus1) {
  const temp = array[j];
  array[j] = array[jPlus1];
  array[jPlus1] = temp;
}


async function bubbleSortArray() {
    if(sorting) return;
    sorting = true;
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        // Highlight the bars being compared in red
        ctx.fillStyle = "red";
        ctx.fillRect(
          j * barWidth,
          canvas.height - array[j] * barHeightUnit,
          barWidth,
          array[j] * barHeightUnit
        );
        ctx.fillRect(
          (j + 1) * barWidth,
          canvas.height - array[j + 1] * barHeightUnit,
          barWidth,
          array[j + 1] * barHeightUnit
        );
          
        await sleep(40); // Delay for visualization
  
        if (array[j] > array[j + 1]) {
          swap(j, j + 1);
          drawArray(); // Redraw the array after swapping
        }
  
        // Reset the color of the bars to blue
        ctx.fillStyle = "blue";
        ctx.fillRect(
          j * barWidth,
          canvas.height - array[j] * barHeightUnit,
          barWidth,
          array[j] * barHeightUnit
        );
        ctx.fillRect(
          (j + 1) * barWidth,
          canvas.height - array[j + 1] * barHeightUnit,
          barWidth,
          array[j + 1] * barHeightUnit
        );
      }
    }
    sorting = false;
  }
  

  async function selectionSortArray() {
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        // Reset the color of all bars to blue before comparing
        ctx.fillStyle = "blue";
        drawArray();
  
        // Highlight the bars being compared in red
        ctx.fillStyle = "red";
        ctx.fillRect(
          minIndex * barWidth,
          canvas.height - array[minIndex] * barHeightUnit,
          barWidth,
          array[minIndex] * barHeightUnit
        );
        ctx.fillRect(
          j * barWidth,
          canvas.height - array[j] * barHeightUnit,
          barWidth,
          array[j] * barHeightUnit
        );
  
        await sleep(40); // Delay for visualization
  
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      // Reset the color of the bars to blue after the inner loop completes
      ctx.fillStyle = "blue";
  
      // Swap the bars if needed and redraw the array
      if (minIndex !== i) {
        swap(i, minIndex);
      }
      drawArray();
    }
  }


async function quickSortArray() {
  if(sorting) return;
  sorting = true;
  async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight the bars being compared in red
      ctx.fillStyle = "red";
      ctx.fillRect(
        j * barWidth,
        canvas.height - array[j] * barHeightUnit,
        barWidth,
        array[j] * barHeightUnit
      );
      ctx.fillRect(
        high * barWidth,
        canvas.height - pivot * barHeightUnit,
        barWidth,
        pivot * barHeightUnit
      );

      await sleep(40); // Delay for visualization

      if (array[j] < pivot) {
        i++;
        swap(i, j);
        drawArray(); // Redraw the array after swapping
      }

      // Reset the color of the bars to blue
      ctx.fillStyle = "blue";
    }

    swap(i + 1, high);
    return i + 1;
  }

  async function quickSort(low, high) {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await quickSort(low, pivotIndex - 1);
      await quickSort(pivotIndex + 1, high);
    }
  }

  await quickSort(0, array.length - 1);
  drawArray();
  sorting = false;
}