import React from 'react';
import { ExternalLink } from 'lucide-react';

interface DonationCardProps {
  title: string;
  donateUrl: string;
}

export function DonationCard({ title, donateUrl }: DonationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <a
        href={donateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Donate Now
        <ExternalLink size={16} />
      </a>
    </div>
  );
}