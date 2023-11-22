"use client";

import Image from "next/image";

export default function Player({ trackUri, image }: { trackUri: string, image: string }) {
    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        // use ref
        let element = document.getElementById('embed-iframe');
        console.log("element", element);
        let options = {
            uri: trackUri
        };
        let callback = (EmbedController: any) => {
            EmbedController.play();
            console.log("play");
        };
        IFrameAPI.createController(element, options, callback);
    };

    return (
        <div className="w-64 h-64">
            <Image src={image} width="400" height="400" className="blur-md z-50" alt="cover" />
            <div className="invisible">
                <div id="embed-iframe" />
            </div>
        </div>
    );
}