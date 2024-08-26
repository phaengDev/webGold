import React, { useEffect } from 'react';

const FacebookFeed = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="fb-page"
         data-href="https://www.facebook.com/YOUR_PAGE_ID"
         data-tabs="timeline"
         data-width=""
         data-height=""
         data-small-header="false"
         data-adapt-container-width="true"
         data-hide-cover="false"
         data-show-facepile="true">
      <blockquote cite="https://www.facebook.com/YOUR_PAGE_ID" className="fb-xfbml-parse-ignore">
        <a href="https://www.facebook.com/YOUR_PAGE_ID">YOUR PAGE NAME</a>
      </blockquote>
    </div>
  );
};

export default FacebookFeed;
