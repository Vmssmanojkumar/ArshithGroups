import { useEffect } from 'react';

// Global registry to track loaded stylesheets and their reference count
const stylesheetRegistry = {};

export function useStylesheet(urls) {
  // Convert urls array to a stable comma-separated string for dependency tracking
  const urlArray = Array.isArray(urls) ? urls : [urls];
  const urlsKey = urlArray.join(',');

  useEffect(() => {
    const loadedUrls = [];

    urlArray.forEach(url => {
      if (!stylesheetRegistry[url]) {
        // If not loaded, create the link element and add to head
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);

        stylesheetRegistry[url] = {
          element: link,
          refCount: 1
        };
      } else {
        // If already loaded, just increment the reference count
        stylesheetRegistry[url].refCount += 1;
      }
      loadedUrls.push(url);
    });

    return () => {
      // Cleanup: decrement ref count and remove if no longer in use by any page
      loadedUrls.forEach(url => {
        if (stylesheetRegistry[url]) {
          stylesheetRegistry[url].refCount -= 1;
          if (stylesheetRegistry[url].refCount <= 0) {
            // Delay removal slightly to allow new page to mount and increment ref count if shared
            setTimeout(() => {
              if (stylesheetRegistry[url] && stylesheetRegistry[url].refCount <= 0) {
                const { element } = stylesheetRegistry[url];
                if (document.head.contains(element)) {
                  document.head.removeChild(element);
                }
                delete stylesheetRegistry[url];
              }
            }, 50);
          }
        }
      });
    };
  }, [urlsKey]);
}

