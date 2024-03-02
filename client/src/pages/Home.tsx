import NavBar from "@/elements/NavBar";

export function Home() {
  return (
    <div className="max-h-screen">
      <NavBar />
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to Notes-Share
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 ...">
        <p className="text-sm text-muted-foreground">
          Made by OOSE Spring24 Team8
        </p>
      </div>
    </div>
  );
}

export default Home;
