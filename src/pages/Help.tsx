
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import LogoDebug from '@/components/common/LogoDebug';
import HelpHeader from '@/components/help/HelpHeader';
import HelpArticleList from '@/components/help/HelpArticleList';
import HelpArticleDetail from '@/components/help/HelpArticleDetail';
import HelpContactSection from '@/components/help/HelpContactSection';
import { categories, helpArticles } from '@/components/help/HelpData';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<null | {
    title: string;
    content: string;
  }>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log("Searching for:", searchQuery);
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <HelpHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
        
        {activeArticle ? (
          <HelpArticleDetail 
            article={activeArticle} 
            onBack={() => setActiveArticle(null)} 
          />
        ) : (
          <HelpArticleList 
            categories={categories}
            helpArticles={helpArticles}
            onArticleSelect={setActiveArticle}
          />
        )}
        
        <HelpContactSection />
        
        <div className="mt-8">
          <LogoDebug />
        </div>
      </div>
    </Layout>
  );
};

export default Help;
