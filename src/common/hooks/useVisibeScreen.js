import { useState } from "react";

export default function useCalculateVisibleScreen() {
    const [dimensions, setDimensions] = useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const onLayout = /**
     *
     * @param {LayoutChange} evt
     * @returns
     */ (evt) => {
        if (evt) {
            setDimensions(evt.nativeEvent.layout);
        }
    };

    return { dimensions, onLayout };
}
