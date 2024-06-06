import React from 'react';
import { Storage_Url } from './constants';

const App = () => {
  return (
    <div className="font-sans max-w-7xl mx-auto">
      <header className="flex justify-between p-4">
        <a href="/" className="text-2xl">
          QuickFill
        </a>

        <a
          className="text-lg px-4 py-2 hover:underline"
          href="https://github.com/atulsmania/quick-fill/releases/tag/v1.0.0"
        >
          v1.0.0
        </a>
      </header>

      <section className="flex pt-28 flex-col gap-4 items-center max-w-5xl mx-auto">
        <div className="flex flex-col justify-between text-center gap-8">
          <h1 className="text-6xl font-bold flex flex-col">
            Save your shortcuts <br />
            Replace effortlessly in any input field.
          </h1>
          <p className="text-2xl text-neutral-500">
            Creating your own shortcuts has never been easier, faster, and more secure. <br />
            Add, remove, edit, and enjoy.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              className="text-lg px-4 py-2 rounded border border-neutral-700 text-neutral-200 bg-neutral-700 hover:bg-neutral-800"
              role="button"
              href="https://github.com/atulsmania/quick-fill"
            >
              Learn More
            </a>
            <input type="checkbox" id="my-modal-3" className="peer sr-only" />
            <label
              htmlFor="my-modal-3"
              className="peer peer-checked:flex hidden !m-0 fixed inset-0 z-50 items-center justify-center bg-slate-900/70"
            />
            <div className="peer peer-checked:block hidden fixed -translate-y-1/2 z-50">
              <div className="flex max-w-4xl w-full rounded-md overflow-hidden">
                <video className="w-full h-full" controls muted autoPlay>
                  <source src={`${Storage_Url}/1717711378800.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
            <label
              htmlFor="my-modal-3"
              className="text-lg px-4 py-2 rounded border border-neutral-700 cursor-pointer"
            >
              Watch Video
            </label>
          </div>
        </div>
      </section>
      <section className="container py-6 px-6 max-w-5xl mx-auto mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg shadow-md text-center ">
            <h3 className="text-2xl font-semibold mb-4">Store Shortcuts</h3>
            <p>Store shortcuts as key-value pairs for quick access.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md text-center ">
            <h3 className="text-2xl font-semibold mb-4">Auto-Complete</h3>
            <p>
              Auto-complete values in input fields with a
              <kbd className="px-1 rounded-md mx-2 bg-neutral-300">.</kbd>
              symbol.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md text-center ">
            <h3 className="text-2xl font-semibold mb-4">Manage Shortcuts</h3>
            <p>Edit, delete, and add new shortcuts easily.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
