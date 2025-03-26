import Input from "./components/Input";
import Link from "next/link";
import { ArrowUpRightFromSquare } from "lucide-react";

export default function Home() {
  return <main className="container mx-auto py-12">
    <Header />
    <Input />
  </main>
}

function Header() {
  return <nav className="flex justify-between items-center">
    <h1 className="text-4xl font-semibold">🔦 Flashlight Demo</h1>

    <div className="flex gap-x-8 text-xl font-medium">
      <Link href="https://npmjs.com/package/flashlightjs" target="_blank" className="flex gap-x-1 items-center">
        NPM <ArrowUpRightFromSquare size={16} strokeWidth={2} />
      </Link>

      <Link href="https://github.com/dmuraco3/flashlight" target="_blank" className="flex gap-x-1 items-center">
        GitHub <ArrowUpRightFromSquare size={16} strokeWidth={2} />
      </Link>

    </div>
  </nav>
}