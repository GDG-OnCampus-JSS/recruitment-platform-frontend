import { Info } from 'lucide-react';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface Props {
  icon?: React.ReactNode;
  size?: number;
  info?: string;
}

const InfoTooltip: React.FC<Props> = ({ icon, size = 14, info = '' }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">
          {icon ? icon : <Info size={size} />}
          <TooltipContent side="top" className="px-3 py-1.5 text-xs">
            {info}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
