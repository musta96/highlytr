
/**
 * Optimizes image URLs by adding parameters for resizing and format conversion
 * 
 * @param url Original image URL
 * @param width Desired width
 * @param quality Image quality (1-100)
 * @returns Optimized image URL
 */
export const optimizeImage = (url: string, width = 800, quality = 80): string => {
  // Skip optimization for data URLs or relative paths
  if (!url || url.startsWith('data:') || url.startsWith('/')) {
    return url;
  }
  
  // Handle Unsplash images
  if (url.includes('unsplash.com')) {
    // Unsplash allows direct image optimization through URL parameters
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&q=${quality}&auto=format`;
  }
  
  // Handle other image providers or return original URL if no optimization is possible
  return url;
};

/**
 * Lazy loads images with IntersectionObserver
 * Call this function in useEffect to set up lazy loading
 */
export const setupLazyLoading = (): void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const lazyImages = document.querySelectorAll('img.lazy-load');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
};
