import { TodoList } from '@/components/TodoList';

export default function Home() {
  return (
    <main className="bg-black flex min-h-screen h-screen flex-col items-center justify-center">
      <TodoList />
    </main>
  );
}
