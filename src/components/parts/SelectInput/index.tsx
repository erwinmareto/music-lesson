import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
}
const SelectInput = ({ id, label, value, options, onChange }: SelectInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="currency" className="max-w-sm">
          <SelectValue placeholder={value || `Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
