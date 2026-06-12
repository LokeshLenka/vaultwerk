import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <section className="min-h-screen mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
      <div className="mb-4 inline-flex rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        Developer tool memory system
      </div>

      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
        Save developer tools before you forget them.
      </h1>

      <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
        Organize tools, build collections, and rediscover your stack faster with
        a local-first workflow.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Button size={"lg"}> Get started</Button>

        <Button variant={"outline"} size={"lg"}>
          View collections
        </Button>
      </div>
    </section>
  );
}

export default HomePage;
