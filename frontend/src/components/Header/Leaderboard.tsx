import { useEffect, useState } from 'react';
import Popup from '../PopUp';
import { Crown } from 'lucide-react';
import './Leaderboard.css';
import { getLeaderboard } from '@/services/resultServices';
import Circle from '../Circle';

type LeaderboardEntry = {
  username: string;
  wpm: number;
};

export default function Leaderboard() {
  const [time, setTime] = useState(15);
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getLeaderboard(time);
        if (res) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [time]);
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Crown color="var(--sub-color)" size={23} onClick={togglePopup}>
        Leaderboard
      </Crown>
      <Popup show={showPopup} onClose={togglePopup}>
        <h2>Leaderboard</h2>
        <span className="leaderboardTime">Time:</span>
        <div className="tabTriggers">
          <span
            className={`tabTrigger ${time === 15 ? 'activeTabTrigger' : ''}`}
            onClick={() => setTime(15)}
          >
            15
          </span>
          <span
            className={`tabTrigger ${time === 30 ? 'activeTabTrigger' : ''}`}
            onClick={() => setTime(30)}
          >
            30
          </span>
          <span
            className={`tabTrigger ${time === 60 ? 'activeTabTrigger' : ''}`}
            onClick={() => setTime(60)}
          >
            60
          </span>
        </div>
        {!isLoading ? (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>WPM</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={entry.username}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td className='wpm'>{entry.wpm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Circle 
          center={false} />
        )}
      </Popup>
    </>
  );
}
