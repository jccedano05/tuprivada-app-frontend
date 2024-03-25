interface IconButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  label,
}) => {
  return (
    <button className="innerButtonInput" onClick={onClick} aria-label={label}>
      {icon}
    </button>
  );
};
