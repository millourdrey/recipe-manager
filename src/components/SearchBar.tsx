import { useEffect, useRef } from "react";

type SearchBarProps = {
  value: string;
  onChange: (nextValue: string) => void;
  onSearch: () => void;
};

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex gap-3">
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input input-bordered flex-1"
        placeholder="Search meals"
      />
      <button type="button" className="btn btn-primary" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
