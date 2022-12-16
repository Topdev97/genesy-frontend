import ArtistCard from "./ArtistCard";
import LinkWithSearchParams from "../LinkWithSearchParams";
const Artistboard = ({ items }: any) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-8">
        {items?.slice(0, 8)?.map((item: any, index: number) => (
          <div key={index}>
            <LinkWithSearchParams
              to={{
                pathname: `/profile/${item?.wallet}`,
              }}
            >
              <ArtistCard profile={item} index={index} />
            </LinkWithSearchParams>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artistboard;
