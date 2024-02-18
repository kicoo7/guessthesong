"use client";
import Script from "next/script";
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
    EmbedController?: any;
  }
}

export default function Player() {
  return (
    <>
      <Script
        src="https://open.spotify.com/embed/iframe-api/v1"
        onReady={() => {
          window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
            const element = document.getElementById("embed-iframe");
            let options = {
              uri: "spotify:track:6WzRpISELf3YglGAh7TXcG",
              width: 100,
              height: 100,
            };
            let callback = (EmbedController: any) => {
              EmbedController.addListener("ready", () => {
                window.EmbedController = EmbedController;
                console.log("The EmbedController is ready");
              });
            };
            IFrameAPI.createController(element, options, callback);
          };
        }}
      />

      <div className="invisible absolute top-0 left-0">
        <div id="embed-iframe" />
      </div>
    </>
  );
}
