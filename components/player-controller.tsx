"use client";
import { PlayerContext } from "@/components/player";
import { useContext, useEffect } from "react";

export default function PlayerController({
  trackUri,
  isPlaying = false,
}: {
  trackUri: string;
  isPlaying: boolean;
}) {
  const embedController = useContext(PlayerContext);
  useEffect(() => {
    if (!embedController) {
      return;
    }

    if (!trackUri) {
      return;
    }

    // loads the song
    embedController?.loadUri(trackUri);

    if (isPlaying) {
      embedController?.play();
      embedController?.seek(15);
    } else {
      embedController?.togglePlay();
    }
  }, [trackUri, embedController, isPlaying]);

  return <></>;
}
