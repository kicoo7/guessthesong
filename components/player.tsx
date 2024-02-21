"use client";
import Script from "next/script";
import { Context, createContext, useState } from "react";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    EmbedController?: any;
  }
}

type EmbedController = {
  play: () => void;
  seek: (position: number) => void;
  togglePlay: () => void;
  loadUri: (uri: string) => void;
  addListener: (event: string, callback: () => void) => void;
};

export const PlayerContext: Context<EmbedController | null> = createContext<EmbedController | null>(null);

export default function Player({ children }: { children: React.ReactNode }) {
  const [embedController, setEmbedController]: [null | EmbedController, any] =
    useState(null);

  return (
    <>
      <Script
        src="https://open.spotify.com/embed/iframe-api/v1"
        // onLoad executes code after the script has finished loading
        onLoad={() => {
          window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
            const iframe = document.getElementById("embed-iframe");

            if (!iframe) {
              return;
            }

            let options = {
              uri: "spotify:track:6WzRpISELf3YglGAh7TXcG", // random track just to initialize the iframe
              width: 100, // we hide the spotify embed either way
              height: 100,
            };
            let callback = (EmbedController: EmbedController) => {
              EmbedController.addListener("ready", () => {
                console.log("Spotify EmbedController is ready");
                setEmbedController(EmbedController);
              });
            };
            IFrameAPI.createController(iframe, options, callback);
          };
        }}
      />

      <PlayerContext.Provider value={embedController}>
        {children}
      </PlayerContext.Provider>

      <div className="invisible absolute top-0 left-0">
        <div id="embed-iframe" />
      </div>
    </>
  );
}
