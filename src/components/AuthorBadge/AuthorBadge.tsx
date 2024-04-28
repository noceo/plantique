import CustomImage from "../CustomImage/CustomImage";

interface AuthorBadgeProps {
  name: string;
  imgSrc: string;
  imgAlt: string;
}

export default function AuthorBadge({
  name,
  imgSrc,
  imgAlt,
}: AuthorBadgeProps) {
  return (
    <div className="author-badge">
      <div className="author-badge__img" style={{ position: "relative" }}>
        <CustomImage src={imgSrc} alt={imgAlt} />
      </div>
      <p className="author-badge__name">{name}</p>
    </div>
  );
}
