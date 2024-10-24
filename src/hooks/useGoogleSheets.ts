import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface SheetRow {
  title: string;
  donateUrl: string;
}

export function useGoogleSheets(sheetId: string, sheetNumber: number = 1) {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTAIVedrW8k9uBnlRyVgapKkqaH5qLkIq72n2TWCYaUDyM1RnHaln1n1YNaHEt_6g8Cs-sMkIHiIZ4W/pub?output=csv`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch spreadsheet data');
        }

        const csvText = await response.text();
        
        Papa.parse(csvText, {
          complete: (results) => {
            const rows = results.data as string[][];
            const formattedData = rows.slice(1).map((row) => ({
              title: row[1] || '',
              donateUrl: row[2] || '',
            }));
            setData(formattedData);
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetId, sheetNumber]);

  return { data, loading, error };
}