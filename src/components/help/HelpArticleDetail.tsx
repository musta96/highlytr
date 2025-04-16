
import React from 'react';
import { Button } from '@/components/ui/button';

interface HelpArticleDetailProps {
  article: {
    title: string;
    content: string;
  };
  onBack: () => void;
}

const HelpArticleDetail = ({ article, onBack }: HelpArticleDetailProps) => {
  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-4"
      >
        ← Back to Articles
      </Button>
      <div className="bg-white p-8 rounded-lg shadow">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default HelpArticleDetail;
