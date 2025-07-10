'use client';
import { useEffect, useState } from 'react';
import {
  MvxTransactionsTable,
  ServerTransactionType,
  TransactionRowType,
  TransactionsTableController,
  useGetAccount,
  useGetNetworkConfig
} from '@/lib';

interface TransactionsTablePropsType {
  transactions?: ServerTransactionType[];
}

export const TransactionsTable = ({
  transactions = []
}: TransactionsTablePropsType) => {
  const { address } = useGetAccount();
  const { network } = useGetNetworkConfig();
  const [processedTransactions, setProcessedTransactions] = useState<
    TransactionRowType[]
  >([]);

  useEffect(() => {
    processTransactions();
  }, []);

  const processTransactions = async () => {
    const transactionsData =
      await TransactionsTableController.processTransactions({
        address,
        egldLabel: network.egldLabel,
        explorerAddress: network.explorerAddress,
        transactions
      });

    setProcessedTransactions(
      transactionsData as unknown as TransactionRowType[]
    );
  };

  return <MvxTransactionsTable transactions={processedTransactions} />;
};
