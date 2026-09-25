const Progress = ({ total, done, left, percent }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="w-80 h-40 mx-auto bg-linear-to-br from-[#7c3aed] to-[#4338ca] rounded-3xl flex p-5 justify-between items-end transition-transform duration-200 ease-in-out active:scale-95">

      {/* Stats */}
      <div className="h-full flex flex-col justify-between">
        <p className="text-lg font-semibold text-gray-100">Daily Progress</p>
        <div >
          <span className="text-3xl font-bold text-white ">{done}/{total}</span>
          <span className="ml-2 text-lg text-gray-300 font-semibold">Tasks Done</span>
        </div>
        <div className="px-2 py-0.5 mt-1 rounded-lg bg-indigo-500 ">
          <i className="fa-solid fa-fire text-yellow-300 mr-2"></i> 
          <span className="font-semibold text-white">{left} Day Streak</span>
        </div>
      </div>

      {/* Circle */}
      <div className="relative w-16 h-16">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* bg */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            strokeWidth="3.5"
            className="stroke-[#7c3aed80]"
          />
          {/* progress */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="stroke-white transition-all duration-500"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
