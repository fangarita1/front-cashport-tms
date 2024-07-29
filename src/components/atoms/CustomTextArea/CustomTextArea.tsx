import React, { useEffect, useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";
import "./customTextArea.scss";

type CustomTextAreProps = {
  field?: ControllerRenderProps<any>;
  placeholder?: string;
  customStyles?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  highlightWords?: string[];
};

export const CustomTextArea = ({
  field,
  placeholder,
  customStyles,
  onChange,
  value,
  highlightWords
}: CustomTextAreProps) => {
  //
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    const mirror = mirrorRef.current;

    if (textarea && mirror) {
      // Set up styles and event listeners
      const textareaStyles = window.getComputedStyle(textarea);
      // ... existing code for setting up styles
      [
        "border",
        "boxSizing",
        "fontFamily",
        "fontSize",
        "fontWeight",
        "letterSpacing",
        "lineHeight",
        "padding",
        "textDecoration",
        "textIndent",
        "textTransform",
        "whiteSpace",
        "wordSpacing",
        "wordWrap"
      ].forEach((property: any) => {
        mirror.style[property] = textareaStyles[property];
      });
      mirror.style.borderColor = "transparent";

      const parseValue = (v: string) => (v.endsWith("px") ? parseInt(v.slice(0, -2), 10) : 0);
      const borderWidth = parseValue(textareaStyles.borderWidth);

      const ro = new ResizeObserver(() => {
        mirror.style.width = `${textarea?.clientWidth + 2 * borderWidth}px`;
        mirror.style.height = `${textarea?.clientHeight + 2 * borderWidth}px`;
      });
      ro.observe(textarea);

      textarea.addEventListener("scroll", () => {
        mirror.scrollTop = textarea.scrollTop;
      });

      // Set up scroll event listener
      textarea.addEventListener("scroll", () => {
        mirror.scrollTop = textarea.scrollTop;
      });

      //set up value
      mirror.textContent = value ? value : "";

      // Highlight keywords

      if (highlightWords) {
        const highlight = () => {
          const regexp = new RegExp(highlightWords.join("|"), "gi");
          mirror.innerHTML = value
            ? value?.replace(regexp, '<span class="container__mark">$&</span>')
            : "";
        };
        highlight();
      }
      //   const highlight = () => {
      //     const regexp = new RegExp(KEYWORD, "gi");
      //     mirror.innerHTML = value
      //       ? value?.replace(regexp, '<span class="container__mark">$&</span>')
      //       : "";
      //   };
      //   highlight();
    }
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(e);
  };

  //
  return (
    <div className="container" id="container" style={customStyles}>
      <div ref={mirrorRef} className="container__mirror" />
      <textarea
        {...field}
        ref={textareaRef}
        id="textarea"
        className="container__textarea"
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
};
