"use client";
import Image from "next/image";
import { useRef } from 'react';
import { clsx } from "clsx";
declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    }
}

export default function Player({ trackUri, image, blur = true, className }: { trackUri: string, image: string, blur?: boolean, className?: string }) {
    const iframeRef = useRef(null);

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        let element = iframeRef.current
        let options = {
            uri: trackUri
        };
        let callback = (EmbedController: any) => {
            EmbedController.play();
        };
        IFrameAPI.createController(element, options, callback);
    };

    return (
        <div className={clsx("w-40 h-40", className)} >
            <Image src={image} width="160" height="160" className={clsx(blur === true && "blur-md", "z-50")} alt="Album Cover" />
            <div className="invisible">
                <div id="embed-iframe" ref={iframeRef} />
            </div>
        </ div>
    );
}