import { ModeToggle } from "./ui/mode-toggle";

function Navbar() {
  return (
    <header className="px-2 py-2 sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex justify-between items-center max-w-4xl mx-auto px-5">
        <h1 className="font-bold text-xl text-primary">YTS Movies</h1>
        <ul>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
