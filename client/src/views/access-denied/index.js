const AccessDenied = () => {
  return (
    <div className="h-full flex flex-auto flex-col">
      <div className="h-full flex flex-auto flex-col justify-between" style={{}}>
        <main className="h-full">
          <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6">
            <div className="container mx-auto h-full">
              <div className="h-full flex flex-col items-center justify-center">
                <div className="mt-6 text-center">
                  <h3 className="mb-2">Erişim Hatası!</h3>
                  <p className="text-base">Bu Sayfaya Erişim Yetkiniz Yok</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AccessDenied;
