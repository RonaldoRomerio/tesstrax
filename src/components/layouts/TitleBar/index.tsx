import { Button } from '@/components/micro/button';
import { getCurrentWindow, Window } from '@tauri-apps/api/window';
import { Minimize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Titlebar() {

    const [appWindow, setAppWindow] = useState<Window | null>(null);

    useEffect(() => {
        async function fetchWindow() {
            const window = await getCurrentWindow();
            setAppWindow(window);
        }
        fetchWindow();
    }, []);

    const handleMinimize = () => appWindow?.minimize();
    const handleClose = () => appWindow?.close();
    return (
        <div className="flex items-center justify-end w-full h-10  text-white px-2 drag-region">
            <div className="flex gap-2">
                <Button.ToolBar
                    onClick={handleMinimize}
                    icon = {<Minimize2 size={16} />}/>
                <Button.ToolBar
                    onClick={handleClose}
                    icon = {<X size={16} />}/>
            </div>
        </div>
    );
}