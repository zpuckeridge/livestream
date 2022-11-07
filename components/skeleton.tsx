const SkeletonCard = () => {
  return (
    <div className="mt-10 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 m-4">
      <div className="w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-32 w-full rounded-md bg-gray-300 "></div>
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
        </div>
      </div>
      <div className="w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-32 w-full rounded-md bg-gray-300 "></div>
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
        </div>
      </div>
      <div className="w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-32 w-full rounded-md bg-gray-300 "></div>
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
        </div>
      </div>
      <div className="w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-32 w-full rounded-md bg-gray-300 "></div>
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
