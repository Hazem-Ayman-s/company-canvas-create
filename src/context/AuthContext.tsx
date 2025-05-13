
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession);

        // Check if the user is an admin
        if (currentSession?.user) {
          setTimeout(() => {
            checkAdminStatus(currentSession.user.id);
          }, 0);
        } else {
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession);

      // Check if the user is an admin
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    // Special case for our hardcoded admin user
    if (user?.email === "admin@gmail.com") {
      setIsAdmin(true);
      return;
    }
    
    // Regular database check for admin status
    const { data, error } = await supabase.rpc('is_admin_user', { user_id: userId });
    
    if (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return;
    }
    
    setIsAdmin(!!data);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Special case for our hardcoded admin
      if (email === "admin@gmail.com" && password === "12345678") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          // If the user doesn't exist yet, create it
          if (error.message.includes("Invalid login credentials")) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email,
              password
            });

            if (signUpError) {
              toast({
                variant: "destructive",
                title: "Error creating admin account",
                description: signUpError.message,
              });
              return false;
            }
            
            // Add the user to the admin_users table
            if (signUpData.user) {
              const { error: adminError } = await supabase
                .from('admin_users')
                .insert([{ id: signUpData.user.id }]);
              
              if (adminError) {
                console.error('Error adding user to admin_users:', adminError);
              }
              
              setIsAdmin(true);
              toast({
                title: "Admin account created",
                description: "You can now log in with your admin credentials",
              });
              
              // Since we created the user, we need to sign in again
              const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password
              });
              
              if (loginError) {
                toast({
                  variant: "destructive",
                  title: "Login failed",
                  description: loginError.message,
                });
                return false;
              }
              
              return true;
            }
          } else {
            toast({
              variant: "destructive",
              title: "Login failed",
              description: error.message,
            });
            return false;
          }
        }

        // If the email matches our admin, set isAdmin to true
        if (email === "admin@gmail.com") {
          setIsAdmin(true);
          return true;
        }
        
        // For other users, check database
        if (data.user) {
          // We need to wait for the admin check to complete before returning
          const isAdminUser = await checkAdminStatusAndReturn(data.user.id);
          
          if (!isAdminUser) {
            // If user is not an admin, sign them out and return false
            await supabase.auth.signOut();
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have admin privileges",
            });
            return false;
          }
        }

        return true;
      } else {
        // Regular login flow for non-hardcoded users
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: error.message || "Invalid email or password",
          });
          return false;
        }

        // Check if the user is an admin
        if (data.user) {
          // We need to wait for the admin check to complete before returning
          const isAdminUser = await checkAdminStatusAndReturn(data.user.id);
          
          if (!isAdminUser) {
            // If user is not an admin, sign them out and return false
            await supabase.auth.signOut();
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have admin privileges",
            });
            return false;
          }
        }

        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  
  // This function is separate from checkAdminStatus because we need to return the result
  const checkAdminStatusAndReturn = async (userId: string): Promise<boolean> => {
    // Special case for our hardcoded admin user
    if (user?.email === "admin@gmail.com") {
      setIsAdmin(true);
      return true;
    }
    
    const { data, error } = await supabase.rpc('is_admin_user', { user_id: userId });
    
    if (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
    
    setIsAdmin(!!data);
    return !!data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      session,
      login, 
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
