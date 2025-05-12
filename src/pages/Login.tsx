
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, LogIn, UserPlus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        // Handle sign up
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          toast({
            variant: "destructive",
            title: "Sign up failed",
            description: error.message || "Could not create account",
          });
        } else {
          toast({
            title: "Account created",
            description: "Please check your email for verification",
          });
          setIsSignUp(false); // Switch back to login view
        }
      } else {
        // Handle login
        const success = await login(values.email, values.password);
        
        if (success) {
          toast({
            title: "Login successful",
            description: "Welcome to the admin dashboard",
          });
          navigate("/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password, or you don't have admin privileges",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 glass-morphism rounded-lg">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isSignUp 
              ? "Enter your details to create an account" 
              : "Enter your credentials to access the dashboard"
            }
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="hover-lift" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="hover-lift" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full hover-scale" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isSignUp ? "Creating Account..." : "Logging in..."}
                </span>
              ) : (
                <span className="flex items-center">
                  {isSignUp ? (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Sign Up
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </>
                  )}
                </span>
              )}
            </Button>
          </form>
        </Form>
        
        <div className="text-center mt-4">
          <Button 
            variant="link" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary"
          >
            {isSignUp 
              ? "Already have an account? Log in" 
              : "Need an account? Sign up"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
