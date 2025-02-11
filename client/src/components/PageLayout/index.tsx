import { Box } from '@chakra-ui/layout';
import React from 'react';
import { SkipNavContent } from '@chakra-ui/skip-nav';

import { Header } from './Header';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SkipNavContent />
      <Box px={[4, 4, 8, 16]} id="main-content">
        {children}
      </Box>
    </>
  );
};
export default PageLayout;
