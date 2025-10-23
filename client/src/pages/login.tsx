import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code2, CheckCircle2, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { loginSchema, signupSchema, type SafeUser } from "@shared/schema";
import { z } from "zod";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form with proper validation
  const form = useForm<z.infer<typeof loginSchema> | z.infer<typeof signupSchema>>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

      const response = await apiRequest<{ user: SafeUser; message: string }>(
        "POST",
        endpoint,
        values
      );

      // Invalidate auth cache
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });

      toast({
        title: "Success!",
        description: response.message,
      });

      // Redirect to dashboard
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form
    form.reset({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
    setRememberMe(false);
    setAgreeTerms(false);
  };

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, text: "" };
    if (pwd.length < 6) return { strength: 1, text: "Weak" };
    if (pwd.length < 10) return { strength: 2, text: "Medium" };
    return { strength: 3, text: "Strong" };
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-background">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full blur-[100px] opacity-40 bg-gradient-to-br from-primary/50 to-purple-600/50 -top-20 -left-20 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 bg-gradient-to-br from-pink-500/50 to-red-500/50 -bottom-32 -right-32 animate-float-delayed" style={{ animationDelay: '5s' }} />
        <div className="absolute w-72 h-72 rounded-full blur-[100px] opacity-40 bg-gradient-to-br from-cyan-500/50 to-blue-500/50 top-1/2 -right-20 animate-float-delayed-2" style={{ animationDelay: '10s' }} />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none animate-rise"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Split Screen Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Branding & Info */}
        <div className="hidden lg:flex flex-col justify-center px-12 xl:px-20 py-20 relative z-10">
          {/* Logo Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 mb-6 animate-pulse-glow">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              CodePilot<span className="text-primary">_AI</span> IDE
            </h1>
            <p className="text-xl text-white/75 font-mono">
              Your personal AI-powered coding workspace.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 group" data-testid="feature-ai-review">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">AI-powered code review and bug fixing</h3>
                <p className="text-white/60 text-sm font-mono">Intelligent analysis that catches errors before they happen</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group" data-testid="feature-collaboration">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Real-time code editing and collaboration</h3>
                <p className="text-white/60 text-sm font-mono">Work together seamlessly with your team</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group" data-testid="feature-browser-based">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-chart-2/20 backdrop-blur-sm border border-chart-2/30 flex items-center justify-center group-hover:bg-chart-2/30 transition-colors">
                <Globe className="w-6 h-6 text-chart-2" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Runs directly in your browser — no setup needed</h3>
                <p className="text-white/60 text-sm font-mono">Get started instantly, anywhere, anytime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login/Signup Form */}
        <div className="flex items-center justify-center px-6 py-12 lg:px-12 relative z-10">
          {/* Glassmorphism Container */}
          <div className="w-full max-w-md relative">
            <div
              className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl animate-slide-in"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 60px rgba(66, 153, 225, 0.2)'
              }}
            >
              {/* Logo for Mobile */}
              <div className="lg:hidden text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 mb-4 animate-pulse-glow">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  CodePilot<span className="text-primary">_AI</span>
                </h2>
                <p className="text-sm text-white/70 font-mono">AI-powered coding workspace</p>
              </div>

              {/* Form Title */}
              <h2 className="text-2xl font-semibold text-white text-center mb-8" data-testid="text-form-title">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                  {/* Name Fields (Signup Only) */}
                  {!isLogin && (
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-white/90 text-sm font-medium">
                              First Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testid="input-firstname"
                                type="text"
                                placeholder="John"
                                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:-translate-y-0.5"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-white/90 text-sm font-medium">
                              Last Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                data-testid="input-lastname"
                                type="text"
                                placeholder="Doe"
                                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:-translate-y-0.5"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90 text-sm font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            data-testid="input-email"
                            type="email"
                            placeholder="you@example.com"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:-translate-y-0.5"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/90 text-sm font-medium">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            data-testid="input-password"
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 hover:-translate-y-0.5"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                        
                        {/* Password Strength Indicator (Signup Only) */}
                        {!isLogin && field.value && (
                          <div className="mt-2" data-testid="password-strength">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-white/70">Password Strength</span>
                              <span className="text-xs text-white/70" data-testid="text-strength">
                                {getPasswordStrength(field.value).text}
                              </span>
                            </div>
                            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  getPasswordStrength(field.value).strength === 1
                                    ? "w-1/3 bg-red-500"
                                    : getPasswordStrength(field.value).strength === 2
                                    ? "w-2/3 bg-pink-500"
                                    : "w-full bg-green-500"
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Remember Me / Terms */}
                  {isLogin ? (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        data-testid="checkbox-remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label htmlFor="remember" className="text-white/90 text-sm cursor-pointer select-none">
                        Remember me
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        data-testid="checkbox-terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <label htmlFor="terms" className="text-white/90 text-sm cursor-pointer select-none">
                        I agree to the Terms & Privacy Policy
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    data-testid="button-submit"
                    disabled={form.formState.isSubmitting || (!isLogin && !agreeTerms)}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '0 10px 30px rgba(66, 153, 225, 0.4)'
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-2">
                      {form.formState.isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" data-testid="spinner-loading" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>{isLogin ? "Sign In" : "Create Account"}</span>
                      )}
                    </span>
                  </Button>

                  {/* Footer Links */}
                  {isLogin && (
                    <div className="text-center space-x-2">
                      <a
                        href="#"
                        className="text-white/90 text-sm hover:text-white transition-colors inline-block hover:-translate-y-0.5 transform duration-200"
                        data-testid="link-privacy"
                      >
                        Privacy Policy
                      </a>
                      <span className="text-white/50">•</span>
                      <a
                        href="#"
                        className="text-white/90 text-sm hover:text-white transition-colors inline-block hover:-translate-y-0.5 transform duration-200"
                        data-testid="link-terms"
                      >
                        Terms of Service
                      </a>
                    </div>
                  )}

                  {/* Switch Form */}
                  <div className="pt-6 border-t border-white/20 text-center">
                    <p className="text-white/90 text-sm mb-3">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <Button
                      type="button"
                      data-testid="button-toggle-form"
                      onClick={toggleForm}
                      variant="outline"
                      className="bg-transparent border-2 border-white/50 text-white hover:bg-white/20 hover:border-white transition-all duration-300 hover:-translate-y-1 px-8"
                    >
                      {isLogin ? "Create Account" : "Sign In"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
