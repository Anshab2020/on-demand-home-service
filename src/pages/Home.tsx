import PaymentOptions from '@/components/PaymentOptions';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-blue-500 mb-4">
          Professional Home Services at Your Fingertips
        </p>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Connecting You to Trusted<br />
          Home Service Professionals
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Find experienced professionals for any home service. From plumbing and electrical<br />
          work to cleaning and landscaping—all vetted and ready to help.
        </p>

        {/* Remove the search section */}
        
        <p className="text-gray-400 mt-8">
          Trusted by thousands of homeowners across the country
        </p>
      </div>
    </div>
  );
};

export default Home; 