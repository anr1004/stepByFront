interface IconProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt = "",
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: width, height: height }}
      className={className}
    />
  );
};

export default Icon;
