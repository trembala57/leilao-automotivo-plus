
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AuctionTimerProps {
  endTime: string;
}

const AuctionTimer = ({ endTime }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [isEnding, setIsEnding] = useState(false);

  function getTimeLeft() {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const distance = end - now;
    
    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }
    
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      total: distance,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = getTimeLeft();
      setTimeLeft(updated);
      
      // Set isEnding to true when less than 5 minutes remaining
      if (updated.total < 1000 * 60 * 5) {
        setIsEnding(true);
      }
      
      if (updated.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 py-2 rounded">
        Leilão encerrado
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center ${
        isEnding ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"
      } py-2 rounded`}
    >
      <Clock size={16} className="mr-2" />
      <div className="flex items-center space-x-1">
        {timeLeft.days > 0 && (
          <>
            <span className="font-semibold">{timeLeft.days}</span>
            <span className="text-xs">d</span>
          </>
        )}
        <span className="font-semibold">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span>:</span>
        <span className="font-semibold">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span className="font-semibold">{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default AuctionTimer;
