import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  label: string;
  selectedDate: Date | undefined;
  // eslint-disable-next-line no-unused-vars
  onSelectDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, selectedDate, onSelectDate }: DatePickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-[280px] justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={selectedDate} onSelect={onSelectDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
