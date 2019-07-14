/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

const todoLsit = JSON.parse(localStorage.getItem('todoLsit')) || [{
  title: '製作 THE F2E 第一關',
  id: 1562852865763,
  tomato: 3,
},
{
  title: '學習 JavaScript',
  id: 1562852884777,
  tomato: 3,
},
{
  title: '看完怪奇物語3',
  id: 1562852903132,
  tomato: 2,
},
];

const finishTodo = JSON.parse(localStorage.getItem('finishTodo')) || [{
  title: '如何睜開眼睡覺',
  id: 1563004048262,
  tomato: 3,
},
{
  title: '如何當老師',
  id: 1562901889890,
  tomato: 4,
},
{
  title: '如何當總統',
  id: 1562815489890,
  tomato: 1,
},
{
  title: '如何當超人',
  id: 1562852761681,
  tomato: 6,
},
];

const isdoing = JSON.parse(localStorage.getItem('isdoing')) || {
  title: '如何成為前端工程師',
  id: 1563074830642,
  tomato: 0,
};

// 互動
// index
const addNewTodoInput = document.getElementsByName('addNewTodoInput');
const eatTomato = document.getElementById('eatTomato');
// app
let playIsdoingBtn = document.getElementsByName('playIsdoingBtn');
let pauseIsdoingBtn = document.getElementsByName('pauseIsdoingBtn');
let changeTodo = document.getElementsByName('changeTodo');
const work = document.getElementsByName('work');
const rest = document.getElementsByName('break');
// 倒數計時
const playIndexTodoBtn = document.getElementById('playIndexTodoBtn');
const pauseIndexTodoBtn = document.getElementById('pauseIndexTodoBtn');
const finshIndexIsdoingBtn = document.getElementById('finshIndexIsdoingBtn');
let finshIsdoingBtn = document.getElementById('finshIsdoingBtn');
let finshTodoBtn = document.getElementsByName('finshTodoBtn');

// 更新資料
// index
const upcoming = document.getElementById('upcoming');
const indexIsdoingTitle = document.getElementById('indexIsdoingTitle');
const stroke = document.getElementById('stroke');
// app
const isdoingTitle = document.getElementsByName('isdoingTitle');
const allTodo = document.getElementById('allTodo');
const completeTodoList = document.getElementById('completeTodoList');
const toDayEatenTomatos = document.getElementById('toDayEatenTomatos');
const weekEatenTomatos = document.getElementById('weekEatenTomatos');
let week = [];
const weekEatenTomatosTotal = [];
const weekstart = document.getElementById('weekstart');
const weekend = document.getElementById('weekend');
const musicAduio = document.getElementsByName('musicAduio');
// 倒數計時
let mission = 'work';
const showMin = document.getElementsByName('showMin');
const showSecond = document.getElementsByName('showSecond');
let workmusic = JSON.parse(localStorage.getItem('workmusic')) || 'none';
let breakmusic = JSON.parse(localStorage.getItem('breakmusic')) || 'none';
const workmusicSelect = JSON.parse(localStorage.getItem('workmusicSelect')) || 'workbird';
const breakmusicSelect = JSON.parse(localStorage.getItem('breakmusicSelect')) || 'breakmusic';

// 內存資料
let isCount = false; // 是否正在倒數
let workCountMin = 1; // 任務倒數分
let workCountSecond = 0; // 任務倒數秒
let breakCountMin = 0; // 休息倒數分
let breakCountSecond = 12; // 休息倒數秒
let counting = ''; // 控制倒數
let strokeDashoffset = 379; // 倒數動畫

// 新增待辦事項
function addNewTodo(event) {
  if (event.keyCode === 13) {
    const newTodo = {};
    if (addNewTodoInput.value !== '') {
      newTodo.title = this.value;
    }
    newTodo.id = new Date().getTime();
    newTodo.tomato = 0;
    todoLsit.splice(0, 0, newTodo);
    this.value = '';
    getUpcoming();
    getTodolist();
    localStorage.setItem('todoLsit', JSON.stringify(todoLsit));
  }
}
addNewTodoInput.forEach((item) => {
  item.addEventListener('keyup', addNewTodo);
});

// index
// 首頁待辦清單
function getUpcoming() {
  let str = '';
  todoLsit.forEach((item, index) => {
    if (index < 3) {
      str += `
      <li>
        <span>
          <i name="finshTodoBtn" class="material-icons">radio_button_unchecked</i>
          ${item.title}
        </span>
        <i name="changeTodo" class="material-icons" data-index="${item.id}">play_circle_outline</i>
      </li>
      `;
    }
  });
  if (window.location.pathname === '/Pomodoro/index.html') {
    upcoming.innerHTML = str;
  }
  // 更新 playIndexTodobtn 數量及重新綁定
  changeTodo = document.getElementsByName('changeTodo');
  clickChangeTodoBtn();
}
if (window.location.pathname === '/Pomodoro/index.html') {
  window.addEventListener('load', getUpcoming);
}

// 更新正在執行待辦事項的名稱及番茄數量
function getIndexIsdoing() {
  if (window.location.pathname === '/Pomodoro/index.html') {
    indexIsdoingTitle.textContent = isdoing.title;
    let tomato = '';
    for (let i = 0; i < isdoing.tomato; i += 1) {
      tomato += '<i class="material-icons">lens</i>';
    }
    let str = '';
    str += `
      <p>${tomato}<i class="material-icons">panorama_fish_eye</i></p>
    `;
    eatTomato.innerHTML = str;
  }
}
if (window.location.pathname === '/Pomodoro/index.html') {
  window.addEventListener('load', getIndexIsdoing);
}

// todolist
// 取得所有待辦清單
function getTodolist() {
  let str = '';
  // 正在執行的事項列在最上
  str += `
  <li>
    <span>
      <i id="finshIsdoingBtn" data-index="${isdoing.id}" class="material-icons">radio_button_unchecked</i>
      ${isdoing.title}
    </span>
    <i name="playIsdoingBtn" class="material-icons todocount">play_circle_outline</i>
    <i name="pauseIsdoingBtn" class="material-icons">pause_circle_outline</i>
  </li>`;
  todoLsit.forEach((item) => {
    str += `
    <li>
      <span>
        <i name="finshTodoBtn" data-index="${item.id}" class="material-icons">radio_button_unchecked</i>
        ${item.title}
      </span>
      <i name="changeTodo" class="material-icons" data-index="${item.id}">play_circle_outline</i>
    </li>`;
  });
  if (window.location.pathname === '/Pomodoro/todolist.html') {
    allTodo.innerHTML = str;
  }
  // 更新 clickChangeTodoBtn 數量及重新綁定
  changeTodo = document.getElementsByName('changeTodo');
  clickChangeTodoBtn();
  // 重新綁定 playIsdoingBtn & pauseIsdoingBtn
  playIsdoingBtn = document.getElementsByName('playIsdoingBtn');
  pauseIsdoingBtn = document.getElementsByName('pauseIsdoingBtn');
  getIsdoingBtn();
  // 重新綁定 finshTodoBtn
  finshTodoBtn = document.getElementsByName('finshTodoBtn');
  getFinshTodoBtn();
  // 重新綁定 finshIsdoingBtn
  finshIsdoingBtn = document.getElementById('finshIsdoingBtn');
  getFinshIsdoingBtn();
}
if (window.location.pathname === '/Pomodoro/todolist.html') {
  window.addEventListener('load', getTodolist);
}

// 取得已完成的待辦事項
function getCompletelist() {
  let str = '';
  finishTodo.forEach((item) => {
    // 取得已吃掉多少 tomato
    let tomato = '';
    for (let i = 0; i < item.tomato; i += 1) {
      tomato += '<i class="material-icons">lens</i>';
    }
    str += `
    <li>
      <span>
        <i class="material-icons">check</i>
        <del>${item.title}</del>
      </span>
      <p>
        ${tomato}
      </p>
    </li>
    `;
  });
  completeTodoList.innerHTML = str;
}
if (window.location.pathname === '/Pomodoro/todolist.html') {
  window.addEventListener('load', getCompletelist);
}

// 正在執行的待辦事項名稱
function getIsdoing() {
  isdoingTitle.forEach((item) => {
    item.textContent = isdoing.title;
  });
}
window.addEventListener('load', getIsdoing);

// 切換執行狀態
function implementTodo(event) {
  const temptodo = {};
  todoLsit.forEach((item, index) => {
    if (Number(event.target.dataset.index) === Number(item.id)) {
      temptodo.title = isdoing.title;
      temptodo.id = isdoing.id;
      temptodo.tomato = isdoing.tomato;
      isdoing.title = item.title;
      isdoing.id = item.id;
      isdoing.tomato = item.tomato;
      // 替換執行中及被替換的任務
      todoLsit.splice(index, 1);
      todoLsit.splice(index, 0, temptodo);
      localStorage.setItem('isdoing', JSON.stringify(isdoing));
      localStorage.setItem('todoLsit', JSON.stringify(todoLsit));
      if (window.location.pathname === '/Pomodoro/index.html') {
        getUpcoming(); // 更新待執行任務清單
        getIndexIsdoing(); // 更新執行中任務
      }
      if (window.location.pathname === '/Pomodoro/todolist.html') {
        getTodolist(); // 更新所有任務清單
        getIsdoing(); // 更新執行中任務 title
        getCompletelist(); // 更新已完成清單
      }
    }
  });
  // 切換任務重新計時
  workCountMin = 1;
  workCountSecond = 0;
}
function clickChangeTodoBtn() {
  changeTodo.forEach((item) => {
    item.addEventListener('click', implementTodo);
  });
}
window.addEventListener('load', clickChangeTodoBtn);

// analytics
// 取得已完成任務的番茄總數
function getEatenTomatos() {
  let tempDate = '';
  let toDay = new Date();
  // 取得當天日期往前推算一星期
  for (let i = 0; i < 7; i += 1) {
    toDay = new Date();
    toDay.setDate(toDay.getDate() - i);
    tempDate = `${toDay.getFullYear()}.${(`0${toDay.getMonth() + 1}`).substr(-2)}.${(`0${toDay.getDate()}`).substr(-2)}`;
    week.splice(i, 0, tempDate);
  }
  const todayTomato = {
    tomato: 0,
  };
  const weekTomato = {
    tomato: 0,
  };
  week = week.sort((a, b) => (Date.parse(a) > Date.parse(b) ? 1 : -1));
  const start = week[0];
  const end = week[6];
  weekstart.textContent = start;
  weekend.textContent = end;
  let eachDayTomato = 0;
  // 當日番茄加總
  finishTodo.forEach((item) => {
    toDay = new Date();
    const todoDay = new Date(item.id);
    if (toDay.getFullYear() === todoDay.getFullYear() && toDay.getMonth() + 1 === todoDay.getMonth() + 1 && toDay.getDate() === todoDay.getDate()) {
      todayTomato.tomato += item.tomato;
    }
  });
  // 一週各日番茄加總
  week.forEach((day, index) => {
    // 若是空值則補 0
    if (weekEatenTomatosTotal[index] === undefined) {
      weekEatenTomatosTotal.splice(index, 1, 0);
    }
    finishTodo.forEach((item) => {
      const todoDay = new Date(item.id);
      // 當替換為下個日期時，補 0 完畢後將 eachDayTomato 歸 0
      if (weekEatenTomatosTotal[index] === 0) {
        eachDayTomato = 0;
        weekEatenTomatosTotal.splice(index, 0);
      }
      // 再進行日期判定
      if (new Date(Date.parse(day)).getFullYear() === todoDay.getFullYear() && new Date(Date.parse(day)).getMonth() + 1 === todoDay.getMonth() + 1 && new Date(Date.parse(day)).getDate() === todoDay.getDate()) {
        eachDayTomato += item.tomato;
        weekEatenTomatosTotal.splice(index, 1, eachDayTomato);
        weekTomato.tomato += item.tomato;
      }
    });
  });
  toDayEatenTomatos.textContent = todayTomato.tomato;
  weekEatenTomatos.textContent = weekTomato.tomato;
  getChart();
}
if (window.location.pathname === '/Pomodoro/analytics.html') {
  window.addEventListener('load', getEatenTomatos);
}

// ringtones
// 設定基本音效或是 uesr 選擇的音效
function selectMusicChecked() {
  document.getElementById(workmusicSelect).checked = true;
  document.getElementById(breakmusicSelect).checked = true;
}
if (window.location.pathname === '/Pomodoro/ringtones.html') {
  window.addEventListener('load', selectMusicChecked);
}

// 選擇音效
function selectAudio(event) {
  musicAduio.forEach((item) => {
    // 選擇時預覽音效
    if (event.target.id === 'worknone' || event.target.id === 'breaknone') {
      item.pause();
      item.currentTime = 0;
    } else {
      const src = `src/${event.target.dataset.audio}`;
      item.setAttribute('src', src);
      item.pause();
      item.currentTime = 0;
      item.play();
    }
    // 加入選擇音效至 localStorage
    if (event.target.name === 'work') {
      if (event.target.id === 'worknone') { return; }
      workmusic = `src/${event.target.dataset.audio}`;
      localStorage.setItem('workmusic', JSON.stringify(workmusic));
      localStorage.setItem('workmusicSelect', JSON.stringify(event.target.id));
    } else if (event.target.name === 'break') {
      if (event.target.id === 'breaknone') { return; }
      breakmusic = `src/${event.target.dataset.audio}`;
      localStorage.setItem('breakmusic', JSON.stringify(breakmusic));
      localStorage.setItem('breakmusicSelect', JSON.stringify(event.target.id));
    }
  });
}
if (window.location.pathname === '/Pomodoro/ringtones.html') {
  work.forEach((item) => {
    item.addEventListener('click', selectAudio);
  });
  rest.forEach((item) => {
    item.addEventListener('click', selectAudio);
  });
}
// 倒數開始及休息開始音效
// 倒數結束播放休息開始，休息結束播放倒數開始
function playAudio(music) {
  if (music === 'none') {
    return;
  }
  musicAduio.forEach((item) => {
    item.setAttribute('src', `${music}`);
    item.play();
  });
}

function pauseAudio() {
  musicAduio.forEach((item) => {
    item.pause();
    item.currentTime = 0;
  });
}

// animation
// 倒數動畫
function countDownAnimation() {
  if (window.location.pathname === '/Pomodoro/index.html') {
    strokeDashoffset += 27.1;
    stroke.style.strokeDashoffset = strokeDashoffset;
    if (strokeDashoffset > 2000) {
      strokeDashoffset = 379;
    }
  }
}

function workAndBreakStyle() {
  const indexbg = document.getElementById('indexbg');
  const addnewtodo = document.getElementById('addnewtodo');
  const reciprocal = document.getElementById('reciprocal');
  const moreTodo = document.getElementById('moreTodo');
  const clock = document.getElementById('clock');
  indexbg.classList.toggle('pink-bg');
  indexbg.classList.toggle('cyan-bg');
  addnewtodo.classList.toggle('pink-color');
  addnewtodo.classList.toggle('cyan-color');
  eatTomato.classList.toggle('pink-color');
  reciprocal.classList.toggle('pink-color');
  reciprocal.classList.toggle('cyan-color');
  moreTodo.classList.toggle('pink-color');
  moreTodo.classList.toggle('cyan-color');
  clock.classList.toggle('pink-border');
  clock.classList.toggle('cyan-border');
  clock.classList.toggle('pink-bg');
  clock.classList.toggle('cyan-bg');
  stroke.classList.toggle('pink-stroke');
  stroke.classList.toggle('cyan-stroke');
}

// 倒數計時
function countingDown() {
  if (mission === 'work') {
    // 任務倒數
    if (workCountMin === 0 && workCountSecond === 0) {
      console.log('開始休息～');
      breakCountMin = 0;
      breakCountSecond = 12;
      for (let i = 0; i < showMin.length; i += 1) {
        showMin[i].textContent = `0${breakCountMin}`;
        showSecond[i].textContent = `${breakCountSecond}`;
      }
      isdoing.tomato += 1;
      localStorage.setItem('isdoing', JSON.stringify(isdoing));
      // 更新執行中番茄數量
      getIndexIsdoing();
      playAudio(breakmusic);
      mission = 'break';
      // 變更樣式
      workAndBreakStyle();
      return;
    }
    if (workCountSecond === 0) {
      workCountMin -= 1;
      workCountSecond = 59;
      for (let i = 0; i < showMin.length; i += 1) {
        showMin[i].textContent = `0${workCountMin}`;
        showSecond[i].textContent = `${workCountSecond}`;
      }
    } else {
      workCountSecond -= 1;
      if (workCountSecond < 10) {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `0${workCountSecond}`;
        }
      } else {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `${workCountSecond}`;
        }
      }
    }
    // 倒數動畫
    countDownAnimation();
  } else if (mission === 'break') {
    // 休息倒數
    if (breakCountMin === 0 && breakCountSecond === 0) {
      console.log('休息結束');
      workCountMin = 1;
      workCountSecond = 0;
      for (let i = 0; i < showMin.length; i += 1) {
        showMin[i].textContent = `0${workCountMin}`;
        showSecond[i].textContent = `0${workCountSecond}`;
      }
      playAudio(workmusic);
      mission = 'work';
      // 變更樣式
      workAndBreakStyle();
      return;
    }
    if (breakCountSecond > 0) {
      breakCountSecond -= 1;
      if (breakCountSecond < 10) {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `0${breakCountSecond}`;
        }
      } else {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `${breakCountSecond}`;
        }
      }
    }
    // 倒數動畫
    countDownAnimation();
  }
}

function countTime() {
  if (mission === 'work') {
    if (!isCount) {
      if (window.location.pathname === '/Pomodoro/index.html') {
        playIndexTodoBtn.classList.toggle('todocount');
        pauseIndexTodoBtn.classList.toggle('todocount');
      }
      for (let i = 0; i < showMin.length; i += 1) {
        showMin[i].textContent = `0${workCountMin}`;
      }
      if (workCountSecond < 10) {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `0${workCountSecond}`;
        }
      } else {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `${workCountSecond}`;
        }
      }
      isCount = true;
      counting = setInterval(countingDown, 1000);
    }
  } else if (mission === 'break') {
    if (!isCount) {
      if (window.location.pathname === '/Pomodoro/index.html') {
        playIndexTodoBtn.classList.toggle('todocount');
        pauseIndexTodoBtn.classList.toggle('todocount');
      }
      for (let i = 0; i < showMin.length; i += 1) {
        showMin[i].textContent = `0${breakCountMin}`;
      }
      if (breakCountSecond < 10) {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `0${breakCountSecond}`;
        }
      } else {
        for (let i = 0; i < showSecond.length; i += 1) {
          showSecond[i].textContent = `${breakCountSecond}`;
        }
      }
      isCount = true;
      counting = setInterval(countingDown, 1000);
    }
  }
}
if (window.location.pathname === '/Pomodoro/index.html') {
  playIndexTodoBtn.addEventListener('click', countTime);
}

// 暫停倒數
function pauseCountTime() {
  if (window.location.pathname === '/Pomodoro/index.html') {
    playIndexTodoBtn.classList.toggle('todocount');
    pauseIndexTodoBtn.classList.toggle('todocount');
  }
  playIsdoingBtn.forEach((item) => {
    item.classList.toggle('todocount');
  });
  pauseIsdoingBtn.forEach((item) => {
    item.classList.toggle('todocount');
  });
  isCount = false;
  pauseAudio();
  clearInterval(counting);
}
if (window.location.pathname === '/Pomodoro/index.html') {
  pauseIndexTodoBtn.addEventListener('click', pauseCountTime);
}

// 停止倒數
function stopCountTime() {
  mission = 'work';
  // 動畫 & 倒數重置
  if (window.location.pathname === '/Pomodoro/index.html') {
    workCountMin = 1;
    workCountSecond = 0;
    for (let i = 0; i < showMin.length; i += 1) {
      showMin[i].textContent = `0${workCountMin}`;
      showSecond[i].textContent = `0${workCountSecond}`;
    }
    strokeDashoffset = 379;
    stroke.style.strokeDashoffset = strokeDashoffset; // 倒數動畫重置
  }
  // play & pause btn 重新顯示
  if (window.location.pathname === '/Pomodoro/todolist.html') {
    playIsdoingBtn.forEach((item) => {
      if (item.className.indexOf('todocount') < 0) {
        item.classList.toggle('todocount');
      }
    });
    pauseIsdoingBtn.forEach((item) => {
      if (item.className.indexOf('todocount') > 0) {
        item.classList.toggle('todocount');
      }
    });
  }
  const temptodo = {};
  isCount = false;
  clearInterval(counting);
  // 更換執行中任務
  // 將原執行中任務新增至任務完成
  temptodo.title = isdoing.title;
  temptodo.id = isdoing.id;
  temptodo.tomato = isdoing.tomato;
  finishTodo.splice(0, 0, temptodo);
  localStorage.setItem('finishTodo', JSON.stringify(finishTodo));
  // console.log(finishTodo);
  // // 自動切換為等待列表中的第一項任務
  isdoing.title = todoLsit[0].title;
  isdoing.id = todoLsit[0].id;
  isdoing.tomato = todoLsit[0].tomato;
  localStorage.setItem('isdoing', JSON.stringify(isdoing));
  todoLsit.splice(0, 1);
  localStorage.setItem('todoLsit', JSON.stringify(todoLsit));
  pauseAudio();
  // 變更樣式
  if (mission === 'break') { workAndBreakStyle(); }
  if (window.location.pathname === '/Pomodoro/index.html') {
    getUpcoming();
    getIndexIsdoing();
  }
  if (window.location.pathname === '/Pomodoro/todolist.html') {
    getTodolist();
    getIsdoing();
    getCompletelist();
  }
}

if (window.location.pathname === '/Pomodoro/index.html') {
  finshIndexIsdoingBtn.addEventListener('click', stopCountTime);
}

// app開始倒數
function appPlayIsdoing() {
  playIsdoingBtn.forEach((item) => {
    item.classList.toggle('todocount');
  });
  pauseIsdoingBtn.forEach((item) => {
    item.classList.toggle('todocount');
  });
  countTime();
}
function getIsdoingBtn() {
  playIsdoingBtn.forEach((item) => {
    item.addEventListener('click', appPlayIsdoing);
  });
  pauseIsdoingBtn.forEach((item) => {
    item.addEventListener('click', pauseCountTime);
  });
}
window.addEventListener('load', getIsdoingBtn);

// app 停止倒數
function getFinshIsdoingBtn() {
  if (window.location.pathname === '/Pomodoro/todolist.html') {
    finshIsdoingBtn.addEventListener('click', stopCountTime);
  }
}
window.addEventListener('load', getFinshIsdoingBtn);

// 直接完成待執行的任務
function finshUpcomingTodo(event) {
  // 更換執行中任務
  // 將原執行中任務新增至任務完成
  todoLsit.forEach((item, index) => {
    if (Number(event.target.dataset.index) === Number(item.id)) {
      finishTodo.splice(0, 0, item);
      localStorage.setItem('finishTodo', JSON.stringify(finishTodo));
      todoLsit.splice(index, 1);
      localStorage.setItem('todoLsit', JSON.stringify(todoLsit));
      if (window.location.pathname === '/Pomodoro/index.html') {
        getUpcoming();
        getIndexIsdoing();
      }
      if (window.location.pathname === '/Pomodoro/todolist.html') {
        getTodolist();
        getIsdoing();
        getCompletelist();
      }
    }
  });
}
function getFinshTodoBtn() {
  finshTodoBtn.forEach((item) => {
    item.addEventListener('click', finshUpcomingTodo);
  });
}
window.addEventListener('load', getFinshTodoBtn);

// chart
function getChart() {
  Chart.defaults.global.defaultFontFamily = 'Noto Sans TC';
  const ctx = document.getElementById('tomatoChart').getContext('2d');
  const tomatoChartData = {
    type: 'bar',
    data: {
      labels: week,
      datasets: [{
        label: 'Total Revenue',
        data: weekEatenTomatosTotal,
        backgroundColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF4384'],
        borderColor: [],
        borderWidth: 0,
      }],
    },
    options: {
      elements: {
        point: {
          radius: 5,
        },
        line: {
          tension: 0, // disables bezier curves
        },
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 5,
            fontColor: '#FFFFFF',
          },
          gridLines: {
            display: false,
            color: '#FFFFFF',
          },
        }],
        xAxes: [{
          ticks: {
            fontColor: '#FFFFFF',
          },
          gridLines: {
            display: false,
            color: '#FFFFFF',
          },
        }],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };
  const tomatoChart = new Chart(ctx, tomatoChartData);
}
