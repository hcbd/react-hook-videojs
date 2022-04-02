import React, { useRef, useState, useEffect, useCallback } from "react";
import videojs from "video.js";

export const useVideoJS = (videoJsOptions, classNames = "") => {
  const [ready, setReady] = useState(false);
  const changedKey = JSON.stringify(videoJsOptions);
  const videoNode = useRef(null);
  const player = useRef(null);
  useEffect(() => {
    player.current = videojs(videoNode.current, videoJsOptions);
    player.current.ready(() => {
      setReady(true);
    });
    return () => {
      player.current.dispose();
    };
  }, [changedKey]);

  const Video = useCallback(
    ({ children, ...props }) => (
      <div data-vjs-player key={changedKey}>
        <video ref={videoNode} className={`video-js ${classNames}`} {...props}>
          {children}
        </video>
      </div>
    ),
    [changedKey]
  );
  return { Video, ready, player: player.current };
};
