import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";

export const FingerPrint = () => {
    const [FingerPrint, setFingerPrint] = useState<string | null>(null)
    
    useEffect(() => {
        getFingerprint().then((FingerPrint) => setFingerPrint(FingerPrint))
    }, [])

    return <div>{FingerPrint}</div>
}

export default FingerPrint;
