import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-0pa6JRaq.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
const TextRotate = reactExports.forwardRef(
  ({
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2e3,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...props
  }, ref) => {
    const [currentTextIndex, setCurrentTextIndex] = reactExports.useState(0);
    const splitIntoCharacters = (text) => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), ({ segment }) => segment);
      }
      return Array.from(text);
    };
    const elements = reactExports.useMemo(() => {
      const currentText = texts[currentTextIndex];
      if (splitBy === "characters") {
        const text = currentText.split(" ");
        return text.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== text.length - 1
        }));
      }
      return splitBy === "words" ? currentText.split(" ") : splitBy === "lines" ? currentText.split("\n") : currentText.split(splitBy);
    }, [texts, currentTextIndex, splitBy]);
    const getStaggerDelay = reactExports.useCallback(
      (index, totalChars) => {
        const total = totalChars;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * staggerDuration;
        }
        if (staggerFrom === "random") {
          const randomIndex = Math.floor(Math.random() * total);
          return Math.abs(randomIndex - index) * staggerDuration;
        }
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [staggerFrom, staggerDuration]
    );
    const handleIndexChange = reactExports.useCallback((newIndex) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    }, [onNext]);
    const next = reactExports.useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? loop ? 0 : currentTextIndex : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);
    const previous = reactExports.useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? loop ? texts.length - 1 : currentTextIndex : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);
    const jumpTo = reactExports.useCallback(
      (index) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );
    const reset = reactExports.useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);
    reactExports.useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset
      }),
      [next, previous, jumpTo, reset]
    );
    reactExports.useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.span,
      {
        className: cn("flex flex-wrap whitespace-pre-wrap", mainClassName),
        ...props,
        layout: true,
        transition,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: texts[currentTextIndex] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnimatePresence,
            {
              mode: animatePresenceMode,
              initial: animatePresenceInitial,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: cn(
                    "flex flex-wrap",
                    splitBy === "lines" && "flex-col w-full"
                  ),
                  layout: true,
                  "aria-hidden": "true",
                  children: (splitBy === "characters" ? elements : elements.map((el, i) => ({
                    characters: [el],
                    needsSpace: i !== elements.length - 1
                  }))).map((wordObj, wordIndex, array) => {
                    const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: cn("inline-flex", splitLevelClassName),
                        children: [
                          wordObj.characters.map((char, charIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.span,
                            {
                              initial,
                              animate,
                              exit,
                              transition: {
                                ...transition,
                                delay: getStaggerDelay(
                                  previousCharsCount + charIndex,
                                  array.reduce(
                                    (sum, word) => sum + word.characters.length,
                                    0
                                  )
                                )
                              },
                              className: cn("inline-block", elementLevelClassName),
                              children: char
                            },
                            charIndex
                          )),
                          wordObj.needsSpace && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-pre", children: " " })
                        ]
                      },
                      wordIndex
                    );
                  })
                },
                currentTextIndex
              )
            }
          )
        ]
      }
    );
  }
);
TextRotate.displayName = "TextRotate";
export {
  TextRotate as T
};
