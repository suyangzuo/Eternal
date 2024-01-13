const 收藏栏按钮 = document.getElementById("收藏栏按钮");
const 收藏按钮 = document.getElementById("收藏按钮");
const 收藏数量 = document.getElementById("收藏数量");
const 收藏提示 = document.getElementById("收藏提示");
const 收藏栏 = document.getElementById("收藏栏");
const 收藏栏添加按钮 = document.getElementById("收藏条目-添加");
const 关闭收藏栏按钮 = document.getElementById("关闭收藏栏");

let 本次操作为添加 = true;
let 博客收藏 = [];
let 条目技术栈名称 = 技术栈名称;
let 条目专题名称 = 专题名称;

if (localStorage.getItem("博客收藏") !== null) {
  博客收藏 = JSON.parse(localStorage.getItem("博客收藏"));
}

侧边栏.addEventListener("click", () => {
  localStorage.clear();
  博客收藏.length = 0;
  收藏数量.textContent = 博客收藏.length;
  console.log(博客收藏);
});

初始化收藏操作区();
初始化收藏栏();

function 初始化收藏操作区() {
  const 本地收藏解析结果 = JSON.parse(localStorage.getItem("博客收藏"));

  if (本地收藏解析结果 === null || 本地收藏解析结果.length === 0) return;
  收藏数量.textContent = 本地收藏解析结果.length;
  收藏数量.style.visibility = "visible";
  const 当前页面已收藏 = 本地收藏解析结果.some(
    (entry) => entry.技术栈 === 技术栈名称 && entry.专题 === 专题名称
  );

  if (当前页面已收藏) {
    收藏按钮.style.color = "gold";
  } else {
    收藏按钮.style.color = "white";
  }
}

技术栈组.forEach((技术栈) => {
  技术栈.addEventListener("click", () => {
    if (
      JSON.parse(localStorage.getItem("博客收藏"))?.some((收藏) => {
        收藏.技术栈 === 技术栈名称 && 收藏.专题 === 专题名称;
      })
    ) {
      收藏按钮.style.color = "gold";
    } else {
      收藏按钮.style.color = "white";
    }
  });
});

收藏按钮.addEventListener("click", 收藏博客);

function 收藏博客(event) {
  event.stopPropagation();

  if (该页已被收藏()) {
    本次操作为添加 = false;
    从本地存储删除博客(event);
    从收藏栏删除博客(event);
  } else {
    本次操作为添加 = true;
    添加博客到本地存储();
    添加博客到收藏栏();
  }
  刷新收藏操作区(event);
}

收藏栏按钮.addEventListener("click", 显示收藏栏);
关闭收藏栏按钮.addEventListener("click", 关闭收藏栏);

收藏栏添加按钮.addEventListener("click", (event) => {
  event.stopPropagation();
  if (该页已被收藏()) {
    收藏提示.textContent = "本专题已在收藏夹中";
    收藏提示.style.color = "orange";
    收藏提示.style.animation = "none";
    收藏提示.offsetHeight;
    收藏提示.style.animation = "收藏提示动画 1.25s ease-out";
  } else {
    本次操作为添加 = true;
    添加博客到本地存储();
    添加博客到收藏栏();
    刷新收藏操作区(event);
  }
});

// ------------------------- ↓ 添加博客 -------------------------
function 添加博客到本地存储() {
  const 收藏时间 = 获取当前日期();

  const 当前博客 = {
    技术栈: 技术栈名称,
    专题: 专题名称,
    时间: 收藏时间,
  };

  博客收藏.push(当前博客);
  localStorage.setItem("博客收藏", JSON.stringify(博客收藏));
}

function 添加博客到收藏栏() {
  const 条目 = document.createElement("div");
  条目.className = "收藏条目";

  const 删除条目按钮 = 生成条目删除按钮();
  条目.appendChild(删除条目按钮);

  const 收藏条目_标志 = document.createElement("figure");
  收藏条目_标志.className = "收藏条目-标志";

  const 收藏信息区 = document.createElement("div");
  收藏信息区.className = "收藏信息区";

  条目.append(收藏条目_标志, 收藏信息区);

  const image = document.createElement("img");
  const 技术栈图标 = document.querySelector(".专题名称").querySelector("img");
  image.src = 技术栈图标.src;
  image.alt = 技术栈图标.alt;
  收藏条目_标志.appendChild(image);

  const 收藏信息_技术栈 = 生成收藏信息技术栈(技术栈名称);
  const 收藏信息_专题 = 生成收藏信息专题(专题名称);
  const 收藏信息_日期 = 生成收藏信息日期(获取当前日期());
  收藏信息区.append(收藏信息_技术栈, 收藏信息_专题, 收藏信息_日期);

  收藏栏添加按钮.before(条目);
}
// ------------------------- ↑ 添加博客 -------------------------

// ------------------------- ↓ 删除博客 -------------------------
function 从本地存储删除博客(event) {
  const 事件发起者 = event.currentTarget;

  const 博客收藏_已过滤 = 博客收藏.filter(
    (博客) =>
      !(
        博客.技术栈 ===
          (事件发起者.className === "收藏按钮" ? 技术栈名称 : 条目技术栈名称) &&
        博客.专题 ===
          (事件发起者.className === "收藏按钮" ? 专题名称 : 条目专题名称)
      )
  );

  localStorage.setItem("博客收藏", JSON.stringify(博客收藏_已过滤));
  博客收藏 = 博客收藏_已过滤;
}

function 从收藏栏删除博客(event) {
  const 事件发起者 = event.currentTarget;
  const 待删除条目 = 从技术栈和专题获取收藏栏条目(
    事件发起者.className === "收藏按钮" ? 技术栈名称 : 条目技术栈名称,
    事件发起者.className === "收藏按钮" ? 专题名称 : 条目专题名称
  );
  待删除条目?.remove();
}

function 点击条目删除按钮时更新条目技术栈和专题(event) {
  const 条目 = event.currentTarget.parentElement;
  条目技术栈名称 = 条目.querySelector(".收藏文本-技术栈").textContent;
  条目专题名称 = 条目.querySelector(".收藏文本-专题").textContent;
}
// ------------------------- ↑ 删除博客 -------------------------

function 从技术栈和专题获取收藏栏条目(技术栈名称参数, 专题名称参数) {
  const 所有条目 = document.querySelectorAll(".收藏条目:not(#收藏条目-添加)");
  const 条目 = Array.from(所有条目).find(
    (entry) =>
      entry.querySelector(".收藏文本-技术栈").textContent === 技术栈名称参数 &&
      entry.querySelector(".收藏文本-专题").textContent === 专题名称参数
  );
  return 条目;
}

function 生成条目删除按钮() {
  const 删除条目按钮 = document.createElement("button");
  删除条目按钮.className = "删除条目按钮";
  删除条目按钮.innerHTML = "<i class='fa-solid fa-xmark'></i>";
  删除条目按钮.addEventListener(
    "click",
    点击条目删除按钮时更新条目技术栈和专题
  );
  删除条目按钮.addEventListener("click", () => {
    本次操作为添加 = false;
  });
  删除条目按钮.addEventListener("click", 从本地存储删除博客);
  删除条目按钮.addEventListener("click", 从收藏栏删除博客);
  删除条目按钮.addEventListener("click", 刷新收藏操作区);
  return 删除条目按钮;
}

function 生成收藏信息技术栈(技术栈名称参数) {
  const 收藏信息_技术栈 = document.createElement("p");
  收藏信息_技术栈.className = "收藏信息";
  收藏信息_技术栈.classList.add("收藏信息-技术栈");
  const fontAwesome_技术栈 = document.createElement("i");
  fontAwesome_技术栈.className = "fa-solid";
  fontAwesome_技术栈.classList.add("fa-microchip");
  fontAwesome_技术栈.classList.add("收藏信息-标志");
  const 收藏信息_文本_技术栈 = document.createElement("span");
  收藏信息_文本_技术栈.className = "收藏信息-文本";
  收藏信息_文本_技术栈.classList.add("收藏文本-技术栈");
  收藏信息_文本_技术栈.textContent = 技术栈名称参数;
  收藏信息_技术栈.append(fontAwesome_技术栈, 收藏信息_文本_技术栈);
  return 收藏信息_技术栈;
}

function 生成收藏信息专题(专题名称改参数) {
  const 收藏信息_专题 = document.createElement("p");
  收藏信息_专题.className = "收藏信息";
  收藏信息_专题.classList.add("收藏信息-专题");
  const fontAwesome_专题 = document.createElement("i");
  fontAwesome_专题.className = "fa-solid";
  fontAwesome_专题.classList.add("fa-newspaper");
  fontAwesome_专题.classList.add("收藏信息-标志");
  const 收藏信息_文本_专题 = document.createElement("span");
  收藏信息_文本_专题.className = "收藏信息-文本";
  收藏信息_文本_专题.classList.add("收藏文本-专题");
  收藏信息_文本_专题.textContent = 专题名称改参数;
  收藏信息_专题.append(fontAwesome_专题, 收藏信息_文本_专题);
  return 收藏信息_专题;
}

function 生成收藏信息日期(时间参数) {
  const 收藏信息_日期 = document.createElement("p");
  收藏信息_日期.className = "收藏信息";
  收藏信息_日期.classList.add("收藏信息-日期");
  const fontAwesome_日期 = document.createElement("i");
  fontAwesome_日期.className = "fa-solid";
  fontAwesome_日期.classList.add("fa-clock");
  fontAwesome_日期.classList.add("收藏信息-标志");
  const 收藏信息_文本_日期 = document.createElement("span");
  收藏信息_文本_日期.className = "收藏信息-文本";
  收藏信息_文本_日期.classList.add("收藏文本-时间");
  收藏信息_文本_日期.textContent = 时间参数;
  收藏信息_日期.append(fontAwesome_日期, 收藏信息_文本_日期);
  return 收藏信息_日期;
}

function 刷新收藏操作区(event) {
  const 事件发起者类名 = event.currentTarget.className;

  收藏数量.textContent = 博客收藏.length;
  if (收藏数量.textContent === "0") {
    收藏数量.style.visibility = "hidden";
  } else {
    收藏数量.style.visibility = "visible";
  }

  if (本次操作为添加) {
    收藏按钮.style.color = "orange";
    收藏提示.textContent = "已添加到收藏栏";
    收藏提示.style.color = "seagreen";
  } else {
    if (
      (事件发起者类名 === "删除条目按钮" &&
        技术栈名称 === 条目技术栈名称 &&
        专题名称 === 条目专题名称) ||
      事件发起者类名 === "收藏按钮"
    ) {
      收藏按钮.style.color = "white";
    }
    收藏提示.textContent = "已从收藏栏删除";
    收藏提示.style.color = "hotpink";
  }

  收藏提示.style.animation = "none";
  收藏提示.offsetHeight;
  收藏提示.style.animation = "收藏提示动画 1.25s ease-out";
}

function 获取当前日期() {
  const today = new Date();
  const 收藏时间 = `${today.getFullYear()}年${
    today.getMonth() + 1
  }月${today.getDate()}日`;

  return 收藏时间;
}

function 该页已被收藏() {
  return 博客收藏.some(
    (博客) => 博客.技术栈 === 技术栈名称 && 博客.专题 === 专题名称
  );
}

function 显示收藏栏() {
  收藏栏.showModal();
}

function 关闭收藏栏() {
  收藏栏.close();
}

function 初始化收藏栏() {
  博客收藏?.forEach((博客) => {
    const 删除条目按钮 = 生成条目删除按钮();

    const 收藏信息_技术栈 = 生成收藏信息技术栈(博客.技术栈);

    const 收藏信息_专题 = 生成收藏信息专题(博客.专题);

    const 收藏信息_日期 = 生成收藏信息日期(获取当前日期());

    const 条目 = document.createElement("div");
    条目.className = "收藏条目";

    条目.appendChild(删除条目按钮);

    const 收藏信息区 = document.createElement("div");
    收藏信息区.className = "收藏信息区";
    收藏信息区.append(收藏信息_技术栈, 收藏信息_专题, 收藏信息_日期);

    const image = document.createElement("img");

    let fileName = `./侧边栏/${博客.技术栈}.html`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileName, false); /* false -> 同步请求 */
    xhr.send();

    let imageSource = null;
    if (xhr.status === 200) {
      const parser = new DOMParser();
      const htmlText = parser.parseFromString(xhr.responseText, "text/html");
      imageSource = htmlText.querySelector(".专题名称 img");
    }

    image.src = imageSource.src;
    image.alt = imageSource.alt;
    const 收藏条目_标志 = document.createElement("figure");
    收藏条目_标志.className = "收藏条目-标志";
    收藏条目_标志.appendChild(image);

    条目.append(收藏条目_标志, 收藏信息区);
    收藏栏添加按钮.before(条目);
  });
}
