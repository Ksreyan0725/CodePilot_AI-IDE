import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Code2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { SafeUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Fetch current user with error handling
  const { data, isLoading, error } = useQuery<{ user: SafeUser }>({
    queryKey: ["/api/auth/me"],
    retry: false,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (error && !isLoading) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
        variant: "destructive",
      });
      setLocation("/");
    }
  }, [error, isLoading, setLocation, toast]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout");
      queryClient.clear();
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" data-testid="loading-dashboard">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Don't render dashboard if there's an error (user will be redirected)
  if (error || !data) {
    return null;
  }

  const user = data.user;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
              <Code2 className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold">
              CodePilot<span className="text-primary">_AI</span>
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-logout"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div>
            <h2 className="text-4xl font-bold mb-2" data-testid="text-welcome">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
            </h2>
            <p className="text-muted-foreground text-lg">
              You're successfully logged into CodePilot_AI IDE
            </p>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
              <CardDescription>Your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">Email</span>
                <p className="text-lg font-mono" data-testid="text-email">{user?.email}</p>
              </div>
              {(user?.firstName || user?.lastName) && (
                <div>
                  <span className="text-sm text-muted-foreground">Name</span>
                  <p className="text-lg" data-testid="text-name">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
              )}
              {user?.createdAt && (
                <div>
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <p className="text-lg">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
              <CardDescription>Start using CodePilot_AI IDE features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <h4 className="font-semibold">AI-powered code review</h4>
                  <p className="text-sm text-muted-foreground">Get intelligent feedback on your code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <h4 className="font-semibold">Real-time collaboration</h4>
                  <p className="text-sm text-muted-foreground">Work together with your team seamlessly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <h4 className="font-semibold">Browser-based development</h4>
                  <p className="text-sm text-muted-foreground">Code from anywhere, no setup required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
