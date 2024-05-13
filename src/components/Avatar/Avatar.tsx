import CustomImage from "../CustomImage/CustomImage";

export default function Avatar() {
  return (
    <div className="avatar">
      <button>
        <CustomImage src="https://picsum.photos/50" alt="Avatar" />
      </button>
    </div>
  );
}
