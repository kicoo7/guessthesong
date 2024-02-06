"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { clsx } from "clsx";
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: any) => void;
  }
}

export default function Player({
  trackUri,
  image,
  blur = true,
  className,
}: {
  trackUri: string;
  image: string;
  blur?: boolean;
  className?: string;
}) {
  const iframeRef = useRef(null);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      let element = iframeRef.current;
      let options = {
        uri: trackUri,
      };
      let callback = (EmbedController: any) => {
        EmbedController.play();
      };
      IFrameAPI.createController(element, options, callback);
    };

    return () => window.onSpotifyIframeApiReady = undefined;
  }, [trackUri]);

  return (
    <div className={clsx("w-full")}>
      <Image
        src={image}
        draggable={false}
        width="160"
        height="160"
        style={{
          objectFit: "cover",
        }}
        className={clsx(blur === true && "blur-md","animate-pulse", "z-50","w-48", "h-48", "mx-auto")}
        alt="Album Cover"
      />

      <div className="invisible absolute">
        <div id="embed-iframe" ref={iframeRef} />
      </div>
    </div>
  );
}
