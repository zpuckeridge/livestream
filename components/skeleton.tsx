const SkeletonCard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 m-4">
      <div className="mt-10 w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
          <div className="h-48 w-full rounded-md bg-gray-300 "></div>
        </div>
      </div>
      <div className="mt-10 w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
          <div className="h-48 w-full rounded-md bg-gray-300 "></div>
        </div>
      </div>
      <div className="mt-10 w-full animate-pulse flex-row items-center justify-center">
        <div className="flex flex-col space-y-2">
          <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
          <div className="h-48 w-full rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
