import Layout from "../components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your RunSync experience</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Account Preferences</h2>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="Alex Runner" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="alex@example.com" className="mt-1" />
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-3">Connected Accounts</h3>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white p-2 rounded">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.4498 5.4H8.5498C6.8398 5.4 5.4498 6.79 5.4498 8.5V15.5C5.4498 17.21 6.8398 18.6 8.5498 18.6H15.4498C17.1598 18.6 18.5498 17.21 18.5498 15.5V8.5C18.5498 6.79 17.1598 5.4 15.4498 5.4ZM16.3498 9.98L16.2998 10.09C15.1698 12.05 13.7898 13.57 11.9998 14.85C11.8298 14.97 11.6398 15.03 11.4498 15.03C11.2098 15.03 10.9698 14.92 10.7998 14.71L10.7198 14.64C10.0098 13.93 9.1998 13.15 8.3898 12.32C8.0898 12.02 8.0798 11.53 8.3798 11.23C8.6798 10.93 9.1698 10.92 9.4698 11.22C10.2098 11.96 10.9498 12.67 11.5998 13.33C13.1198 12.17 14.2998 10.83 15.2698 9.13C15.4698 8.77 15.9498 8.65 16.3098 8.87C16.6798 9.08 16.7898 9.57 16.5598 9.93L16.3498 9.98Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Strava</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Connected as Alex Runner</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Disconnect</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Training Preferences</h2>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="current-goal">Current Goal</Label>
              <Select defaultValue="5k">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5k">5K - Performance</SelectItem>
                  <SelectItem value="10k">10K - Performance</SelectItem>
                  <SelectItem value="half">Half Marathon - Completion</SelectItem>
                  <SelectItem value="marathon">Marathon - Completion</SelectItem>
                  <SelectItem value="general">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="mb-3 block">Experience Level</Label>
              <RadioGroup defaultValue="intermediate">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="weekly-volume">Preferred Weekly Volume (km)</Label>
              <Input id="weekly-volume" type="number" defaultValue="35" className="mt-1" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Smart Features</h2>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label htmlFor="smart-feedback" className="text-md font-medium">Smart Feedback</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive AI-powered insights about your training
                </p>
              </div>
              <Switch id="smart-feedback" defaultChecked />
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label htmlFor="auto-plan" className="text-md font-medium">Automatic Plan Adjustments</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let RunSync adjust your plan based on your progress
                </p>
              </div>
              <Switch id="auto-plan" defaultChecked />
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label htmlFor="notifications" className="text-md font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get reminded about upcoming runs and achievements
                </p>
              </div>
              <Switch id="notifications" />
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label htmlFor="data-sharing" className="text-md font-medium">Activity Data Sharing</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your running data to improve recommendations
                </p>
              </div>
              <Switch id="data-sharing" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Settings</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
