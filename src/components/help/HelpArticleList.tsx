
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface HelpArticle {
  id: number;
  title: string;
  description: string;
  views: number;
  content: string;
}

// Update this interface to match the one in HelpData.tsx
interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface HelpArticleListProps {
  categories: CategoryData[];
  helpArticles: Record<string, HelpArticle[]>;
  onArticleSelect: (article: { title: string; content: string }) => void;
}

const HelpArticleList = ({ categories, helpArticles, onArticleSelect }: HelpArticleListProps) => {
  return (
    <Tabs defaultValue="account" className="mb-12">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
        {categories.map(category => (
          <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
            {category.icon}
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map(category => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpArticles[category.id]?.map(article => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <button 
                    onClick={() => onArticleSelect({title: article.title, content: article.content})}
                    className="block w-full text-left"
                  >
                    <h3 className="font-semibold text-lg mb-2 text-highlyt-blue">{article.title}</h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.views} views</span>
                      <span className="text-sm text-highlyt-blue flex items-center gap-1">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default HelpArticleList;
