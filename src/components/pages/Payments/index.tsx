"use client";

import DataTable from "@/components/parts/DataTable";
import { paymentsColumns } from "@/components/parts/DataTable/columns";
import PaginationControls from "@/components/parts/DataTable/pagination";
import ReactQuery from "@/components/parts/ReactQuery";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/useDebounce";
import { DATA_LIMIT } from "@/lib/constants/datas";
import { Filters } from "@/lib/filter";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { cn } from "@/lib/utils";
import { usePaymentCount, usePayments } from "@/queries/payments";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState("");
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState("");
  const [paymentDate, setPaymentDate] = useState<Date>();

  const paymentsFilters: Filters[] = [
    {
      field: "currency",
      query: searchParams.get("currency"),
      dataType: "search",
    },
    { field: "rate", query: searchParams.get("rate"), dataType: "number" },
    {
      field: ["package", "name"],
      query: searchParams.get("package"),
      dataType: "search",
    },
    {
      field: "payment_date",
      query: searchParams.get("payment_date"),
      dataType: "date",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const packagesQuery = usePayments(currentPage, paymentsFilters);
  const { data: paymentCountData } = usePaymentCount(paymentsFilters);

  const handlePackageName = (packageName: string) => {
    setPackageName(packageName);
  };

  const handleCurrency = (currency: string) => {
    setCurrency(currency);
  };

  const handleRate = (rate: string) => {
    setRate(rate);
  };

  const handleNextPage = () => {
    if (hasMorePage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(parseInt(paymentCountData || "1") / DATA_LIMIT);
  const hasMorePage = currentPage < totalPages;

  useDebounce(
    () => {
      const newParamsRemoved = removeSearchParams(searchParams, [
        "package",
        "currency",
        "rate",
        "payment_date",
      ]);

      const paramsObject: Record<string, string> = {};

      if (packageName) {
        paramsObject.package = packageName;
      }

      if (currency) {
        paramsObject.currency = currency;
      }

      if (rate) {
        paramsObject.rate = rate;
      }

      if (paymentDate) {
        paramsObject.payment_date = paymentDate.toISOString().split("T")[0];
      }

      const newSearchParams = combineSearchParams(
        newParamsRemoved,
        paramsObject,
      );

      router.push(`?${newSearchParams.toString()}`);
    },
    300,
    [packageName, currency, rate, paymentDate],
  );

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 when filters applied
  }, [searchParams]);

  return (
    <div className="container mx-auto p-2 md:p-10">
      <Card className="p-2 md:p-4">
        <div className="flex items-center flex-wrap gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="package">Package:</Label>
            <Input
              id="package"
              placeholder="Search package...."
              value={packageName}
              onChange={(event) => handlePackageName(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="rate">Rate:</Label>
            <Input
              id="rate"
              placeholder="Search instrument...."
              value={rate}
              onChange={(event) => handleRate(event.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="currency">Currency:</Label>
            <Select onValueChange={handleCurrency} value={currency}>
              <SelectTrigger id="currency" className="max-w-sm">
                <SelectValue placeholder={currency || "Select currency"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SGD">SGD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Payment Date:</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !paymentDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {paymentDate ? (
                    format(paymentDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={setPaymentDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <ReactQuery
          queryResult={packagesQuery}
          render={(data) => (
            <>
              <DataTable
                // @ts-expect-error the type is already correct (what is written down in the docs) but it is still complaining
                columns={paymentsColumns}
                data={data}
                currentPage={currentPage}
                prevPageHandler={handlePreviousPage}
                nextPageHandler={handleNextPage}
                hasMorePage={hasMorePage}
                totalPages={totalPages}
              />
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                hasMorePage={hasMorePage}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
              />
            </>
          )}
        />
      </Card>
    </div>
  );
};

export default PaymentsPage;
