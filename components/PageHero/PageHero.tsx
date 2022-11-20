import React from "react";

import { CategoryDetailsFragment, CollectionDetailsFragment } from "@/saleor/api";

import { RichText } from "../RichText";

export interface PageHeroProps {
  title: string;
  description?: string;
  entity: CollectionDetailsFragment | CategoryDetailsFragment;
}

export function PageHero({ title, description, entity }: PageHeroProps) {
  const style: React.CSSProperties = {};
  if (entity.backgroundImage?.url) {
    style.backgroundImage = `url(${entity.backgroundImage?.url})`;
  }
  return (
    <div className="container mx-auto bg-gray-400 h-80 rounded-md flex items-center" style={style}>
      <div className="sm:ml-20 text-center text-slate-100 sm:text-left [text-shadow:0_4px_8px_rgba(0,0,0,0.8)]">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>

        {description && (
          <div className="text-xl font-bold inline-block sm:block">
            <RichText jsonStringData={description} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHero;
