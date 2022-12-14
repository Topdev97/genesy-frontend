import ArtistCard from "./ArtistCard";
const Artistboard = ({ items }: any) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {items?.slice(0, 8)?.map((item: any, index: number) => (
          <div key={index}>
            <ArtistCard profile={item} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artistboard;
