import CustomImage from "../CustomImage/CustomImage";

interface CreatorCardProps {
  name: string;
  slogan: string;
  member_since: Date;
  imgSrc: string;
}

export default function CreatorCard({
  name,
  slogan,
  member_since,
  imgSrc,
}: CreatorCardProps) {
  return (
    <div className="creator-card">
      <div className="creator-card__img">
        <CustomImage src={imgSrc} alt={`Profile picture of ${name}`} />
      </div>
      <div className="creator-card__content">
        <p className="creator-card__name">{name}</p>
        <p className="creator-card__slogan">{slogan}</p>
        <p className="creator-card__member-since">
          Member since {member_since.getFullYear()}
        </p>
      </div>
    </div>
  );
}
