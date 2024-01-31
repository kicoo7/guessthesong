"use client";

import { Button } from "@/app/_ui/button";
import { useState } from "react";



export function NextSongButton(){
    const [isClicked, setIsClicked] = useState(false);

    function onClick(){
        setIsClicked(true);
        // router.prefetch
    }

    return (
        
    <Button className="mt-6" disabled={isClicked} onClick={onClick}>
        Next Song
    </Button>
    );
}