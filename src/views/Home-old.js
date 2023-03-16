import { useState } from "react";
import Counter from '../components/Counter';

export default function Home() {
    const [counters, setCounter] = useState([
        {
          title: 'Pushup Counter',
          initialCount: 10
        },
        {
          title: 'Situp Counter',
          initialCount: 5
        },
        {
          title: 'Squat Counter',
          initialCount: 40123
        },
        {
          title: 'Laps Run',
          initialCount: 315
        }
    
      ])
      return (
        <div className="App">
          {
            counters.map((counter) => <Counter title={counter.title} initialCount={counter.initialCount}/>)
          }
        </div>
      );
}