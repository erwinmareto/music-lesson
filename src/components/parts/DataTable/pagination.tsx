import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  hasMorePage: boolean;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  hasMorePage,
  handleNextPage,
  handlePreviousPage,
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-end gap-8 my-2">
      <p>{`Page ${currentPage} of ${totalPages}`}</p>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage <= 1}
          className="bg-primary-0 border"
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleNextPage}
          disabled={!hasMorePage}
          className="bg-primary-0 border"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;
