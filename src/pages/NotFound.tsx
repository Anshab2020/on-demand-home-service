
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <AnimatedSection animation="scale-in">
            <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary">
              <span className="text-6xl font-bold">404</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            
            <p className="text-foreground/70 text-xl mb-8">
              We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
            </p>
            
            <Button 
              asChild
              className="rounded-full px-8"
            >
              <Link to="/" className="inline-flex items-center">
                <Home className="mr-2 w-5 h-5" />
                Return Home
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
