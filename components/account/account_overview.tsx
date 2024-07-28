// 'use client';
import { getIdentityPrincipal } from "@/lib/auth";
import { Box } from "@chakra-ui/react";
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join();
}

const data = [
  {
    date: "Aug 01",
    "ICP ": 2100.2,
    ckBTC: 4434.1,
    ckETH: 7943.2,
  },
  {
    date: "Aug 02",
    "ICP ": 2943.0,
    ckBTC: 4954.1,
    ckETH: 8954.1,
  },
  {
    date: "Aug 03",
    "ICP ": 4889.5,
    ckBTC: 6100.2,
    ckETH: 9123.7,
  },
  {
    date: "Aug 04",
    "ICP ": 3909.8,
    ckBTC: 4909.7,
    ckETH: 7478.4,
  },
  {
    date: "Aug 05",
    "ICP ": 5778.7,
    ckBTC: 7103.1,
    ckETH: 9504.3,
  },
  {
    date: "Aug 06",
    "ICP ": 5900.9,
    ckBTC: 7534.3,
    ckETH: 9943.4,
  },
  {
    date: "Aug 07",
    "ICP ": 4129.4,
    ckBTC: 7412.1,
    ckETH: 10112.2,
  },
  {
    date: "Aug 08",
    "ICP ": 6021.2,
    ckBTC: 7834.4,
    ckETH: 10290.2,
  },
  {
    date: "Aug 09",
    "ICP ": 6279.8,
    ckBTC: 8159.1,
    ckETH: 10349.6,
  },
  {
    date: "Aug 10",
    "ICP ": 6224.5,
    ckBTC: 8260.6,
    ckETH: 10415.4,
  },
  {
    date: "Aug 11",
    "ICP ": 6380.6,
    ckBTC: 8965.3,
    ckETH: 10636.3,
  },
  {
    date: "Aug 12",
    "ICP ": 6414.4,
    ckBTC: 7989.3,
    ckETH: 10900.5,
  },
  {
    date: "Aug 13",
    "ICP ": 6540.1,
    ckBTC: 7839.6,
    ckETH: 11040.4,
  },
  {
    date: "Aug 14",
    "ICP ": 6634.4,
    ckBTC: 7343.8,
    ckETH: 11390.5,
  },
  {
    date: "Aug 15",
    "ICP ": 7124.6,
    ckBTC: 6903.7,
    ckETH: 11423.1,
  },
  {
    date: "Aug 16",
    "ICP ": 7934.5,
    ckBTC: 6273.6,
    ckETH: 12134.4,
  },
  {
    date: "Aug 17",
    "ICP ": 10287.8,
    ckBTC: 5900.3,
    ckETH: 12034.4,
  },
  {
    date: "Aug 18",
    "ICP ": 10323.2,
    ckBTC: 5732.1,
    ckETH: 11011.7,
  },
  {
    date: "Aug 19",
    "ICP ": 10511.4,
    ckBTC: 5523.1,
    ckETH: 11834.8,
  },
  {
    date: "Aug 20",
    "ICP ": 11043.9,
    ckBTC: 5422.3,
    ckETH: 12387.1,
  },
  {
    date: "Aug 21",
    "ICP ": 6700.7,
    ckBTC: 5334.2,
    ckETH: 11032.2,
  },
  {
    date: "Aug 22",
    "ICP ": 6900.8,
    ckBTC: 4943.4,
    ckETH: 10134.2,
  },
  {
    date: "Aug 23",
    "ICP ": 7934.5,
    ckBTC: 4812.1,
    ckETH: 9921.2,
  },
  {
    date: "Aug 24",
    "ICP ": 9021.0,
    ckBTC: 2729.1,
    ckETH: 10549.8,
  },
  {
    date: "Aug 25",
    "ICP ": 9198.2,
    ckBTC: 2178.0,
    ckETH: 10968.4,
  },
  {
    date: "Aug 26",
    "ICP ": 9557.1,
    ckBTC: 2158.3,
    ckETH: 11059.1,
  },
  {
    date: "Aug 27",
    "ICP ": 9959.8,
    ckBTC: 2100.8,
    ckETH: 11903.6,
  },
  {
    date: "Aug 28",
    "ICP ": 10034.6,
    ckBTC: 2934.4,
    ckETH: 12143.3,
  },
  {
    date: "Aug 29",
    "ICP ": 10243.8,
    ckBTC: 3223.4,
    ckETH: 12930.1,
  },
  {
    date: "Aug 30",
    "ICP ": 10078.5,
    ckBTC: 3779.1,
    ckETH: 13420.5,
  },
  {
    date: "Aug 31",
    "ICP ": 11134.6,
    ckBTC: 4190.3,
    ckETH: 14443.2,
  },
  {
    date: "Sep 01",
    "ICP ": 12347.2,
    ckBTC: 4839.1,
    ckETH: 14532.1,
  },
  {
    date: "Sep 02",
    "ICP ": 12593.8,
    ckBTC: 5153.3,
    ckETH: 14283.5,
  },
  {
    date: "Sep 03",
    "ICP ": 12043.4,
    ckBTC: 5234.8,
    ckETH: 14078.9,
  },
  {
    date: "Sep 04",
    "ICP ": 12144.9,
    ckBTC: 5478.4,
    ckETH: 13859.7,
  },
  {
    date: "Sep 05",
    "ICP ": 12489.5,
    ckBTC: 5741.1,
    ckETH: 13539.2,
  },
  {
    date: "Sep 06",
    "ICP ": 12748.7,
    ckBTC: 6743.9,
    ckETH: 13643.2,
  },
  {
    date: "Sep 07",
    "ICP ": 12933.2,
    ckBTC: 7832.8,
    ckETH: 14629.2,
  },
  {
    date: "Sep 08",
    "ICP ": 13028.8,
    ckBTC: 8943.2,
    ckETH: 13611.2,
  },
  {
    date: "Sep 09",
    "ICP ": 13412.4,
    ckBTC: 9932.2,
    ckETH: 12515.2,
  },
  {
    date: "Sep 10",
    "ICP ": 13649.0,
    ckBTC: 10139.2,
    ckETH: 11143.8,
  },
  {
    date: "Sep 11",
    "ICP ": 13748.5,
    ckBTC: 10441.2,
    ckETH: 8929.2,
  },
  {
    date: "Sep 12",
    "ICP ": 13148.1,
    ckBTC: 10933.8,
    ckETH: 8943.2,
  },
  {
    date: "Sep 13",
    "ICP ": 12839.6,
    ckBTC: 11073.4,
    ckETH: 7938.3,
  },
  {
    date: "Sep 14",
    "ICP ": 12428.2,
    ckBTC: 11128.3,
    ckETH: 7533.4,
  },
  {
    date: "Sep 15",
    "ICP ": 12012.8,
    ckBTC: 11412.3,
    ckETH: 7100.4,
  },
  {
    date: "Sep 16",
    "ICP ": 11801.3,
    ckBTC: 10501.1,
    ckETH: 6532.1,
  },
  {
    date: "Sep 17",
    "ICP ": 10102.9,
    ckBTC: 8923.3,
    ckETH: 4332.8,
  },
  {
    date: "Sep 18",
    "ICP ": 12132.5,
    ckBTC: 10212.1,
    ckETH: 7847.4,
  },
  {
    date: "Sep 19",
    "ICP ": 12901.1,
    ckBTC: 10101.7,
    ckETH: 7223.3,
  },
  {
    date: "Sep 20",
    "ICP ": 13132.6,
    ckBTC: 12132.3,
    ckETH: 6900.2,
  },
  {
    date: "Sep 21",
    "ICP ": 14132.2,
    ckBTC: 13212.5,
    ckETH: 5932.2,
  },
  {
    date: "Sep 22",
    "ICP ": 14245.8,
    ckBTC: 12163.4,
    ckETH: 5577.1,
  },
  {
    date: "Sep 23",
    "ICP ": 14328.3,
    ckBTC: 10036.1,
    ckETH: 5439.2,
  },
  {
    date: "Sep 24",
    "ICP ": 14949.9,
    ckBTC: 8985.1,
    ckETH: 4463.1,
  },
  {
    date: "Sep 25",
    "ICP ": 15967.5,
    ckBTC: 9700.1,
    ckETH: 4123.2,
  },
  {
    date: "Sep 26",
    "ICP ": 17349.3,
    ckBTC: 10943.4,
    ckETH: 3935.1,
  },
];

const summary = [
  {
    name: "ICP ",
    value: "$21,349.36",
    invested: "$19,698.65",
    cashflow: "$14,033.74",
    gain: "+$11,012.39",
    realized: "+$177.48",
    dividends: "+$490.97",
    bgColor: "bg-blue-500",
    changeType: "positive",
  },
  {
    name: "ckBTC",
    value: "$25,943.43",
    invested: "$23,698.65",
    cashflow: "$11,033.74",
    gain: "+$3,012.39",
    realized: "+$565.41",
    dividends: "+$290.97",
    bgColor: "bg-violet-500",
    changeType: "positive",
  },
  {
    name: "ckETH",
    value: "$9,443.46",
    invested: "$14,698.65",
    cashflow: "$2,033.74",
    gain: "-$5,012.39",
    realized: "-$634.42",
    dividends: "-$990.97",
    bgColor: "bg-fuchsia-500",
    changeType: "negative",
  },
];

const valueFormatter = (number: number | bigint) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function Overview() {
  const [principal, setPrincipal] = useState<string | undefined>();

  useEffect(() => {
    setPrincipal(getIdentityPrincipal().toString());
  }, []);
  return (
    <>
      <Box className="max-w-screen-xl mx-auto px-4 md:px-8">
        <h1 className="font-bold text-2xl text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Wallet Balance
        </h1>
        {/* <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        $32,227.40
      </p>
      <p className="mt-1 text-tremor-default font-medium">
        <span className="text-emerald-700 dark:text-emerald-500">
          +$430.90 (4.1%)
        </span>{}
        <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
          Past 24 hours
        </span>
      </p> */}
        <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {principal}
          {}
        </p>
        {/* <LineChart
        data={data}
        index="date"
        categories={["ICP", "ckBTC", "ckETH"]}
        colors={["blue", "violet", "fuchsia"]}
        valueFormatter={valueFormatter}
        yAxisWidth={55}
        onValueChange={() => {}}
        className="mt-6 hidden h-96 sm:block"
      />
      <LineChart
        data={data}
        index="date"
        categories={["ICP ", "ckBTC", "ckETH"]}
        colors={["blue", "violet", "fuchsia"]}
        valueFormatter={valueFormatter}
        showYAxis={false}
        showLegend={false}
        startEndOnly={true}
        className="mt-6 h-72 sm:hidden"
      /> */}
        <Table className="mt-8">
          <TableHead>
            <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
              <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Name
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Amount
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Value
              </TableHeaderCell>
              {/* <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Cashflow
            </TableHeaderCell> */}
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Gain
              </TableHeaderCell>
              <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Realized
              </TableHeaderCell>
              {/* <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Net
            </TableHeaderCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  <div className="flex space-x-3">
                    <span
                      className={classNames(
                        item.bgColor,
                        "w-1 shrink-0 rounded"
                      )}
                      aria-hidden={true}
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{item.invested}</TableCell>
                {
                  <TableCell className="text-right">{item.value}</TableCell>
                  /*  <TableCell className="text-right">{item.cashflow}</TableCell> */
                }
                <TableCell className="text-right">
                  <span
                    className={classNames(
                      item.changeType === "positive"
                        ? "text-emerald-700 dark:text-emerald-500"
                        : "text-red-700 dark:text-red-500"
                    )}
                  >
                    {item.gain}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={classNames(
                      item.changeType === "positive"
                        ? "text-emerald-700 dark:text-emerald-500"
                        : "text-red-700 dark:text-red-500"
                    )}
                  >
                    {item.realized}
                  </span>
                </TableCell>
                {/* <TableCell className="text-right">
                <span
                  className={classNames(
                    item.changeType === "positive"
                      ? "text-emerald-700 dark:text-emerald-500"
                      : "text-red-700 dark:text-red-500"
                  )}
                >
                  {item.dividends}
                </span>
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
