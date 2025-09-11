import { useState, useRef, useCallback, useEffect } from 'react'
import { Menu as MenuIcon, X} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Position, TDragButtonMenu } from './types'

export default function DragButtonMenu({children} : TDragButtonMenu) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [position, setPosition] = useState<Position>({ x: 50, y: 200 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
    const menuRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
            setIsDragging(true)
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            })
            e.preventDefault()
        }
    }, [position])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragStart.x))
            const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragStart.y))

            setPosition({ x: newX, y: newY })
        }
    }, [isDragging, dragStart])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, handleMouseMove, handleMouseUp])

    const handleMenuClick = () => {
        if (!isDragging) {
            setIsExpanded(!isExpanded)
        }
    }
    return (
                <div
                    ref={menuRef}
                    className="pointer-events-auto"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                    }}
                >
                    <div className="relative">
                        <div
                            className={cn(
                                "absolute bottom-full left-0 mb-2 transition-all duration-300 ease-out",
                                isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                            )}
                        >
                            <div className="flex flex-col gap-2">
                                {children}
                            </div>
                        </div>

                        <Button
                            className={cn(
                                "drag-handle w-12 h-12 bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-move",
                                "border border-gray-600 shadow-lg",
                                isDragging && "scale-105 shadow-xl"
                            )}
                            onMouseDown={handleMouseDown}
                            onClick={handleMenuClick}
                        >
                            {isExpanded ? (
                                <X className="w-5 h-5 text-white" />
                            ) : (
                                <MenuIcon className="w-5 h-5 text-white" />
                            )}
                        </Button>
                    </div>
                </div>
    )
}
