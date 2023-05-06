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
  app: { token: "test" },
  mediaElement: document.querySelector("#media"),
  mediaBannerPosition: "bottom right"

  // オプション一覧
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
});

const overlay = document.querySelector("#overlay");
const bar = document.querySelector("#bar");
const textContainer = document.querySelector("#text");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");
const dropdownButton = document.querySelector("#dropbtn");
let b, c;

function beginPlayback() {
  player.addListener({
    /* APIの準備ができたら呼ばれる */
    onAppReady(app) {
      if (app.managed) {
        document.querySelector("#control").className = "disabled";
      }
      if (!app.songUrl) {
        document.querySelector("#media").className = "disabled";
  
        // king妃jack躍 / 宮守文学 feat. 初音ミク
        // https://developer.textalive.jp/events/magicalmirai2023/#snippets
        player.createFromSongUrl(currentUrl, {
          video: {
            beatId: currentBeatId,
            chordId: currentChordId,
            repetitiveSegmentId: currentRepetitiveSegmentId,
            lyricId: currentLyricId,
            lyricDiffId: currentLyricDiffId
          }
        });
      }
    },
  
    /* 楽曲が変わったら呼ばれる */
    onAppMediaChange() {
      // 画面表示をリセット
      overlay.className = "";
      bar.className = "";
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
      overlay.className = "disabled";
      document.querySelector("#control > a#play").className = "";
      document.querySelector("#control > a#stop").className = "";
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
            bar.className = "active";
            requestAnimationFrame(() => {
              bar.className = "active beat";
            });
          });
        }
        b = beat;
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
    bar.className = "";
    resetChars();
  }
  return false;
});

/* シークバー */
seekbar.addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
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

dropdownButton.addEventListener("click", myFunction);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function changeSong(songIndex) {
  currentIdx = songIndex;
  currentUrl = SongList[songIndex].url;
  currentBeatId = SongList[songIndex].beatId;
  currentChordId = SongList[songIndex].chordId;
  currentRepetitiveSegmentId = SongList[songIndex].repetitiveSegmentId;
  currentLyricId = SongList[songIndex].lyricId;
  currentLyricDiffId= SongList[songIndex].lyricDiffId
  console.log(songIndex);

  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    bar.className = "";
    resetChars();
  }

  player = new Player({
    // トークンは https://developer.textalive.jp/profile で取得したものを使う
    app: { token: "test" },
    mediaElement: document.querySelector("#media"),
    mediaBannerPosition: "bottom right"
  
    // オプション一覧
    // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
  });
  
  overlay.className = "enabled";

  beginPlayback();
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}