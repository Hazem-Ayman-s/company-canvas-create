
import { supabase } from "@/integrations/supabase/client";

/**
 * Tests the connection to the Supabase database
 * @returns A promise that resolves to an object containing connection status information
 */
export const testSupabaseConnection = async () => {
  try {
    // Simple query to test if we can connect to Supabase
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return {
        connected: false,
        error: error.message,
        details: error
      };
    }
    
    return {
      connected: true,
      data: 'Connection successful'
    };
  } catch (e) {
    console.error('Unexpected error testing Supabase connection:', e);
    return {
      connected: false,
      error: e instanceof Error ? e.message : 'Unknown error',
      details: e
    };
  }
};
