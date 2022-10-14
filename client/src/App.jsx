import React, { useEffect, useRef } from "react";
import "./App.css";
import { Player, Video, DefaultUi, usePlayerContext } from "@vime/react";

import "@vime/core/themes/default.css";

function App() {
  /** @type {React.MutableRefObject<HTMLVmPlayerElement>} */
  const player = useRef(null);

  const [currentTime] = usePlayerContext(player, "currentTime", 0);

  useEffect(() => {
    console.log(currentTime);
    console.log(player.current);
  }, [currentTime]);

  return (
    <Player controls ref={player}>
      <Video crossOrigin="" poster="https://media.vimejs.com/poster.png">
        <source data-src="/video" type="video/mp4" />
        <track
          default
          kind="subtitles"
          src="https://media.vimejs.com/subs/english.vtt"
          srcLang="en"
          label="English"
        />
      </Video>
    </Player>
  );
}

export default App;
