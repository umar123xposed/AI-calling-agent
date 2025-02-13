function transcriptViewer({ transcript }) {
    return (
<div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Transcript</h2>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-gray-700 break-words">{transcript}</p>
        </div>
      </div>
    );
  }
  
  export default transcriptViewer;
