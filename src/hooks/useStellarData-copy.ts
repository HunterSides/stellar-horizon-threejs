import { useState, useEffect } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { getRandomNodes, processTransactions } from "../utils/stellar";

const server = new StellarSdk.Horizon.Server("https://horizon.stellar.org");

const useStellarData = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const randomNodes = getRandomNodes(20);
      setNodes(randomNodes);

      const fetchTransactions = async () => {
        try {
          const txResponse = await server
            .transactions()
            .limit(100)
            .order("desc")
            .call();
          const processedTxs = txResponse.records.map((tx) =>
            processTransactions(tx, randomNodes)
          );
          setTransactions(processedTxs);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };

      fetchTransactions();

      const intervalId = setInterval(fetchTransactions, 10000); // Fetch every 10 seconds

      return () => clearInterval(intervalId);
    };

    fetchData();
  }, []);

  return { nodes, transactions };
};

export default useStellarData;
