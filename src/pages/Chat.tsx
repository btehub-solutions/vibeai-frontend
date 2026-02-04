import AIChatInterface from "@/components/chat/AIChatInterface";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar /> 
      <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="w-full relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">AI Playground</h1>
            <p className="text-muted-foreground">Test our intelligent assistant in real-time</p>
          </div>
          <AIChatInterface />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
