import { aggregate, readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export const getPaymentCount = async (filter?: Record<string, unknown>) => {
  const response = await directus.request(
    aggregate("payments", {
      aggregate: {
        count: "*",
      },
      query: {
        filter: filter,
      },
    }),
  );

  return response[0].count;
};

export const getRevenueSum = async () => {
  const response = await directus.request(
    aggregate("payments", {
      aggregate: {
        sum: "rate",
      },
    }),
  );

  return response;
};

export const getRevenueByMonth = async () => {
  const response = await directus.request(
    aggregate("payments", {
      aggregate: { sum: ["rate"] },
      groupBy: ["month(payment_date)", "year(payment_date)"],
    }),
  );

  return response;
};

export const getPayments = async (
  page: number,
  filter: Record<string, unknown>,
  isFilterEmpty: boolean,
) => {
  const response = await directus.request(
    readItems("payments", {
      fields: [
        "id",
        "payment_id",
        "currency",
        "rate",
        "payment_date",
        "package.name",
      ],
      limit: 10,
      page: page,
      filter: filter,
      sort: [isFilterEmpty ? "" : "-payment_date"],
    }),
  );

  return response;
};
