import * as StellarSdk from "@stellar/stellar-sdk";

export const getRandomNodes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: StellarSdk.Keypair.random().publicKey(),
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

export const simulateQuorumConsensus = (nodeCount: number): number[][] => {
  const quorumSize = Math.floor(nodeCount * 0.8); // 80% of nodes for quorum
  const consensusGroups: number[][] = [];

  for (let i = 0; i < 3; i++) {
    // Create 3 consensus groups
    const group: number[] = [];
    while (group.length < quorumSize) {
      const nodeIndex = Math.floor(Math.random() * nodeCount);
      if (!group.includes(nodeIndex)) {
        group.push(nodeIndex);
      }
    }
    consensusGroups.push(group);
  }

  return consensusGroups;
};
