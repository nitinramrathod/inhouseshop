type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-xl",
};

function getInitials(name: string) {
  if (!name) return "";

  const parts = name.trim().split(" ");

  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar = ({ name, size = "md" }: AvatarProps) => {
  const initials = getInitials(name);

  return (
    <div
      className={`
        ${sizeMap[size]}
        rounded-full 
        border-2 border-blue-500 
        bg-blue-100 
        text-blue-700 
        flex items-center justify-center 
        font-semibold 
        uppercase 
        select-none
      `}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
