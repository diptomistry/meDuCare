
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onItemSelect   }) => {
  return (
    <div className=" w-full bg-[white] flex flex-col shadow-[0px_0px_8px_#ddd] max-h-[300px] overflow-y-auto mt-4 rounded-[10px]">
      {results.map((result, id) => {
        return (
          <SearchResult
            result={result.name}
            key={id}
            onSelect={() => onItemSelect(result.name)}
          />
        );
      })}
    </div>
  );
};
