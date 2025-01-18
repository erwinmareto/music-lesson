import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SearchInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}

const SearchInput = ({ id, label, placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className="flex flex-col">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
};

export default SearchInput;
