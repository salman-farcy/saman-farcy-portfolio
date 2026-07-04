import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text?: string;
  texts?: string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  onComplete?: () => void;
  hideCursorOnComplete?: boolean;
  className?: string;
  cursorColor?: string;
  cursorChar?: string;
}

export default function Typewriter({
  text = "",
  texts,
  speed = 50,
  deleteSpeed = 30,
  delay = 0,
  pauseDelay = 1500,
  loop = true,
  onComplete,
  hideCursorOnComplete = true,
  className = "",
  cursorColor,
  cursorChar = "▋"
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  // States for handling multiple texts (looping/deleting animation)
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let delayTimeout: NodeJS.Timeout;
    if (delay > 0) {
      delayTimeout = setTimeout(() => setStarted(true), delay);
    } else {
      setStarted(true);
    }
    return () => clearTimeout(delayTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    // Single text mode (non-looping / standard typewriter)
    if (!texts || texts.length === 0) {
      let currentIndex = 0;
      setDisplayText("");
      setIsComplete(false);

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) {
            onComplete();
          }
        }
      }, speed);

      return () => clearInterval(interval);
    }

    // Multiple texts mode (Typing -> Pause -> Deleting -> Next Word)
    const currentFullText = texts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting animation
      const deleteTick = () => {
        setDisplayText((prev) => {
          if (prev.length > 0) {
            timeoutId = setTimeout(deleteTick, deleteSpeed);
            return prev.slice(0, -1);
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prevIndex) => {
              const nextIndex = prevIndex + 1;
              if (nextIndex >= texts.length) {
                if (loop) {
                  return 0;
                } else {
                  setIsComplete(true);
                  if (onComplete) onComplete();
                  return prevIndex; // Stop at last index
                }
              }
              return nextIndex;
            });
            return "";
          }
        });
      };
      timeoutId = setTimeout(deleteTick, deleteSpeed);
    } else {
      // Typing animation
      let currentIndex = displayText.length;
      const typeTick = () => {
        if (currentIndex < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(typeTick, speed);
        } else {
          // Finished typing the current word
          if (texts.length === 1 && !loop) {
            setIsComplete(true);
            if (onComplete) onComplete();
          } else {
            // Pause before deleting
            timeoutId = setTimeout(() => {
              if (loop || currentTextIndex < texts.length - 1) {
                setIsDeleting(true);
              } else {
                setIsComplete(true);
                if (onComplete) onComplete();
              }
            }, pauseDelay);
          }
        }
      };
      timeoutId = setTimeout(typeTick, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [started, text, texts, speed, deleteSpeed, pauseDelay, loop, isDeleting, currentTextIndex, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {(!isComplete || !hideCursorOnComplete || isDeleting || (texts && texts.length > 1)) && started && (
        <span
          className="inline-block ml-1 animate-cursor-blink font-normal"
          style={{ color: cursorColor || "currentColor" }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
