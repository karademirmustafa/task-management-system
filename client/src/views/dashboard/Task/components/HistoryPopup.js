import { useDispatch, useSelector } from "react-redux";
import { closeHistoryPopup } from "../store/stateSlice";
import OutsideClickHandler from "react-outside-click-handler";

const HistoryPopup = () => {
  const dispatch = useDispatch();
  const historyPopup = useSelector(state => state.taskList.state.historyPopup)
  
  const data = useSelector((state) => state.taskList.data.taskList.data);
  if(!historyPopup.isOpen && !historyPopup.taskId) return null;
    const task = data.find(ts => ts._id == historyPopup.taskId);
    if(!task) return <></>;

    // Key'e göre arka plan rengini belirleme fonksiyonu
    const getBgColor = (key) => {
      switch(key) {
        case 'status':
          return 'bg-blue-500';
        case 'assignedTo':
          return 'bg-yellow-500';
        case 'dueDate':
          return 'bg-red-500';
        default:
          return 'bg-gray-500';
      }
    };

    const reversedHistory = [...task.history].reverse();
    let numColumns = 2;
    if (reversedHistory.length >= 16 && reversedHistory.length < 39) {
      numColumns = 3;
    } else if (reversedHistory.length >= 39) {
      numColumns = 4;
    }

    if (reversedHistory.length === 0) {
      return (
        <OutsideClickHandler onOutsideClick={() => dispatch(closeHistoryPopup())}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Task Timeline Track</h3>
              <button
                onClick={() => dispatch(closeHistoryPopup())}
                className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
              >
                Close
              </button>
            </div>
            <p className="text-center text-gray-600 text-lg">History Not Found</p>
          </div>
        </div>
      </OutsideClickHandler>
      );
    }
    return (
      <OutsideClickHandler onOutsideClick={() => dispatch(closeHistoryPopup())}>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Task Timeline Track</h3>
            <button onClick={() => dispatch(closeHistoryPopup())} className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
              Close
            </button>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-${numColumns.toString()} gap-4`}>
            {reversedHistory.map((entry, index) => ( 
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <span className={`${getBgColor(entry.key)} h-6 w-6 rounded-full flex items-center justify-center text-white`}>
                    {/* İkon veya Tarih */}
                    {index+1}
                  </span>
                </div>
                <div className="flex-grow ml-3 capitalize"> {/* Genişlik artırıldı */}
                  <h4 className="text-sm font-semibold text-gray-900">Key: {entry.key}</h4>
                  <p className="text-sm text-gray-600">Value: {entry.value}</p>
                  <p className="text-sm text-gray-500">Updated At: {new Date(entry.updatedAt).toLocaleString()}</p>
                </div>
              </div>
             ))}
          </div>
        </div>
      </div>
    </OutsideClickHandler>
    );
};

export default HistoryPopup;
