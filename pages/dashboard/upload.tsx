import { useSession, getSession } from "next-auth/react";
import { FormEvent } from "react";
import Link from "next/link";

export default function Upload() {
  const { data: session, status }: { data: any; status: any } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
          <Link href="/dashboard" passHref>
            <button className="mb-10 px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              ← Back to Dashboard
            </button>
          </Link>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-black-900">
                    Upload
                  </h3>
                  <p className="mt-1 text-sm text-black-600">
                    Upload your latest video!
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 border border-gray-200 dark:border-[#333] rounded-xl px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                          <label
                            htmlFor="video-name"
                            className="block text-md font-bold text-black dark:text-white"
                          >
                            Name
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="video-name"
                              id="video-name"
                              required
                              minLength={3}
                              maxLength={50}
                              className="p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Cool video #3000"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-md font-bold text-black dark:text-white"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Jim and I shot down an A-10!"
                            required
                            maxLength={200}
                          />
                        </div>
                        <p className="mt-2 text-sm text-black-500">
                          Brief description for your video.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="description"
                          className="block text-md font-bold text-black dark:text-white"
                        >
                          Tags
                        </label>
                        <div className="flex mt-1 gap-2">
                          <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
                            ARMA
                          </button>
                          <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
                            CSGO
                          </button>
                          <button className="px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
                            Other
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-md font-bold text-black dark:text-gray-200">
                          Thumbnail
                        </label>
                        <div className="mt-1 flex items-center">
                          <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Upload
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-md font-bold text-black dark:text-white">
                          Video Upload
                        </label>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-black-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-black-600">
                              <label
                                htmlFor="video-upload"
                                className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a video</span>
                                <input
                                  id="video-upload"
                                  name="video-upload"
                                  type="file"
                                  className="sr-only"
                                  required
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-black-500">
                              MP4, MOV or MKV up to any size!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="justify-center text-center xl:max-w-6xl mx-auto mt-10 mb-20">
        <h1 className="font-bold text-2xl">
          Sorry! You are not authorised to view this page!
        </h1>
      </div>
    );
  }
}
