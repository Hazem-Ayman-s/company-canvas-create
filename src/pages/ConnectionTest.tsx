
import { useState, useEffect } from 'react';
import { testSupabaseConnection } from '@/utils/supabaseTest';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<{
    connected?: boolean;
    data?: string;
    error?: string;
    details?: any;
  }>({});
  const [loading, setLoading] = useState(true);

  const checkConnection = async () => {
    setLoading(true);
    const result = await testSupabaseConnection();
    setConnectionStatus(result);
    setLoading(false);
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">Connection Status</h2>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={checkConnection} 
                disabled={loading}
                className="flex items-center"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full"></div>
                <p className="mt-2 text-sm text-gray-500">Testing connection...</p>
              </div>
            ) : connectionStatus.connected ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-md">
                <p className="font-medium">✓ Connected to Supabase</p>
                <p className="text-sm mt-1">The database connection is working properly.</p>
              </div>
            ) : (
              <div className="bg-red-50 text-red-800 p-4 rounded-md">
                <p className="font-medium">✗ Connection Failed</p>
                <p className="text-sm mt-1">Error: {connectionStatus.error}</p>
                {connectionStatus.details && (
                  <details className="mt-2">
                    <summary className="text-xs cursor-pointer">Show details</summary>
                    <pre className="text-xs mt-2 p-2 bg-red-100 rounded overflow-auto">
                      {JSON.stringify(connectionStatus.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            <p>This test runs a simple query against the 'contact_messages' table to verify the connection.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConnectionTest;
