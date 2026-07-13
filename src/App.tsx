import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/layout/PageTransition';
import { BackgroundField } from '@/components/common/BackgroundField';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { BootLoader } from '@/components/common/BootLoader';
import { prefetchRoutes } from '@/utils/prefetchRoutes';

const Home = lazy(() => import('@/pages/Home'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    // Warm the lazy-route chunk cache once, after the app's own first paint,
    // so clicking to a not-yet-visited page doesn't have to wait on a fresh
    // network request. See src/utils/prefetchRoutes.ts for details.
    prefetchRoutes();
  }, []);

  return (
    <>
      <BootLoader />
      <BackgroundField />
      <Layout>
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                }
              />
              <Route
                path="/projects/:slug"
                element={
                  <PageTransition>
                    <ProjectDetail />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </>
  );
}
