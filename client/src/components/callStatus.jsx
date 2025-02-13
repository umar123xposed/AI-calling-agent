import { useCallContext } from "../context/CallContext";

function CallStatus() {
  const { callStatus } = useCallContext();

  return (
    <div className="bg-lightBg dark:bg-darkBg p-6 rounded-md shadow-md border-l-4 border-primary">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Call Status</h2>
      <p className="text-gray-700 dark:text-gray-300">{callStatus || "Idle"}</p>
    </div>
  );
}

export default CallStatus;
