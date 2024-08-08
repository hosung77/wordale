const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:45vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preblock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preblock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector(".timer");
      timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === `Backspace`) handleBackspace(thisBlock);
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const handleClick = (key) => {
    const keyCode = key.toUpperCase();
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (keyCode === "BACK") {
      handleBackspace();
    } else if (keyCode === "ENTER") {
      handleEnterKey();
    } else if (keyCode.length === 1 && /[A-Z]/.test(keyCode)) {
      thisBlock.innerText = keyCode;
      index += 1;
    }
  };

  const keyboardEvents = () => {
    const keyboardKeys = document.querySelectorAll(
      ".keyborad-block, .keyborad-block__enter, .keyborad-block__delete"
    );

    keyboardKeys.forEach((keyElement) => {
      keyElement.addEventListener("click", () => {
        const key = keyElement.getAttribute("data-key");
        handleClick(key);
      });
    });
  };

  startTimer();
  keyboardEvents();
  window.addEventListener("keydown", handleKeydown);
}

//camel표기법 변수 이름을 띄어쓰기 대신 바뀌는 단어 대문자로

appStart();
