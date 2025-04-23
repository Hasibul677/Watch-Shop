const PageLoader = () => {
    return (
        <div className="flex flex-col min-h-screen">
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
        </div>
    );
};

export default PageLoader;