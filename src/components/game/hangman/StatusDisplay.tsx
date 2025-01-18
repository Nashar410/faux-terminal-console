import React from 'react';
import { Progress } from "@/components/ui/progress";
import { TOTAL_CREDITS, MAX_ERRORS } from './constants';

type StatusDisplayProps = {
  credits: number;
  errors: number;
};

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ credits, errors }) => {
  const creditsGauge = Array(Math.max(0, MAX_ERRORS - errors))
    .fill('$')
    .join('');

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="text-xl text-center">
        Crédits: {credits}
      </div>
      <Progress value={(credits / TOTAL_CREDITS) * 100} className="h-2" />
      <div className="text-center">
        {creditsGauge || '-'}
      </div>
    </div>
  );
};