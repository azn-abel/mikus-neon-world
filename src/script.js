// import { Player, stringToDataUrl } from 'textalive-app-api';

const { Player, stringToDataUrl } = TextAliveApp;

const SongList = [
  {
      "jpTitle": "king妃jack躍",
      "enTitle": "king ki jack yaku",
      "jpArtist": "宮守文学 feat. 初音ミク",
      "enArtist": "Miyamori Bungaku feat. Hatsune Miku",
      "url": "https://piapro.jp/t/ucgN/20230110005414",
      "beatId": 4267297,
      "chordId": 2405019,
      "repetitiveSegmentId": 2405019,
      "lyricId": 56092,
      "lyricDiffId": 9636
  },
  {
      "jpTitle": "生きること",
      "enTitle": "To live",
      "jpArtist": "nogumi feat. 初音ミク",
      "enArtist": "nogumi feat. Hatsune Miku",
      "url": "https://piapro.jp/t/fnhJ/20230131212038",
      "beatId": 4267300,
      "chordId": 2405033,
      "repetitiveSegmentId": 2475606,
      "lyricId": 56131,
      "lyricDiffId": 9638
  },
  {
      "jpTitle": "唱明者",
      "enTitle": "Shoumeisha",
      "jpArtist": "すこやか大聖堂 feat. KAITO",
      "enArtist": "SukoyaCathedral feat. KAITO",
      "url": "https://piapro.jp/t/Vfrl/20230120182855",
      "beatId": 4267334,
      "chordId": 2405059,
      "repetitiveSegmentId": 2475645,
      "lyricId": 56095,
      "lyricDiffId": 9637
  },
  {
      "jpTitle": "ネオンライトの海を往く",
      "enTitle": "Going through a sea of Neon lights",
      "jpArtist": "Ponchi♪ feat. 初音ミク",
      "enArtist": "Ponchi♪ feat. Hatsune Miku",
      "url": "https://piapro.jp/t/fyxI/20230203003935",
      "beatId": 4267373,
      "chordId": 2405138,
      "repetitiveSegmentId": 2475664,
      "lyricId": 56096,
      "lyricDiffId": 9639
  },
  {
      "jpTitle": "ミュウテイション",
      "enTitle": "Mutation",
      "jpArtist": "Rin（Kuroneko Lounge） feat. 初音ミク",
      "enArtist": "Rin (Kuroneko Lounge) feat. Hatsune Miku",
      "url": "https://piapro.jp/t/Wk83/20230203141007",
      "beatId": 4267381,
      "chordId": 2405285,
      "repetitiveSegmentId": 2475676,
      "lyricId": 56097,
      "lyricDiffId": 9640
  },
  {
      "jpTitle": "Entrust via 39",
      "enTitle": "Entrust via 39",
      "jpArtist": "ikomai feat. 初音ミク",
      "enArtist": "ikomai feat. Hatsune Miku",
      "url": "https://piapro.jp/t/Ya0_/20230201235034",
      "beatId": 4269734,
      "chordId": 2405723,
      "repetitiveSegmentId": 2475686,
      "lyricId": 56098,
      "lyricDiffId": 9643
  }
]

//Current display language for the settings
var currentLanguage = "en";

var glowEnabled = true;
var speakerEnabled = true;

//Song information for the api
var currentIdx = 0;
var currentUrl = SongList[0].url;
var currentBeatId = SongList[0].beatId;
var currentChordId = SongList[0].chordId;
var currentRepetitiveSegmentId = SongList[0].repetitiveSegmentId;
var currentLyricId = SongList[0].lyricId;
var currentLyricDiffId= SongList[0].lyricDiffId;
// TextAlive Player を初期化
var player = new Player({
  // トークンは https://developer.textalive.jp/profile で取得したものを使う
  app: { token: "Pdy9v41sWiA1utfh" },
  mediaElement: document.querySelector("#media"),
  mediaBannerPosition: "top right"

  // オプション一覧
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
});

const overlay = document.querySelector("#overlay");
const popupOverlay = document.querySelector("#popup-overlay");
const textContainer = document.querySelector("#text");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");
const dropdownButton = document.querySelector("#dropbtn");
let b, c;

let resting = false;
let restCount = 0;
//Beatbar colors
let r1, r2, g1, g2, b1, b2;

function beginPlayback() {
  player.addListener({
    /* APIの準備ができたら呼ばれる */
    onAppReady(app) {
      if (app.managed) {
        document.querySelector("#control").className = "disabled";
      }
      if (!app.songUrl) {
        document.querySelector("#media").className = "disabled";
        popupOverlay.className = "disabled";
        // king妃jack躍 / 宮守文学 feat. 初音ミク
        // https://developer.textalive.jp/events/magicalmirai2023/#snippets
        player.createFromSongUrl(currentUrl);
        player.isPlaying = false;
        // , {
        //   video: {
        //     beatId: currentBeatId,
        //     chordId: currentChordId,
        //     repetitiveSegmentId: currentRepetitiveSegmentId,
        //     lyricId: currentLyricId,
        //     lyricDiffId: currentLyricDiffId
        //   }
        // });
      }
    },
  
    /* 楽曲が変わったら呼ばれる */
    onAppMediaChange() {
      // 画面表示をリセット
      window.playerLoaded = false;
      overlay.className = "";
      let loadingCircle = document.getElementById('loader');
      loadingCircle.style.visibility = ""
      let overlayText = document.getElementById('overlay-text');
      if (currentLanguage === "en") {
        overlayText.textContent = 'Loading Player';
      }
      else {
        overlayText.textContent = '読み込み中';
      }
      resetChars();
    },
  
    /* 楽曲情報が取れたら呼ばれる */
    onVideoReady(video) {
      // 楽曲情報を表示
      document.querySelector("#artist span").textContent =
        player.data.song.artist.name;
      document.querySelector("#song span").textContent = player.data.song.name;
  
      // 最後に表示した文字の情報をリセット
      c = null;
    },
  
    /* 再生コントロールができるようになったら呼ばれる */
    onTimerReady() {
      window.playerLoaded = true;
      let loadingCircle = document.getElementById('loader');
      let overlayText = document.getElementById('overlay-text');
      if (window.textureLoaded) {
        loadingCircle.style.visibility = "hidden";
        overlay.className = "ready";
        if (currentLanguage === "en") {
          overlayText.textContent = 'Click to enter.';
        } else {
          overlayText.textContent = 'クリックして進む';
        }
      }
      console.log(navigator.userAgent)
      document.querySelector("#control > a#play").className = "";
      document.querySelector("#control > a#stop").className = "";
      document.querySelector("#settings > a#settei").className = "";
      document.querySelector("#settings > a#musicButton").className = "";
    },
  
    /* 再生位置の情報が更新されたら呼ばれる */
    onTimeUpdate(position) {
      // シークバーの表示を更新
      paintedSeekbar.style.width = `${
        parseInt((position * 1000) / player.video.duration) / 10
      }%`;
  
      // 現在のビート情報を取得
      let beat = player.findBeat(position);
      if (b !== beat) {
        if (beat) {
          requestAnimationFrame(() => {
            // bar.className = "active";
            requestAnimationFrame(() => {
              // bar.className = "active beat";
            });
          });
        }
        b = beat;
        if (resting) {
          restCount += 1;
        }
      }
  
      // 歌詞情報がなければこれで処理を終わる
      if (!player.video.firstChar) {
        return;
      }
  
      // 巻き戻っていたら歌詞表示をリセットする
      if (c && c.startTime > position + 2000) {
        resetChars();
      }
  
      // 500ms先に発声される文字を取得
      let current = c || player.video.firstChar;

      if (!current.next || current.next.startTime - current.startTime > 1500) {
        resting = true;

        if (restCount >= 4) {
          document.getElementById("lyrics").style.opacity = document.getElementById("lyrics").style.opacity - .1;
        }
      }

      while (current && current.startTime < position) {
        // 新しい文字が発声されようとしている
        if (c !== current) {
          newChar(current);
          c = current;
        }
        current = current.next;
      }
    },
  
    /* 楽曲の再生が始まったら呼ばれる */
    onPlay() {
      const a = document.querySelector("#control > a#play");
      while (a.firstChild) a.removeChild(a.firstChild);
      a.appendChild(document.createTextNode("\uf28b"));
    },
  
    /* 楽曲の再生が止まったら呼ばれる */
    onPause() {
      const a = document.querySelector("#control > a#play");
      while (a.firstChild) a.removeChild(a.firstChild);
      a.appendChild(document.createTextNode("\uf144"));
    }
  });
}

getBarColors();
beginPlayback();

/* 再生・一時停止ボタン */
document.querySelector("#control > a#play").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    if (player.isPlaying) {
      player.requestPause();
    } else {
      player.requestPlay();
    }
  }
  return false;
});

/* 停止ボタン */
document.querySelector("#control > a#stop").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    // bar.className = "";
    resetChars();
  }
  return false;
});

/* シークバー */
seekbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (player && player.isPlaying) {
    player.requestMediaSeek(
      (player.video.duration * e.offsetX) / seekbar.clientWidth
    );
  }
  return false;
});

var prevClasses = []
/**
 * 新しい文字の発声時に呼ばれる
 * Called when a new character is being vocalized
 */
function newChar(current) {
  // 品詞 (part-of-speech)
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/iword.html#pos
  restCount = 0;
  resting = false;
  document.getElementById("lyrics").style.opacity = 1;
  if (prevClasses.includes("lastChar")) {
    resetChars();
  }

  const classes = [];
  if (
    current.parent.pos === "N" ||
    current.parent.pos === "PN" ||
    current.parent.pos === "X"
  ) {
    classes.push("noun");
  }

  // フレーズの最後の文字か否か
  if (current.parent.parent.lastChar === current) {
    classes.push("lastChar");
  }

  // 英単語の最初か最後の文字か否か
  if (current.parent.language === "en") {
    if (current.parent.lastChar === current) {
      classes.push("lastCharInEnglishWord");
    } else if (current.parent.firstChar === current) {
      classes.push("firstCharInEnglishWord");
    }
  }

  prevClasses = classes;

  // noun, lastChar クラスを必要に応じて追加
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(current.text));

  // 文字を画面上に追加
  const container = document.createElement("div");
  container.className = classes.join(" ");
  container.appendChild(div);
  // container.addEventListener("click", () => {
  //   player.requestMediaSeek(current.startTime);
  // });
  textContainer.appendChild(container);
}

/**
 * 歌詞表示をリセットする
 * Reset lyrics view
 */
function resetChars() {
  c = null;
  while (textContainer.firstChild)
    textContainer.removeChild(textContainer.firstChild);
}

function changeSong(songIndex) {
  closeForm("musicForm");
  // var x = document.getElementById("myLinks");
  // if (x.style.visibility === "visible") {
  //   x.style.visibility = "hidden";
  // } else {
  //   x.style.display = "visible";
  // }
  
  currentIdx = songIndex;
  currentUrl = SongList[songIndex].url;
  currentBeatId = SongList[songIndex].beatId;
  currentChordId = SongList[songIndex].chordId;
  currentRepetitiveSegmentId = SongList[songIndex].repetitiveSegmentId;
  currentLyricId = SongList[songIndex].lyricId;
  currentLyricDiffId= SongList[songIndex].lyricDiffId

  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    // bar.className = "";
    resetChars();
  }

  player = new Player({
    // トークンは https://developer.textalive.jp/profile で取得したものを使う
    app: { token: "test" },
    mediaElement: document.querySelector("#media"),
    mediaBannerPosition: "top right"
  
    // オプション一覧
    // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
  });
  
  overlay.className = "enabled";
  overlayText = document.getElementById('overlay-text');
  let loadingCircle = document.getElementById('loader');
  loadingCircle.style.visibility = ""
  if (currentLanguage == "en") {
    overlayText.textContent = 'Loading Player';
  }
  else {
    overlayText.textContent = '読み込み中';
  }
  document.querySelector("#control > a#play").className = "disabled";
  document.querySelector("#control > a#stop").className = "disabled";
  document.querySelector("#settings > a#settei").className = "disabled";
  document.querySelector("#settings > a#musicButton").className = "disabled";

  beginPlayback();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  // if (!event.target.matches('#myLinks') && !event.target.matches('.icon')) {
  //   var x = document.getElementById("myLinks");
  //   x.style.visibility = "hidden";
  // }
  if (overlay.className === 'ready') {
    overlay.className = 'disabled';
  }
}

function openForm(formName) {
  const form = document.getElementById(formName)
  form.style.display = "flex";
  popupOverlay.className = "enabled";
  document.querySelector("#control > a#play").className = "disabled";
  document.querySelector("#control > a#stop").className = "disabled";
  document.querySelector("#settings > a#settei").className = "disabled";
  document.querySelector("#settings > a#musicButton").className = "disabled";
}

function getBarColors() {
  var color1 = parseInt(document.getElementById("bar-color1").value.substring(1, 7), 16);
  var color2 = parseInt(document.getElementById("bar-color2").value.substring(1, 7), 16);

  r1 = Math.floor(color1 / 0x10000);
  r2 = Math.floor(color2 / 0x10000);
  g1 = color1 % 0x10000;
  g1 = Math.floor(g1 / 0x100);
  g2 = color2 % 0x10000;
  g2 = Math.floor(g2 / 0x100);
  b1 = color1 % 0x100;
  b2 = color2 % 0x100;

  console.info( "Initial Beatbar RGB: (" + r1 + ", " + g1 + ", " + b1 + "), (" + r2 + ", " + g2 + ", " + b2 + ")");

}

function closeForm(formName) {
  
  if (formName == "myForm") {
    // Handle changes in font color
    var mainColor = parseInt(document.getElementById("color-picker").value.substring(1, 7), 16);
    shadowColor = mainColor - 0x555555;
    nounColor = mainColor + 0x555555;

    if (shadowColor < 0) {
      shadowColor = 0;
    }
    if (nounColor > 0xffffff) {
      nounColor = 0xffffff;
    }
    console.log(mainColor);
    console.log(shadowColor);
    console.log(nounColor);
    console.log("#" + mainColor.toString(16) + ", #" + shadowColor.toString(16) + ", #" + nounColor.toString(16));

    document.getElementById("lyrics").style.color = "#" + mainColor.toString(16); 
    document.getElementById("lyrics").style.textShadow = "2px 2px 3px #" + shadowColor.toString(16);
    document.querySelectorAll(".noun").color = "#" + nounColor.toString(16); 

    // Handle changes in beatbar color

    getBarColors();
  }

  // Close form
  document.getElementById(formName).style.display = "none";
  popupOverlay.className = "disabled";
  document.querySelector("#control > a#play").className = "";
  document.querySelector("#control > a#stop").className = "";
  document.querySelector("#settings > a#settei").className = "";
  document.querySelector("#settings > a#musicButton").className = "";
}

const slider = document.getElementById("myRange");
slider.oninput = function Volume(e) {
  audioElement.volume = e.target.value/100;
  console.log(e.target.value);
}

  window.onkeydown = function( esc ) {
    if ( esc.keyCode == 27 ) {
      closeForm('myForm');
      closeForm('musicForm');
    };
  };

function handleGlowChange() {
  const glowButton = document.getElementById("glow-button");
  if (glowEnabled) {
    glowButton.innerHTML = "Off"
  } else {
    glowButton.innerHTML = "On"
  }
  glowEnabled = !glowEnabled
}

function handleSpeakerChange() {
  const speakerButton = document.getElementById("speaker-button");
  if (speakerEnabled) {
    speakerButton.innerHTML = "Off"
  } else {
    speakerButton.innerHTML = "On"
  }
  speakerEnabled = !speakerEnabled
}

function switchLanguage() {
  if (currentLanguage == "en") {
    currentLanguage = "jp";
    document.getElementById("language-button").innerHTML = "English";
    document.getElementById("settings-header").innerHTML = "設定";
    // document.getElementById("expression-header").innerHTML = "表情";
    // document.getElementById("smile").innerHTML = "笑顔";
    // document.getElementById("frown").innerHTML = "しかめ面";
    // document.getElementById("angry").innerHTML = "怒ってる";
    // document.getElementById("shy").innerHTML = "照れてる";
    // document.getElementById("visual-header").innerHTML = "ビジュアル効果";
    // document.getElementById("low").innerHTML = "低";
    // document.getElementById("medium").innerHTML = "中";
    // document.getElementById("high").innerHTML = "高";
    // document.getElementById("animation-header").innerHTML = "アニメーション";
    // document.getElementById("mouth").innerHTML = "口";
    // document.getElementById("speakers").innerHTML = "スピーカー";
    // document.getElementById("both").innerHTML = "両方";
    document.getElementById("beatbar-header").innerHTML = "ビートバーの色";
    document.getElementById("lyrics-header").innerHTML = "歌詞の色";
    document.getElementById("overlay-text").innerHTML = "読み込み中";
    document.getElementById("language-select").innerHTML = "言語";
    document.getElementById("volume-label").innerHTML = "音量";

    document.getElementById("change-song-header").innerHTML = "曲変化";
    document.getElementById("cancelButton").innerHTML = "キャンセル";
    document.getElementById("glow-header").innerHTML = "明かり効果";
    document.getElementById("speaker-header").innerHTML = "スピーカーアニメーション";


    document.getElementById("kingJack").innerHTML = "king妃jack躍";
    document.getElementById("toLive").innerHTML = "生きること";
    document.getElementById("shoumeisha").innerHTML = "唱明者";
    document.getElementById("neonLights").innerHTML = "ネオンライトの海を往く";
    document.getElementById("mutation").innerHTML = "ミュウテイション";
  }
  else {
    currentLanguage = "en";
    document.getElementById("language-button").innerHTML = "日本語";
    document.getElementById("settings-header").innerHTML = "Settings";
    // document.getElementById("expression-header").innerHTML = "Expression";
    // document.getElementById("smile").innerHTML = "Smile";
    // document.getElementById("frown").innerHTML = "Frown";
    // document.getElementById("angry").innerHTML = "Angry";
    // document.getElementById("shy").innerHTML = "Shy";
    // document.getElementById("visual-header").innerHTML = "Visual Effects";
    // document.getElementById("low").innerHTML = "Low";
    // document.getElementById("medium").innerHTML = "Medium";
    // document.getElementById("high").innerHTML = "High";
    // document.getElementById("animation-header").innerHTML = "Animation";
    // document.getElementById("mouth").innerHTML = "Mouth";
    // document.getElementById("speakers").innerHTML = "Speakers";
    // document.getElementById("both").innerHTML = "Both";
    document.getElementById("beatbar-header").innerHTML = "Beatbar Color";
    document.getElementById("lyrics-header").innerHTML = "Lyrics Color";
    document.getElementById("overlay-text").innerHTML = "Loading Player";
    document.getElementById("language-select").innerHTML = "Language";
    document.getElementById("volume-label").innerHTML = "Volume";

    document.getElementById("change-song-header").innerHTML = "Change Song";
    document.getElementById("cancelButton").innerHTML = "Cancel";
    document.getElementById("glow-header").innerHTML = "Glow Effect";
    document.getElementById("speaker-header").innerHTML = "Speaker Bounce";

    document.getElementById("kingJack").innerHTML = "king ki jack yaku";
    document.getElementById("toLive").innerHTML = "To live";
    document.getElementById("shoumeisha").innerHTML = "shoumeisha";
    document.getElementById("neonLights").innerHTML = "Going through a sea of Neon lights";
    document.getElementById("mutation").innerHTML = "Mutation";
  }
}