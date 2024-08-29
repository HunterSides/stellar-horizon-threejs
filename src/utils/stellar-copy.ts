import { Keypair } from "@stellar/stellar-sdk";
export const getRandomNodes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: Keypair.random().publicKey(),
    index: i,
  }));
};

export const processTransactions = (tx: any, nodes: any[]) => {
  const fromNodeIndex = Math.floor(Math.random() * nodes.length);
  let toNodeIndex = Math.floor(Math.random() * nodes.length);
  while (toNodeIndex === fromNodeIndex) {
    toNodeIndex = Math.floor(Math.random() * nodes.length);
  }

  return {
    id: tx.id,
    fromNodeIndex,
    toNodeIndex,
    amount: tx.fee_paid,
    timestamp: tx.created_at,
  };
};
