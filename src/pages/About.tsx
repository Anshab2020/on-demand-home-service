import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Shield, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <AnimatedSection animation="fade-in">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">About Trusty Tasks</h1>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                We're on a mission to connect skilled professionals with customers who need their services, making home maintenance and improvement accessible to everyone.
              </p>
            </div>
          </AnimatedSection>

          {/* Values Section */}
          <AnimatedSection animation="slide-in" className="mb-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-2xl p-6 border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community First</h3>
                <p className="text-foreground/70">
                  Building strong relationships between service providers and customers through trust and quality service.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Focus</h3>
                <p className="text-foreground/70">
                  Maintaining high standards through careful vetting and continuous monitoring of service quality.
                </p>
              </div>
              
              <div className="bg-card rounded-2xl p-6 border text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Safety</h3>
                <p className="text-foreground/70">
                  Ensuring secure transactions and peace of mind with verified professionals and satisfaction guarantee.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Story Section */}
          <AnimatedSection animation="slide-in" className="mb-16">
            <div className="bg-card rounded-2xl p-8 border">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-foreground/70">
                <p>
                  Founded in 2024, Trusty Tasks emerged from a simple observation: finding reliable home service professionals shouldn't be a challenge. We set out to create a platform that would make it easy for homeowners to connect with skilled, vetted professionals.
                </p>
                <p>
                  Today, we're proud to have built a thriving marketplace that serves thousands of customers and provides opportunities for skilled professionals to grow their businesses.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection animation="scale-in">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                Join our community of satisfied customers and trusted service providers. Find the perfect professional for your needs today.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/services" className="inline-flex items-center">
                  Find Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About; 