import React from "react";
import Spinner from "../../../utils/Spinner";

const AdminStatusMessage = ({ loading, loadingMessage = "Loading", error }) => {
  if (!loading && !error) return null;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {loading && (
        <Spinner
          message={loadingMessage}
          height={30}
          width={150}
          color="#5B4B8A"
          messageColor="#5B4B8A"
        />
      )}
      {error && (
        <p className="text-sm font-medium text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};

export default AdminStatusMessage;
