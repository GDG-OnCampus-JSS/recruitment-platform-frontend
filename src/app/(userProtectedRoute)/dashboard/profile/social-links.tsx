import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { socialIconMapping } from '@/lib/options';

interface SocialLink {
  id: string;
  name: string;
  link: string;
}

interface SocialLinksDisplayProps {
  socialLinks?: SocialLink[];
  className?: string;
}

const SocialLinksDisplay: React.FC<SocialLinksDisplayProps> = ({ socialLinks = [], className }) => {
  const platforms = Object.keys(socialIconMapping);

  const linkMap: Record<string, SocialLink> = {};
  socialLinks.forEach(link => {
    linkMap[link.name] = link;
  });

  return (
    <Card className={className}>
      <CardContent className="p-6 md:p-8 text-sm">
        <h3 className="mb-4 text-xl font-medium">Submitted links</h3>
        <div className="grid w-full grid-cols-2 justify-between gap-4 max-md:grid-cols-1">
          {platforms.map((platform) => {
            const socialLink = linkMap[platform];
            
            return (
              <div key={platform} className="flex w-full items-center justify-between gap-3">
                {socialLink ? (
                  <Link
                    href={socialLink.link}
                    className="text-md flex items-center gap-2 truncate text-nowrap text-[#407BFF] max-md:text-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {socialIconMapping[platform]}
                    <span className="truncate capitalize">{socialLink.name}</span>
                  </Link>
                ) : (
                  <div className="text-md flex items-center gap-2 truncate text-nowrap text-gray-400 max-md:text-sm">
                    {socialIconMapping[platform]}
                    <span className="truncate">Not submitted</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLinksDisplay;