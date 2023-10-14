import React, { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useLocation } from 'react-router';

const LoadingBarWrapper = ({ children }) => {
  const [loadingBarProgress, setLoadingBarProgress] = useState(0);
  let location = useLocation();
  useEffect(() => {
    
    // Sayfa geçişlerinde yüklenme çubuğunu sıfırla
    setLoadingBarProgress(0);

    // Sayfa geçişleri sırasında yüklenme çubuğunu ilerlet
    setLoadingBarProgress(30); // Örnek ilerleme yüzdesi

    // İsterseniz bu kısmı sayfa geçişi tamamlandığında ilerlemeyi tamamlamak için kullanabilirsiniz
    setTimeout(() => {
      setLoadingBarProgress(100);
    }, 1000);

  }, [location]);

  return (
    <>
      <LoadingBar progress={loadingBarProgress} color="#f11946" />
      {children}
    </>
  );
};

export default LoadingBarWrapper;
