import React from "react";
import "./submit-btn.scss";

interface ButtonProps {
  text: string;
  color: string;
  bg: string;
  disabled?: boolean;

  onClick?: () => void;
}

const SubmitButton: React.FC<ButtonProps> = ({
  text,
  color,
  bg,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="submit-btn"
      style={{ backgroundColor: bg, color: color }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
