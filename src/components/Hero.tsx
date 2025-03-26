import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-in" delay={100}>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
              Professional Home Services at Your Fingertips
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
              Connecting You to Trusted Home Service Professionals
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={300}>
            <p className="text-xl text-foreground/70 mb-10 max-w-3xl mx-auto">
              Find experienced professionals for any home service. From plumbing and electrical work to cleaning and landscaping—all vetted and ready to help.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="scale-in" delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-foreground/50" />
                </div>
                <input
                  type="text"
                  placeholder="What service do you need?"
                  className="pl-10 pr-4 py-3 rounded-full w-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <Button className="rounded-full px-8 py-3 h-auto text-base font-medium w-full sm:w-auto">
                Find Services
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in" delay={600}>
            <div className="mt-12 text-sm text-foreground/60">
              Trusted by thousands of homeowners across the country
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;
