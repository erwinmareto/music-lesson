"use client";

import DataTable from "@/components/parts/DataTable";
import { paymentsColumns } from "@/components/parts/DataTable/columns";
import PaginationControls from "@/components/parts/DataTable/pagination";
import DatePicker from "@/components/parts/DatePicker";
import ReactQuery from "@/components/parts/ReactQuery";
import SearchInput from "@/components/parts/SearchInput";
import SelectInput from "@/components/parts/SelectInput";
import { Card } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { DATA_LIMIT, PAYMENT_CURRENCY } from "@/lib/constants/datas";
import { Filters } from "@/lib/filter";
import { combineSearchParams, removeSearchParams } from "@/lib/url";
import { usePaymentCount, usePayments } from "@/queries/payments";
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
          <SearchInput
            id="package"
            label="Package"
            placeholder="Search package...."
            value={packageName}
            onChange={handlePackageName}
          />

          <SearchInput
            id="rate"
            label="Rate"
            placeholder="Search rate...."
            value={rate}
            onChange={handleRate}
          />
          <SelectInput
            id="currency"
            label="Currency"
            value={currency}
            onChange={handleCurrency}
            options={PAYMENT_CURRENCY}
          />

          <DatePicker
            label="Payment Date"
            selectedDate={paymentDate}
            onSelectDate={setPaymentDate}
          />
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
