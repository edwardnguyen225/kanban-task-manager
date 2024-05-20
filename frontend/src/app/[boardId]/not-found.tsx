import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center space-y-8 p-8">
      <h1 className="text-3xl font-bold">Board Not Found</h1>
      <Link href="/" className="text-primary hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
