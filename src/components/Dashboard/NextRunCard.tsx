
import { Calendar, Clock, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NextRunCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border-l-4 border-accent">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Next Suggested Run</h3>
        <span className="text-sm text-white bg-accent px-2 py-1 rounded-full">Tomorrow</span>
      </div>
      
      <h4 className="text-lg font-medium mb-4">Easy Recovery Run</h4>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span>Wednesday, April 24</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span>30 - 40 minutes</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span>Suggested: City Park Loop</span>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Focus on easy effort after yesterdays hard workout. Keep your heart rate below 150 bpm and enjoy the recovery.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          Start Run <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NextRunCard;
